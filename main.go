/*
Copyright © 2022 42Atomys
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
package main

import (
	"errors"
	"os"
	"time"

	"github.com/getsentry/sentry-go"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"atomys.codes/stud42/cmd"
)

func init() {
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr}).With().Str("version", os.Getenv("APP_VERSION")).Logger()
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	if os.Getenv("DEBUG") == "true" {
		zerolog.SetGlobalLevel(zerolog.DebugLevel)
	} else {
		zerolog.SetGlobalLevel(zerolog.InfoLevel)
	}
}

func main() {
	defer func() {
		err := recover()

		if err != nil {
			sentry.CurrentHub().Recover(err)
			sentry.Flush(time.Second * 5)
		}
	}()

	// Sentry needs to be in main for obscur reason...
	if os.Getenv("GO_ENV") != "development" || os.Getenv("SENTRY_DSN") != "" {
		initSentry()
	}
	cmd.Execute()
}

/**
 * Initialize sentry client
 * https://docs.sentry.io/platforms/go/
 */
func initSentry() {
	var tracesSampleRate, sampleSampleRate = 0.0, 1.0
	var env = "development"
	var release = "stud42@dev"

	if os.Getenv("GO_ENV") == "production" {
		tracesSampleRate = 0.2
		sampleSampleRate = 1.0

		env = "production"
		release = "stud42@" + os.Getenv("APP_VERSION")

		if os.Getenv("SENTRY_DSN") == "" {
			log.Fatal().Msg("SENTRY_DSN is not set")
		}
	}

	err := sentry.Init(sentry.ClientOptions{
		Dsn:         os.Getenv("SENTRY_DSN"),
		Debug:       os.Getenv("DEBUG") == "true",
		Environment: env,
		Release:     release,
		BeforeSend: func(event *sentry.Event, hint *sentry.EventHint) *sentry.Event {
			for _, frame := range event.Exception {
				log.Warn().Err(errors.New(frame.Value)).Str("eventID", string(event.EventID)).Msg("send exception to sentry")
				event.Tags["eventID"] = string(event.EventID)
			}
			return event
		},
		TracesSampleRate: tracesSampleRate,
		SampleRate:       sampleSampleRate,
		AttachStacktrace: true,
	})
	if err != nil {
		log.Fatal().Err(err).Msg("failed to initialize sentry")
	}
}

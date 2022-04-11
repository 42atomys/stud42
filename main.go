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
	"os"

	"github.com/getsentry/sentry-go"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"atomys.codes/stud42/cmd"
)

func init() {
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	if os.Getenv("DEBUG") == "true" {
		zerolog.SetGlobalLevel(zerolog.DebugLevel)
	} else {
		zerolog.SetGlobalLevel(zerolog.InfoLevel)
	}

	initSentry()
}

func main() {
	func() {
		defer sentry.Recover()
		cmd.Execute()
	}()
}

/**
 * Initialize sentry client
 * https://docs.sentry.io/platforms/go/
 */
func initSentry() {
	var tracesSampleRate = 0.0
	if os.Getenv("GO_ENV") == "production" {
		tracesSampleRate = 0.2
	}

	var env = "development"
	if os.Getenv("GO_ENV") == "production" {
		env = "production"
	}

	var release = "stud42@dev"
	if os.Getenv("GO_ENV") == "production" {
		release = "stud42@" + os.Getenv("APP_VERSION")
	}

	err := sentry.Init(sentry.ClientOptions{
		Dsn:         "https://645991d145f84e66a5bbfa98b09bf0d6@o217344.ingest.sentry.io/6324341",
		Debug:       true,
		Environment: env,
		Release:     release,
		BeforeSend: func(event *sentry.Event, hint *sentry.EventHint) *sentry.Event {
			panic("allo")
			return event
		},
		TracesSampleRate: tracesSampleRate,
		SampleRate:       tracesSampleRate,
	})
	if err != nil {
		log.Fatal().Err(err).Msg("failed to initialize sentry")
	}
}

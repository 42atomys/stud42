package main

import (
	"context"
	"os"

	_ "github.com/lib/pq"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	modelgen "atomys.codes/stud42/internal/models/generated"
)

var client *modelgen.Client

func init() {
	log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stderr})
	zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	if os.Getenv("DEBUG") == "true" {
		zerolog.SetGlobalLevel(zerolog.DebugLevel)
	} else {
		zerolog.SetGlobalLevel(zerolog.InfoLevel)
	}

	var err error
	client, err = modelgen.Open(
		"postgres",
		os.Getenv("DATABASE_URL"),
		modelgen.Debug(),
	)
	if err != nil {
		log.Fatal().Err(err).Msg("failed to connect to database")
	}

	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatal().Err(err).Msg("running schema migration")
	}
}

func main() {
	if err := seedUsers(); err != nil {
		log.Fatal().Err(err).Msg("failed to seed users")
	}
}

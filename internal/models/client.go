package modelsutils

import (
	"context"
	"os"

	"entgo.io/ent/dialect/sql/schema"
	"github.com/rs/zerolog/log"

	"atomys.codes/stud42/internal/cache"
	"atomys.codes/stud42/internal/models/generated"
	modelgen "atomys.codes/stud42/internal/models/generated"
)

var client *modelgen.Client

// Connect to the database and create the client.
func Connect(cacheClient *cache.Client) (err error) {
	var opts = []modelgen.Option{}

	if os.Getenv("DEBUG") == "true" {
		opts = append(opts, modelgen.Debug())
	}

	if cacheClient != nil {
		opts = append(opts, generated.Cache(cacheClient))
	}

	client, err = modelgen.Open(
		"postgres",
		os.Getenv("DATABASE_URL"),
		opts...,
	)
	if err != nil {
		log.Error().Err(err).Msg("failed to connect to database")
	}
	return
}

// Client returns the client.
func Client() *modelgen.Client {
	if client == nil {
		log.Fatal().Msg("client is not connected. Please call Connect() first.")
	}
	return client
}

// Migrate migrates the schema of the database.
func Migrate() (err error) {
	err = client.Schema.Create(context.Background(), schema.WithAtlas(true))
	if err != nil {
		log.Error().Err(err).Msg("running schema migration")
	}
	return
}

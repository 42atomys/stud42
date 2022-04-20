/*
Copyright © 2022 42Atomys

*/
package cmd

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"entgo.io/contrib/entgql"
	"entgo.io/ent/dialect/sql/schema"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	sentryhttp "github.com/getsentry/sentry-go/http"
	"github.com/go-chi/chi/v5"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"

	"atomys.codes/stud42/internal/api"
	"atomys.codes/stud42/internal/config"
	modelgen "atomys.codes/stud42/internal/models/generated"
	_ "atomys.codes/stud42/internal/models/generated/runtime"
)

var (
	apiPortFlag     *string
	playgroudActive *bool
)

// apiCmd represents the api command
var apiCmd = &cobra.Command{
	Use:   "api",
	Short: "Serve the API in production",

	Run: func(cmd *cobra.Command, args []string) {
		if err := config.Load(); err != nil {
			log.Fatal().Err(err).Msg("invalid configuration")
		}

		client, err := modelgen.Open(
			"postgres",
			os.Getenv("DATABASE_URL"),
			modelgen.Debug(),
		)
		if err != nil {
			log.Fatal().Err(err).Msg("failed to connect to database")
		}

		if err := client.Schema.Create(context.Background(), schema.WithAtlas(true)); err != nil {
			log.Fatal().Err(err).Msg("running schema migration")
		}

		srv := handler.NewDefaultServer(api.NewSchema(client))
		// srv.SetRecoverFunc(func(ctx context.Context, err interface{}) error {
		// 	// notify bug tracker...
		// 	log.Error().Err(err.(error)).Msg("unhandled error")
		// 	return gqlerror.Errorf("Internal server error!")
		// })

		srv.Use(entgql.Transactioner{TxOpener: client})

		router := chi.NewRouter()
		router.Use(cors.New(cors.Options{
			// TODO @42Atomys Add all enviroment origins
			AllowedOrigins:   []string{"http://localhost:3000"},
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "Sentry-Trace"},
			AllowCredentials: true,
			Debug:            true,
		}).Handler)
		router.Use(api.NetworkPolicyMiddleware)
		router.Use(api.AuthenticationMiddleware)

		if *playgroudActive {
			router.Handle("/", playground.Handler("GraphQL playground", "/graphql"))
			log.Info().Msgf("connect to http://localhost:%s/ for GraphQL playground", *apiPortFlag)
		}

		sentryHandler := sentryhttp.New(sentryhttp.Options{
			Repanic:         true,
			WaitForDelivery: true,
		})

		router.Handle("/graphql", sentryHandler.Handle(srv))
		log.Fatal().Err(http.ListenAndServe(fmt.Sprintf(":%s", *apiPortFlag), router)).Msg("Error during server start")
	},
}

func init() {
	serveCmd.AddCommand(apiCmd)

	apiPortFlag = apiCmd.Flags().StringP("port", "p", "4000", "port used to serve the interface")
	playgroudActive = apiCmd.Flags().BoolP("GraphQLi", "g", false, "enable playground")
}

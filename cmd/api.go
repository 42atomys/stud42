/*
Copyright © 2022 42Atomys
*/
package cmd

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"entgo.io/contrib/entgql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/getsentry/sentry-go"
	sentryhttp "github.com/getsentry/sentry-go/http"
	"github.com/go-chi/chi/v5"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"go.opentelemetry.io/otel"

	"atomys.codes/stud42/internal/api"
	"atomys.codes/stud42/internal/cache"
	modelsutils "atomys.codes/stud42/internal/models"
	_ "atomys.codes/stud42/internal/models/generated/runtime"
	"atomys.codes/stud42/pkg/otelgql"
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
		if err := modelsutils.Connect(); err != nil {
			log.Fatal().Err(err).Msg("failed to connect to database")
		}

		if err := modelsutils.Migrate(); err != nil {
			log.Fatal().Err(err).Msg("failed to migrate database")
		}

		cacheClient, err := cache.New(viper.GetString("redis-url"))
		if err != nil {
			log.Fatal().Err(err).Msg("failed to create cache")
		}

		tracer := otel.GetTracerProvider().Tracer("graphql-api")
		srv := handler.NewDefaultServer(api.NewSchema(modelsutils.Client(), cacheClient, tracer))
		srv.SetRecoverFunc(func(ctx context.Context, err interface{}) error {
			if err, ok := err.(error); ok {
				log.Error().Err(err).Msg("graphql recover")
				sentry.CaptureException(err)
			}
			return gqlerror.Errorf("Internal server error!")
		})

		gqlCacheClient, err := cacheClient.NewGQLCache(30 * time.Minute)
		if err != nil {
			log.Fatal().Err(err).Msg("failed to init gql cache")
		}

		srv.Use(entgql.Transactioner{TxOpener: modelsutils.Client()})
		srv.Use(extension.AutomaticPersistedQuery{Cache: gqlCacheClient})
		srv.Use(extension.FixedComplexityLimit(50))
		srv.Use(otelgql.Middleware(tracer))

		router := chi.NewRouter()
		router.Use(cors.New(cors.Options{
			AllowedOrigins:   strings.Split(os.Getenv("CORS_ORIGIN"), ","),
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "Sentry-Trace"},
			AllowCredentials: true,
			Debug:            os.Getenv("DEBUG") == "true",
		}).Handler)
		router.Use(api.AuthzByPolicyMiddleware)
		router.Use(api.AuthenticationMiddleware)
		if os.Getenv("DEBUG") == "true" {
			router.Use(api.LoggingMiddleware)
		}

		if *playgroudActive {
			router.Handle("/", playground.Handler("GraphQL playground", "/graphql"))
			log.Info().Msgf("connect to http://localhost:%s/ for GraphQL playground", *apiPortFlag)
		}

		sentryHandler := sentryhttp.New(sentryhttp.Options{
			Repanic:         false,
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

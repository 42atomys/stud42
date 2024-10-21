package cmd

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"

	"entgo.io/contrib/entgql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/playground"
	sentryhttp "github.com/getsentry/sentry-go/http"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"go.opentelemetry.io/otel"

	"github.com/42atomys/stud42/internal/api"
	modelsutils "github.com/42atomys/stud42/internal/models"
	"github.com/42atomys/stud42/internal/pkg/searchengine"
	"github.com/42atomys/stud42/pkg/cache"
	"github.com/42atomys/stud42/pkg/otelgql"
)

var (
	apiPortFlag     *string
	playgroudActive *bool
)

// apiCmd represents the api command
var apiCmd = &cobra.Command{
	Use:   "api",
	Short: "Serve the API in production",

	PreRun: func(cmd *cobra.Command, args []string) {
		searchengine.Initizialize()
	},

	Run: func(cmd *cobra.Command, args []string) {
		tracer := otel.GetTracerProvider().Tracer("graphql-api")
		cacheClient, _ := cmd.Context().Value(keyValueCtxKey{}).(*cache.Client)
		gqlCacheClient, err := cacheClient.NewGQLCache(30 * time.Minute)
		if err != nil {
			log.Fatal().Err(err).Msg("failed to init gql cache")
		}

		srv := handler.NewDefaultServer(api.NewSchema(modelsutils.Client(), cacheClient, tracer))
		srv.SetRecoverFunc(func(ctx context.Context, err interface{}) error {
			// notify bug tracker...
			errTyped, ok := err.(error)
			if !ok {
				errTyped = fmt.Errorf("%v", errTyped)
			}

			if errTyped == nil {
				return nil
			}

			log.Error().Err(errTyped).Msg("unhandled api error")
			return gqlerror.Errorf("Internal server error!")
		})
		srv.Use(entgql.Transactioner{TxOpener: modelsutils.Client()})
		srv.Use(extension.AutomaticPersistedQuery{Cache: gqlCacheClient})
		srv.Use(extension.FixedComplexityLimit(64))
		srv.Use(otelgql.Middleware(tracer))

		router := chi.NewRouter()
		router.Use(cors.New(cors.Options{
			AllowedOrigins:   strings.Split(os.Getenv("CORS_ORIGIN"), ","),
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "Sentry-Trace"},
			AllowCredentials: true,
			Debug:            os.Getenv("DEBUG") == "true",
		}).Handler)

		router.Use(middleware.Timeout(60*time.Second), middleware.RealIP)
		router.Use(api.AuthzByPolicyMiddleware)
		router.Use(api.AuthenticationMiddleware)
		if os.Getenv("DEBUG") == "true" {
			router.Use(api.LoggingMiddleware)
		}

		if os.Getenv("DEBUG_PPROF") == "true" {
			router.Mount("/debug", middleware.Profiler())
		}

		// Limit the request body size for all requests to the
		// This is based on the chi middleware.RequestSize. Way this middleware is
		// added to the router to use it
		// https://github.com/go-chi/chi/blob/master/middleware/request_size.go
		router.Use(func(h http.Handler) http.Handler {
			fn := func(w http.ResponseWriter, r *http.Request) {

				// When image transfer is enabled, the request body size is limited.
				// This is done to prevent the server from being overloaded by large
				// DoS attack over the network.
				const _50KB = (1 << 10) * 50

				limitedBody := http.MaxBytesReader(w, r.Body, _50KB)
				bodyBytes, err := io.ReadAll(limitedBody)
				limitedBody.Close()

				// if r.Body reach the max size limit, the request will be canceled
				// and the error will be returned to the client
				if r.ContentLength > _50KB || err != nil {
					http.Error(w, http.StatusText(http.StatusRequestEntityTooLarge), http.StatusRequestEntityTooLarge)
					return
				}

				r.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))
				h.ServeHTTP(w, r)
			}
			return http.HandlerFunc(fn)
		})

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

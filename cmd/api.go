/*
Copyright © 2022 42Atomys

*/
package cmd

import (
	"fmt"
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"

	"atomys.codes/stud42/internal/api"
	"atomys.codes/stud42/internal/api/generated"
	"atomys.codes/stud42/internal/config"
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

		srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: &api.Resolver{}}))

		if *playgroudActive {
			http.Handle("/", playground.Handler("GraphQL playground", "/query"))
			log.Info().Msgf("connect to http://localhost:%s/ for GraphQL playground", *apiPortFlag)
		}

		http.Handle("/query", srv)
		log.Fatal().Err(http.ListenAndServe(fmt.Sprintf(":%s", *apiPortFlag), nil)).Msg("Error during server start")
	},
}

func init() {
	serveCmd.AddCommand(apiCmd)

	apiPortFlag = apiCmd.Flags().StringP("port", "p", "4000", "port used to serve the interface")
	playgroudActive = apiCmd.Flags().BoolP("GraphQLi", "g", false, "enable playground")
}

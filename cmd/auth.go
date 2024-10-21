package cmd

import (
	_ "github.com/lib/pq"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"github.com/42atomys/stud42/internal/auth"
	_ "github.com/42atomys/stud42/internal/models/generated/runtime"
)

var (
	authHttpPortFlag *string
)

// authCmd represents the auth command
var authCmd = &cobra.Command{
	Use:   "auth",
	Short: "Serve the Authorization Service",

	Run: func(cmd *cobra.Command, args []string) {
		if err := auth.SetCertificates(viper.GetString("auth.jwk.certPrivateKeyFile"), viper.GetString("auth.jwk.certPublicKeyFile")); err != nil {
			log.Fatal().Err(err).Msg("failed to set auth keys")
		}

		log.Fatal().Err(auth.ServeHTTP(authHttpPortFlag)).Msg("failed to serve")
	},
}

func init() {
	serveCmd.AddCommand(authCmd)

	authHttpPortFlag = authCmd.Flags().String("port", "5000", "port used to serve the http server of the jwt-provider")
}

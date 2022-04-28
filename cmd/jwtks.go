/*
Copyright © 2022 42Atomys
*/
package cmd

//go:generate go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
//go:generate go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2
//go:generate protoc -I ../api/grpc --go_out=../ --go-grpc_out=../ ../api/grpc/jwtks.proto

import (
	_ "github.com/lib/pq"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"atomys.codes/stud42/internal/config"
	"atomys.codes/stud42/internal/jwtks"
	_ "atomys.codes/stud42/internal/models/generated/runtime"
)

var (
	jwtksGrpcPortFlag *string
	jwtksHttpPortFlag *string
)

// jwtksCmd represents the jwtks command
var jwtksCmd = &cobra.Command{
	Use:   "jwtks",
	Short: "Serve the JWTKS Service",

	Run: func(cmd *cobra.Command, args []string) {
		if err := config.Load(); err != nil {
			log.Fatal().Err(err).Msg("invalid configuration")
		}

		if err := jwtks.SetCertificates(viper.GetString("jwtks.jwk.certPrivateKeyFile"), viper.GetString("jwtks.jwk.certPublicKeyFile")); err != nil {
			log.Fatal().Err(err).Msg("failed to set jwtks keys")
		}

		var errChan = make(chan error)

		go func() {
			errChan <- jwtks.ServeGRPC(jwtksGrpcPortFlag)
		}()

		go func() {
			errChan <- jwtks.ServeHTTP(jwtksHttpPortFlag)
		}()

		log.Fatal().Err(<-errChan).Msg("failed to serve")
	},
}

func init() {
	serveCmd.AddCommand(jwtksCmd)

	jwtksGrpcPortFlag = jwtksCmd.Flags().String("gport", "5000", "port used to serve the grpc server of the jwt-provider")
	jwtksHttpPortFlag = jwtksCmd.Flags().String("hport", "5500", "port used to serve the http server of the jwt-provider")
}

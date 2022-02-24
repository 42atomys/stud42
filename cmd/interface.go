/*
Copyright © 2022 42Atomys

*/
package cmd

import (
	"net/http"

	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
)

var (
	interfacePortFlag *string
)

// interfaceCmd represents the interface command
var interfaceCmd = &cobra.Command{
	Use:   "interface",
	Short: "Serve the NextJS interface in production",

	Run: func(cmd *cobra.Command, args []string) {
		// The static Next.js app will be served under `/`.
		http.Handle("/", http.FileServer(http.Dir("web/ui/dist")))

		// Start HTTP server at given port or default 3000 port
		log.Info().Msgf("Serving NextJS interface on port %s", *interfacePortFlag)
		log.Fatal().Err(http.ListenAndServe(":"+*interfacePortFlag, nil)).Msg("Error serving NextJS interface")
	},
}

func init() {
	serveCmd.AddCommand(interfaceCmd)

	interfacePortFlag = interfaceCmd.Flags().StringP("port", "p", "3000", "port used to serve the interface")
}

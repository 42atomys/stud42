package cmd

import (
	"github.com/spf13/cobra"
)

// serveCmd represents the serve command
var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Serve is a subcommand to serve stud42 application in production",
}

func init() {
	rootCmd.AddCommand(serveCmd)
}

/*
Copyright © 2022 42Atomys

*/
package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

var (
	apiPortFlag *string
)

// apiCmd represents the api command
var apiCmd = &cobra.Command{
	Use:   "api",
	Short: "Serve the API in production",

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("api called")
	},
}

func init() {
	serveCmd.AddCommand(apiCmd)

	apiPortFlag = apiCmd.Flags().StringP("port", "p", "3000", "port used to serve the interface")

}

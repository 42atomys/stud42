package cmd

import (
	"github.com/spf13/cobra"
)

// operationsCmd represents the operations command
var operationsCmd = &cobra.Command{
	Use:   "operations",
	Short: "operations is a command that will do operations on the data",
}

func init() {
	rootCmd.AddCommand(operationsCmd)
}

package cmd

import (
	"github.com/spf13/cobra"
)

// jobsCmd represents the jobs command
var jobsCmd = &cobra.Command{
	Use:   "jobs",
	Short: "Ajobs is a sub command for managing async jobs",
	Long: `jobs is a sub command for managing async jobs. This command
contains subcommands for execution one time jobs, and cron jobs.`,
}

func init() {
	rootCmd.AddCommand(jobsCmd)
}

package cmd

import (
	"github.com/spf13/cobra"
)

// crawlerCmd represents the crawler command
var crawlerCmd = &cobra.Command{
	Use:   "crawler",
	Short: "crawler is a sub command to manage crawlers",
	Long: `A crawler is a job that will be executed periodically. It will
be executed on a cron schedule. It is used to update the database with
new data from 42API. It is also used to update the database with new
data from other sources.`,
}

func init() {
	jobsCmd.AddCommand(crawlerCmd)
}

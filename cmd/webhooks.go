package cmd

import (
	"os"

	"github.com/getsentry/sentry-go"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"

	"atomys.codes/stud42/internal/webhooks"
)

// webhooksCmd represents the webhooks command
var webhooksCmd = &cobra.Command{
	Use:   "webhooks",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		var amqpURL = os.Getenv("AMQP_URL")
		if amqpURL == "" {
			log.Fatal().Msg("AMQP_URL not set")
		}

		if err := webhooks.New().Serve(amqpURL, "webhooks-deliveries"); err != nil {
			sentry.CaptureException(err)
			log.Fatal().Err(err).Msg("failed to start rabbitmq consumer")
		}
	},
}

func init() {
	jobsCmd.AddCommand(webhooksCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// webhooksCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// webhooksCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

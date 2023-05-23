package cmd

import (
	"context"
	"strings"

	modelsutils "atomys.codes/stud42/internal/models"
	"atomys.codes/stud42/pkg/cache"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var cfgFile string

type keyValueCtxKey struct{}

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "api",
	Short: "stud42 API",
	PersistentPreRun: func(cmd *cobra.Command, args []string) {
		var cacheClient *cache.Client
		var err error

		keyValueStoreUrl := viper.GetString("keyvalue-store-url")
		if keyValueStoreUrl != "" {
			cacheClient, err = cache.NewClient(viper.GetString("keyvalue-store-url"))
			if err != nil {
				log.Fatal().Err(err).Msg("failed to create cache")
			}

			cmd.SetContext(context.WithValue(cmd.Context(), keyValueCtxKey{}, cacheClient))
		}

		if modelsutils.Connect(cacheClient) != nil {
			log.Fatal().Msg("Failed to connect to database")
		}

		if err := modelsutils.Migrate(); err != nil {
			log.Fatal().Err(err).Msg("failed to migrate database")
		}
	},
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute(ctx context.Context) {
	cobra.CheckErr(rootCmd.ExecuteContext(ctx))
}

func init() {
	cobra.OnInitialize(
		// initConfig reads in config file and ENV variables if set.
		initConfig,
	)

	// Here you will define your flags and configuration settings.
	// Cobra supports persistent flags, which, if defined here,
	// will be global for your application.
	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is config/stud42.yaml)")
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	if cfgFile != "" {
		// Use config file from the flag.
		viper.SetConfigFile(cfgFile)
	} else {
		viper.SetConfigName("stud42")
		viper.SetConfigType("yaml")
		viper.AddConfigPath("./config")
	}

	replacer := strings.NewReplacer("-", "_", ".", "_")

	// Replace dot and dash to underscore in env variables.
	viper.SetEnvKeyReplacer(replacer)
	// allow empty env variables to be set (e.g. for local development)
	viper.AllowEmptyEnv(true)
	// read in environment variables that match
	viper.AutomaticEnv()

	// If a config file is found, read it in.
	if err := viper.ReadInConfig(); err == nil {
		log.Info().Msgf("Using config file: %s", viper.ConfigFileUsed())
	}
}

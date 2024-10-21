package cmd

import (
	"encoding/json"
	"fmt"
	"time"

	modelsutils "github.com/42atomys/stud42/internal/models"
	generatedUser "github.com/42atomys/stud42/internal/models/generated/user"
	"github.com/42atomys/stud42/internal/pkg/s3"
	"github.com/google/uuid"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
)

// exportData represents the exportdata command
// This command export all the data of an user as JSON
var exportDataCmd = &cobra.Command{
	Use:   "exportdata",
	Short: "Export all the data for an user as JSON file",
	Run: func(cmd *cobra.Command, args []string) {
		if cmd.Flag("id").Value.String() == "" {
			log.Error().Msg("The ID of the user is missing")
			return
		}

		// Convert the flag to UUID
		userUUID, err := uuid.Parse(cmd.Flag("id").Value.String())
		if err != nil {
			log.Error().Err(err).Msg("Error while parsing the UUID")
			return
		}

		s3Client, err := s3.NewS3Client(s3.ExportsBucketConfigKey)
		if err != nil {
			log.Error().Err(err).Msg("Error while creating the S3 client")
			return
		}

		// Retrieve the user from the database
		user := modelsutils.Client().User.Query().
			WithAccounts().
			WithFollows().
			WithFollowsGroups().
			WithNoticesUsers().
			WithLocations().
			Where(generatedUser.ID(userUUID)).
			FirstX(cmd.Context())

			// Randomize the key
		key := fmt.Sprintf(
			"%s_%s.json",
			user.ID,
			time.Now().UTC().Format("2006-01-02_15-04-05"),
		)

		// Export the user as JSON file to an io.Reader
		bts, err := json.Marshal(user)
		if err != nil {
			log.Error().Err(err).Msg("Error while marshalling the user")
			return
		}

		// Upload the JSON file to S3 bucket and expire after 24 hours
		result, err := s3Client.Upload(key, bts, "private", 24*time.Hour)
		if err != nil {
			log.Error().Err(err).Msg("Error while uploading the JSON file to S3")
			return
		}

		log.Info().Msgf("Successfully uploaded to %s", result.Location)
	},
}

func init() {
	operationsCmd.AddCommand(exportDataCmd)

	exportDataCmd.PersistentFlags().String("id", "", "The ID of the user to export")
}

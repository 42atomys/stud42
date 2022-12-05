package cmd

import (
	"math"
	"strconv"
	"sync"

	modelsutils "atomys.codes/stud42/internal/models"
	modelgen "atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/pkg/searchengine"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
)

// reindexusersCmd represents the reindexusers command
var reindexusersCmd = &cobra.Command{
	Use:   "reindexusers",
	Short: "Do a re-indexation of the users on the meilisearch index",
	Long: `This operation will re-index all the users on the meilisearch index.
This operation is useful when the meilisearch index is corrupted or when the
meilisearch index is not up to date. This operation will take a long time to
complete. This operation will drop the meilisearch index and recreate it with
all the users.`,
	PreRun: func(cmd *cobra.Command, args []string) {
		if err := modelsutils.Connect(); err != nil {
			log.Fatal().Err(err).Msg("failed to connect to database")
		}

		if err := modelsutils.Migrate(); err != nil {
			log.Fatal().Err(err).Msg("failed to migrate database")
		}
		searchengine.Initizialize()
	},
	Run: func(cmd *cobra.Command, args []string) {
		log.Info().Msg("Start the re-indexation of the users")

		meiliClient := searchengine.NewClient()

		// Delete the index
		if _, err := meiliClient.DeleteIndex(searchengine.IndexUser); err != nil {
			log.Fatal().Err(err).Msg("failed to delete the index")
		}

		if err := meiliClient.EnsureAllIndexes(); err != nil {
			log.Fatal().Err(err).Msg("failed to ensure all indexes")
		}

		// Re-index all the users
		batchSize, err := strconv.Atoi(cmd.Flag("batch_size").Value.String())
		if err != nil || batchSize < 1 {
			log.Fatal().Err(err).Msg("Cannot cast batch_size flag. batch_size msut be a positive integer")
		}
		usersCount := modelsutils.Client().User.Query().CountX(cmd.Context())
		log.Info().
			Int("usersCount", usersCount).
			Float64("batchCount", math.Ceil(float64(usersCount)/float64(batchSize))).
			Msg("Start the re-indexation of the users")

		for i := 0; i < usersCount; i += batchSize {
			users := modelsutils.Client().User.Query().Offset(i).Limit(batchSize).AllX(cmd.Context())

			log.Info().Int("batchId", i).Int("usersCount", len(users)).Msg("Reindexing users in batch")

			var wg sync.WaitGroup
			for _, user := range users {
				wg.Add(1)
				go func(user *modelgen.User) {
					defer wg.Done()

					document := &searchengine.UserDocument{
						ID:              user.ID,
						CurrentCampusID: user.CurrentCampusID,
						DuoLogin:        user.DuoLogin,
						FirstName:       user.FirstName,
						UsualFirstName:  user.UsualFirstName,
						LastName:        user.LastName,
					}

					if err := meiliClient.UpdateUserDocument(cmd.Context(), document); err != nil {
						log.Fatal().Err(err).Msg("failed to index user")
					}
				}(user)
			}
			// Wait for the goroutine to finish
			wg.Wait()
		}

		log.Info().Msg("End of the re-indexation of the users")
	},
}

func init() {
	operationsCmd.AddCommand(reindexusersCmd)
	
	operationsCmd.Flags().StringP("batch_size", "b", "50", "Batch size of the reindex")
}

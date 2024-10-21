package cmd

import (
	"entgo.io/ent/dialect/sql"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"

	modelsutils "github.com/42atomys/stud42/internal/models"
	modelgen "github.com/42atomys/stud42/internal/models/generated"
	"github.com/42atomys/stud42/internal/models/generated/campus"
	"github.com/42atomys/stud42/pkg/duoapi"
)

// campusCmd represents the campus command
var campusCmd = &cobra.Command{
	Use:   "campus",
	Short: "Crawl all campus of 42 network and update the database",
	Run: func(cmd *cobra.Command, args []string) {
		log.Info().Msg("Start the crawling of all campus of 42 network")
		campuses, err := duoapi.CampusAll(cmd.Context())
		if err != nil {
			log.Fatal().Err(err).Msg("Failed to get duoapi response")
		}

		db := modelsutils.Client()
		for _, c := range campuses {
			log.Debug().Msg("Insert data of campus " + c.Name)
			err := db.Campus.Create().
				SetActive(c.Active).
				SetAddress(c.Address).
				SetCity(c.City).
				SetCountry(c.Country).
				SetEmailExtension(c.EmailExtension).
				SetTwitter(c.Twitter).
				SetWebsite(c.Website).
				SetZip(c.Zip).
				SetDuoID(c.ID).
				SetName(c.Name).
				SetTimeZone(c.TimeZone).
				SetLanguageCode(c.Language.Identifier).
				OnConflict(sql.ConflictColumns(campus.FieldDuoID)).
				UpdateNewValues().
				Exec(cmd.Context())
			if err != nil {
				if modelgen.IsNotFound(err) {
					log.Debug().Msg("Campus " + c.Name + " already exists")
					continue
				}
				log.Error().Err(err).Msg("Failed to insert campus")
				continue
			}
			log.Info().Msg("Successfully import the campus of " + c.Name)
		}
		log.Info().Msgf("Successfully imported %d campus", len(campuses))
	},
}

func init() {
	crawlerCmd.AddCommand(campusCmd)
}

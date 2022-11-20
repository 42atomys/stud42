/*
Copyright © 2022 42Atomys

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
package cmd

import (
	"database/sql"
	"errors"
	"strconv"
	"time"

	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"

	modelsutils "atomys.codes/stud42/internal/models"
	modelgen "atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/campus"
	"atomys.codes/stud42/internal/models/generated/location"
	"atomys.codes/stud42/internal/models/generated/user"
	"atomys.codes/stud42/pkg/duoapi"
)

// locationsCmd represents the locations command
var locationsCmd = &cobra.Command{
	Use:   "locations",
	Short: "Crawl all active locations of specific campus and update the database",
	Long: `Crawl all active locations of specific campus and update the database.
For any closed locations, the location will be marked as inactive in the database.`,
	Run: func(cmd *cobra.Command, args []string) {
		var campusID = cmd.Flag("campus_id").Value.String()

		if modelsutils.Connect() != nil {
			log.Fatal().Msg("Failed to connect to database")
		}
		db := modelsutils.Client()

		// Retrieve the campus
		cID, _ := strconv.Atoi(campusID)
		campus, err := db.Campus.Query().Where(campus.DuoID(cID)).Only(cmd.Context())
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				log.Fatal().Msgf("Campus %s not found", campusID)
			}
			log.Fatal().Err(err).Msg("Failed to get campus")
		}
		log.Info().Msgf("Start the crawling of active locations of campus %s (%s)", campus.Name, campusID)

		// Fetch all active locations of the campus
		locations, err := duoapi.LocationsActive(cmd.Context(), "1")
		if err != nil {
			log.Fatal().Err(err).Msg("Failed to get duoapi response")
		}

		log.Debug().Msgf("Found %d locations", len(locations))

		// Create the new locations in the database
		duoLocationIDs := []int{}
		for _, l := range locations {
			log.Debug().Msgf("Crawling location %d", l.ID)
			duoLocationIDs = append(duoLocationIDs, l.ID)

			u, err := modelsutils.UserFirstOrCreateFromComplexLocation(cmd.Context(), l)
			if err != nil {
				log.Fatal().Err(err).Msg("Failed to create user")
			}

			if err = modelsutils.WithTx(cmd.Context(), db, func(tx *modelgen.Tx) error {
				createdLocationID, err := db.Location.Create().
					SetCampus(campus).
					SetUser(u).
					SetDuoID(l.ID).
					SetBeginAt(l.BeginAt.Time()).
					SetNillableEndAt(l.EndAt.NillableTime()).
					SetIdentifier(l.Host).
					SetUserDuoID(l.User.ID).
					SetUserDuoLogin(l.User.Login).
					OnConflictColumns(location.FieldDuoID).DoNothing().
					ID(cmd.Context())
				if err != nil {
					log.Error().Err(err).Msg("Failed to create location")
					return err
				}

				if err := db.User.UpdateOne(u).
					SetCurrentLocationID(createdLocationID).
					SetLastLocationID(createdLocationID).
					Exec(cmd.Context()); err != nil {
					log.Error().Err(err).Msg("Failed to update user")
					return err
				}

				return nil
			}); err != nil {
				log.Fatal().Err(err).Msg("Failed to process location")
			}
		}

		// Mark all locations as inactive that are not in the list anymore
		err = modelsutils.WithTx(cmd.Context(), db, func(tx *modelgen.Tx) error {
			locationUUIDsToClose, err := db.Location.Query().Where(
				location.DuoIDNotIn(duoLocationIDs...),
				location.CampusID(campus.ID),
				location.EndAtIsNil(),
			).IDs(cmd.Context())
			if err != nil {
				return err
			}

			// Close location
			if err := db.Location.Update().
				Where(location.IDIn(locationUUIDsToClose...)).
				SetEndAt(time.Now().UTC()).
				Exec(cmd.Context()); err != nil {
				return err
			}

			// Unassign current location from user
			if err := db.User.Update().
				Where(user.CurrentLocationIDIn(locationUUIDsToClose...)).
				ClearCurrentLocation().
				Exec(cmd.Context()); err != nil {
				return err
			}
			log.Info().Msgf("Successfully close %d inactive locations", len(locationUUIDsToClose))
			return nil
		})

		if err != nil {
			log.Fatal().Err(err).Msg("Failed to close inactive locations")
		}

		log.Info().Msgf("Successfully sync the campus of %s with %d locations active", campus.Name, len(locations))
	},
}

func init() {
	crawlerCmd.AddCommand(locationsCmd)

	locationsCmd.Flags().StringP("campus_id", "c", "1", "Campus to crawl")
}

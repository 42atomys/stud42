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

var campusIDFlag *string

// locationsCmd represents the locations command
var locationsCmd = &cobra.Command{
	Use:   "locations",
	Short: "Crawl all active locations of specific campus and update the database",
	Long: `Crawl all active locations of specific campus and update the database.
For any closed locations, the location will be marked as inactive in the database.`,
	Run: func(cmd *cobra.Command, args []string) {
		var campusID = cmd.Flag("campus_id").Value.String()

		log.Info().Msgf("Start the crawling of active locations of campus %s", campusID)
		if modelsutils.Connect() != nil {
			log.Fatal().Msg("Failed to connect to database")
		}

		cID, _ := strconv.Atoi(campusID)
		campus, err := modelsutils.Client().Campus.Query().Where(campus.DuoID(cID)).Only(cmd.Context())
		if err != nil {
			if errors.Is(err, sql.ErrNoRows) {
				log.Fatal().Msgf("Campus %s not found", campusID)
			}
			log.Fatal().Err(err).Msg("Failed to get campus")
		}

		locations, err := duoapi.LocationsActive(cmd.Context(), "1")
		if err != nil {
			log.Fatal().Err(err).Msg("Failed to get duoapi response")
		}

		log.Debug().Msgf("Found %d locations", len(locations))

		client := modelsutils.Client()
		bulk := []*modelgen.LocationCreate{}
		for _, l := range locations {
			u, err := client.User.Query().Where(user.DuoID(l.User.ID)).Only(cmd.Context())
			if err != nil {
				if modelgen.IsNotFound(err) {
					err := client.User.Create().
						SetEmail(l.User.Email).
						SetDuoID(l.User.ID).
						SetDuoLogin(l.User.Login).
						SetFirstName(l.User.FirstName).
						SetLastName(l.User.LastName).
						SetUsualFirstName(l.User.UsualFirstName).
						SetPhone(l.User.Phone).
						SetPoolMonth(l.User.PoolMonth).
						SetPoolYear(l.User.PoolYear).
						SetIsStaff(l.User.Staff).
						SetIsAUser(false).
						OnConflictColumns(user.FieldDuoID).
						DoNothing().
						Exec(cmd.Context())
					if err != nil {
						log.Fatal().Err(err).Msg("Failed to create user")
					}
					u, err = client.User.Query().Where(user.DuoID(l.User.ID)).Only(cmd.Context())
					if err != nil {
						log.Fatal().Err(err).Msg("Failed to get user 1")
					}
				} else {
					log.Fatal().Err(err).Msg("Failed to get user 2")
				}
			}

			bulk = append(bulk, client.Location.Create().
				SetCampus(campus).
				SetUser(u).
				SetDuoID(l.ID).
				SetBeginAt(l.BeginAt).
				SetNillableEndAt(l.EndAt).
				SetIdentifier(l.Host).
				SetUserDuoID(l.User.ID).
				SetUserDuoLogin(l.User.Login))
		}
		err = modelsutils.Client().Location.CreateBulk(bulk...).OnConflictColumns(location.FieldDuoID).DoNothing().Exec(cmd.Context())
		if err != nil {
			log.Fatal().Err(err).Msg("Failed to create locations")
		}

		log.Info().Msgf("Successfully import %d locations", len(locations))

		log.Info().Msg("Start the closing of inactive locations")
		locationsDuoIDs := []int{}
		for _, l := range locations {
			locationsDuoIDs = append(locationsDuoIDs, l.ID)
		}

		err = client.Location.Update().
			Where(location.DuoIDNotIn(locationsDuoIDs...)).
			SetEndAt(time.Now().UTC()).Exec(cmd.Context())
		if err != nil {
			log.Fatal().Err(err).Msg("Failed to close inactive locations")
		}
		log.Info().Msgf("Successfully close inactive locations")
	},
}

func init() {
	crawlerCmd.AddCommand(locationsCmd)

	locationsCmd.Flags().StringP("campus_id", "c", "1", "Campus to crawl")
}

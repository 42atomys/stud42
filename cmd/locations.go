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
	"os"
	"strconv"
	"time"

	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"

	modelsutils "atomys.codes/stud42/internal/models"
	modelgen "atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/campus"
	"atomys.codes/stud42/internal/models/generated/location"
	"atomys.codes/stud42/pkg/duoapi"
)

// locationsCmd represents the locations command
//! DEPRECATED. This command is no longer used and replaced by the webhooks
//! system. This command is kept for backwards compatibility. It will be removed
//! in a future release. See the webhooks command for more information.
var locationsCmd = &cobra.Command{
	Use:   "locations",
	Short: "Crawl all active locations of specific campus and update the database",
	Long: `Crawl all active locations of specific campus and update the database.
For any closed locations, the location will be marked as inactive in the database.`,
	Run: func(cmd *cobra.Command, args []string) {
		var campusID = cmd.Flag("campus_id").Value.String()

		if os.Getenv("GO_ENV") == "production" {
			log.Fatal().Msg("This command is deprecated and will be removed in a future release. See the webhooks command for more information.")
		}
		log.Warn().Msg("This command is deprecated. Avoid using it in production.")

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
			u, err := modelsutils.UserFirstOrCreateFromComplexLocation(cmd.Context(), l)
			if err != nil {
				log.Fatal().Err(err).Msg("Failed to create user")
			}

			bulk = append(bulk, client.Location.Create().
				SetCampus(campus).
				SetUser(u).
				SetDuoID(l.ID).
				SetBeginAt(l.BeginAt.Time()).
				SetNillableEndAt(l.EndAt.NillableTime()).
				SetIdentifier(l.Host).
				SetUserDuoID(l.User.ID).
				SetUserDuoLogin(l.User.Login))
		}
		modelsutils.Client().Location.CreateBulk(bulk...).OnConflictColumns(location.FieldDuoID).DoNothing().ExecX(cmd.Context())

		for _, duoLoc := range locations {
			l := modelsutils.Client().Location.Query().Where(location.DuoID(duoLoc.ID)).FirstX(cmd.Context())

			log.Debug().Interface("location", l).Str("duo_id", duoLoc.User.Login).Msg("Assign user to location")
			modelsutils.Client().User.UpdateOneID(l.UserID).SetCurrentLocation(l).ExecX(cmd.Context())
		}

		log.Info().Msgf("Successfully import %d locations", len(locations))

		log.Info().Msg("Start the closing of inactive locations")
		for _, duoLoc := range locations {
			l := modelsutils.Client().Location.Query().Where(location.DuoID(duoLoc.ID)).FirstX(cmd.Context())
			l.Update().SetEndAt(time.Now().UTC()).ExecX(cmd.Context())
			modelsutils.Client().User.UpdateOneID(l.UserID).SetCurrentLocation(nil).Exec(cmd.Context())
		}

		log.Info().Msgf("Successfully close inactive locations")
	},
}

func init() {
	crawlerCmd.AddCommand(locationsCmd)

	locationsCmd.Flags().StringP("campus_id", "c", "1", "Campus to crawl")
}

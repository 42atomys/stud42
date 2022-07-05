package webhooks

import (
	"database/sql"
	"errors"

	"github.com/rs/zerolog/log"

	modelsutils "atomys.codes/stud42/internal/models"
	"atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/campus"
	"atomys.codes/stud42/internal/models/generated/location"
	"atomys.codes/stud42/internal/models/generated/user"
	"atomys.codes/stud42/pkg/duoapi"
)

type locationProcessor struct {
	*processor
	duoapi.LocationWebhookProcessor[duoapi.LocationUser]
}

func (p *locationProcessor) Create(loc *duoapi.Location[duoapi.LocationUser], metadata *duoapi.WebhookMetadata) error {
	campus, err := p.db.Campus.Query().Where(campus.DuoID(loc.CampusID)).Only(p.ctx)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			log.Error().Msgf("Campus %d not found", loc.CampusID)
			return err
		}
		log.Error().Err(err).Msg("Failed to get campus")
		return err
	}

	// retrieve or create user in database from the location object received
	user, err := modelsutils.UserFirstOrCreateFromLocation(p.ctx, loc)
	if err != nil {
		log.Error().Err(err).Msg("Failed to create user")
		return err
	}

	// create the location object in the database and link it to the user
	// if the location already exists, update it
	err = modelsutils.WithTx(p.ctx, p.db, func(tx *generated.Tx) error {
		locationID, err := tx.Location.Create().
			SetCampus(campus).
			SetDuoID(loc.ID).
			SetBeginAt(loc.BeginAt.Time()).
			SetNillableEndAt(loc.EndAt.NillableTime()).
			SetIdentifier(loc.Host).
			SetUser(user).
			SetUserDuoID(loc.User.ID).
			SetUserDuoLogin(user.DuoLogin).
			OnConflictColumns(location.FieldDuoID).
			UpdateNewValues().
			ID(p.ctx)

		if err != nil {
			return err
		}
		// Assign the current location to the user if it's not already assigned
		// to the user.
		return tx.User.UpdateOneID(user.ID).SetCurrentLocationID(locationID).Exec(p.ctx)
	})
	
	return err
}
func (p *locationProcessor) Close(loc *duoapi.Location[duoapi.LocationUser], metadata *duoapi.WebhookMetadata) error {
	return modelsutils.WithTx(p.ctx, p.db, func(tx *generated.Tx) error {
		// Close the location in database
		err := p.db.Location.Update().
			SetNillableEndAt(loc.EndAt.NillableTime()).
			SetIdentifier(loc.Host).
			Where(location.DuoID(loc.ID)).
			Exec(p.ctx)

		if err != nil && !generated.IsNotFound(err) {
			return err
		}

		// Unlink the user from the location in database if the location is closed 
		// and the user is not assigned to another location anymore (i.e. the user
		// is not assigned to any other location)
		return p.unlinkLocation(loc)
	})
}
func (p *locationProcessor) Destroy(loc *duoapi.Location[duoapi.LocationUser], metadata *duoapi.WebhookMetadata) error {
	// Delete the location in database
	_, err := p.db.Location.Delete().Where(location.DuoID(loc.ID)).Exec(p.ctx)
	if err != nil && !generated.IsNotFound(err) {
		return err
	}
	
	// Unlink the user from the location in database if the location is destroyed
	return p.unlinkLocation(loc)
}

func (p *locationProcessor) unlinkLocation(duoLoc *duoapi.Location[duoapi.LocationUser]) error {
	user, err := p.db.User.Query().Where(user.DuoID(duoLoc.User.ID)).First(p.ctx)
	if err != nil {
		if generated.IsNotFound(err) {
			return nil
		}
		return err
	}

	return p.db.User.UpdateOne(user).ClearCurrentLocation().Exec(p.ctx)
}
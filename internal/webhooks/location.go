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
	locationID, err := p.db.Location.Create().
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
	return p.db.User.UpdateOneID(user.ID).SetCurrentLocationID(locationID).Exec(p.ctx)
}
func (p *locationProcessor) Close(loc *duoapi.Location[duoapi.LocationUser], metadata *duoapi.WebhookMetadata) error {
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
	return p.db.User.UpdateOne(p.db.User.Query().Where(user.DuoID(loc.User.ID)).FirstX(p.ctx)).SetCurrentLocation(nil).Exec(p.ctx)
}
func (p *locationProcessor) Destroy(loc *duoapi.Location[duoapi.LocationUser], metadata *duoapi.WebhookMetadata) error {
	// Delete the location in database
	_, err := p.db.Location.Delete().Where(location.DuoID(loc.ID)).Exec(p.ctx)
	if err != nil && !generated.IsNotFound(err) {
		return err
	}
	
	// Unlink the user from the location in database if the location is destroyed
	return p.db.User.UpdateOne(p.db.User.Query().Where(user.DuoID(loc.User.ID)).FirstX(p.ctx)).SetCurrentLocation(nil).Exec(p.ctx)
}

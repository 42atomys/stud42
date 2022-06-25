package webhooks

import (
	"database/sql"
	"errors"

	"github.com/rs/zerolog/log"

	modelsutils "atomys.codes/stud42/internal/models"
	"atomys.codes/stud42/internal/models/generated/campus"
	"atomys.codes/stud42/internal/models/generated/location"
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
			log.Fatal().Msgf("Campus %s not found", loc.CampusID)
		}
		log.Fatal().Err(err).Msg("Failed to get campus")
	}

	user, err := modelsutils.UserFirstOrCreateFromLocation(p.ctx, loc)
	if err != nil {
		log.Error().Err(err).Msg("Failed to create user")
	}

	return p.db.Location.Create().
		SetCampus(campus).
		SetDuoID(loc.ID).
		SetBeginAt(loc.BeginAt.Time()).
		SetNillableEndAt(loc.EndAt.NillableTime()).
		SetIdentifier(loc.Host).
		SetUser(user).
		SetUserDuoID(loc.User.ID).
		SetUserDuoLogin(user.DuoLogin).
		Exec(p.ctx)
}
func (p *locationProcessor) Close(loc *duoapi.Location[duoapi.LocationUser], metadata *duoapi.WebhookMetadata) error {
	return p.db.Location.Update().
		SetNillableEndAt(loc.EndAt.NillableTime()).
		SetIdentifier(loc.Host).
		Where(location.DuoID(loc.ID)).
		Exec(p.ctx)
}
func (p *locationProcessor) Destroy(loc *duoapi.Location[duoapi.LocationUser], metadata *duoapi.WebhookMetadata) error {
	_, err := p.db.Location.Delete().Where(location.DuoID(loc.ID)).Exec(p.ctx)
	return err
}

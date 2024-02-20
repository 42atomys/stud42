package webhooks

import (
	"strings"

	modelgen "atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/user"
	"atomys.codes/stud42/pkg/duoapi"
)

type userProcessor struct {
	*processor
	duoapi.UserWebhookProcessor
}

func unmarshalAndProcessUser(data []byte, metadata duoapi.WebhookMetadata, p *processor) error {
	webhookUser, err := unmarshalWebhook[duoapi.WebhookMetadata, duoapi.User](data)
	if err != nil {
		return err
	}
	return webhookUser.Payload.ProcessWebhook(p.ctx, &metadata, &userProcessor{processor: p})
}

func (p *userProcessor) Create(u *duoapi.User, metadata *duoapi.WebhookMetadata) error {
	ok, err := p.db.User.Query().Where(user.DuoID(u.ID)).Exist(p.ctx)
	if err != nil && !modelgen.IsNotFound(err) {
		return err
	}

	if ok {
		return p.Update(u, metadata)
	}

	// Prevent duplication of user email and data leak
	// Due to the way the Duo API works, some webhooks is not received and user
	// update when user is anonymized or deleted is not received.
	existedUser, err := p.db.User.Query().Where(user.Email(u.Email)).First(p.ctx)
	if err != nil && !modelgen.IsNotFound(err) {
		return err
	}
	if existedUser != nil {
		return p.db.User.DeleteOne(existedUser).Exec(p.ctx)
	}

	return p.db.User.Create().
		SetDuoID(u.ID).
		SetDuoLogin(u.Login).
		SetFirstName(u.FirstName).
		SetLastName(u.LastName).
		SetDuoAvatarURL(u.Image.Link).
		SetDuoAvatarSmallURL(u.Image.Versions.Small).
		SetEmail(u.Email).
		SetIsStaff(u.Staff).
		SetNillableUsualFirstName(&u.UsualFirstName).
		Exec(p.ctx)
}

func (p *userProcessor) Update(u *duoapi.User, metadata *duoapi.WebhookMetadata) error {
	if strings.HasPrefix(u.Login, "3b3") {
		_, err := p.db.User.Delete().Where(user.DuoID(u.ID)).Exec(p.ctx)
		if modelgen.IsNotFound(err) {
			return nil
		}
		return err
	}

	err := p.db.User.Update().
		SetDuoID(u.ID).
		SetDuoLogin(u.Login).
		SetFirstName(u.FirstName).
		SetLastName(u.LastName).
		SetEmail(u.Email).
		SetIsStaff(u.Staff).
		SetPoolYear(u.PoolYear).
		SetPoolMonth(u.PoolMonth).
		SetDuoAvatarURL(u.Image.Link).
		SetDuoAvatarSmallURL(u.Image.Versions.Small).
		SetNillableUsualFirstName(&u.UsualFirstName).
		Where(user.DuoID(u.ID)).
		Exec(p.ctx)

	if modelgen.IsNotFound(err) {
		return p.Create(u, metadata)
	}

	return err
}

func (p *userProcessor) Alumnize(u *duoapi.User, metadata *duoapi.WebhookMetadata) error {
	return p.Update(u, metadata)
}

package webhooks

import (
	"fmt"

	typesgen "atomys.codes/stud42/internal/api/generated/types"
	modelgen "atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/user"
	"atomys.codes/stud42/pkg/duoapi"
)

type userProcessor struct {
	*processor
	duoapi.UserWebhookProcessor
}

func (p *userProcessor) Create(u *duoapi.User, metadata *duoapi.WebhookMetadata) error {
	return p.db.User.Create().
		AddAccounts(&modelgen.Account{
			Provider:          string(typesgen.ProviderDuo),
			ProviderAccountID: fmt.Sprint(u.ID),
			Username:          u.Login,
		}).
		SetDuoID(u.ID).
		SetDuoLogin(u.Login).
		SetFirstName(u.FirstName).
		SetLastName(u.LastName).
		SetEmail(u.Email).
		SetIsStaff(u.Staff).
		SetNillableUsualFirstName(&u.UsualFirstName).
		OnConflictColumns(user.FieldDuoID).
		UpdateNewValues().
		Exec(p.ctx)
}

func (p *userProcessor) Update(u *duoapi.User, metadata *duoapi.WebhookMetadata) error {
	return p.Create(u, metadata)
}

func (p *userProcessor) Alumnize(u *duoapi.User, metadata *duoapi.WebhookMetadata) error {
	return p.Create(u, metadata)
}

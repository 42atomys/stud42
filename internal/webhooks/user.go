package webhooks

import (
	"strconv"

	typesgen "atomys.codes/stud42/internal/api/generated/types"
	modelgen "atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/account"
	"atomys.codes/stud42/internal/models/generated/user"
	"atomys.codes/stud42/pkg/duoapi"
)

type userProcessor struct {
	*processor
	duoapi.UserWebhookProcessor
}

func (p *userProcessor) Create(u *duoapi.User, metadata *duoapi.WebhookMetadata) error {
	accountID, err := p.db.Account.Create().
		SetType(string(typesgen.AccountTypeOauth)).
		SetProvider(string(typesgen.ProviderDuo)).
		SetProviderAccountID(strconv.Itoa(u.ID)).
		SetUsername(u.Login).
		OnConflictColumns(account.FieldProvider, account.FieldProviderAccountID).
		UpdateNewValues().
		ID(p.ctx)
	if err != nil {
		return err
	}

	return p.db.User.Create().
		AddAccountIDs(accountID).
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
	err := p.db.User.Update().
		SetDuoID(u.ID).
		SetDuoLogin(u.Login).
		SetFirstName(u.FirstName).
		SetLastName(u.LastName).
		SetEmail(u.Email).
		SetIsStaff(u.Staff).
		SetPhone(u.Phone).
		SetPoolYear(u.PoolYear).
		SetPoolMonth(u.PoolMonth).
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

package webhooks

import (
	modelgen "atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/campus"
	"atomys.codes/stud42/internal/models/generated/user"
	"atomys.codes/stud42/pkg/duoapi"
)

type campusUserProcessor struct {
	*processor
	duoapi.CampusUserWebhookProcessor
}

func (p *campusUserProcessor) Create(cu *duoapi.CampusUser, metadata *duoapi.WebhookMetadata) error {
	// Do nothing if the primary campus is not true. Due to the fact of when an
	// User switch of campus : the current campus is set to false and the new
	// campus is set to true in second time.
	if !cu.IsPrimary {
		return nil
	}

	user, err := p.db.User.Query().Where(user.DuoID(cu.UserID)).First(p.ctx)
	if err != nil && !modelgen.IsNotFound(err) {
		return err
	}

	// Do nothing if the user is not found.
	if modelgen.IsNotFound(err) {
		return nil
	}

	// Find the campus.
	campusID, err := p.db.Campus.Query().Where(campus.DuoID(cu.CampusUD)).FirstID(p.ctx)
	if err != nil {
		return err
	}

	return user.Update().SetCurrentCampusID(campusID).Exec(p.ctx)
}

func (p *campusUserProcessor) Update(cu *duoapi.CampusUser, metadata *duoapi.WebhookMetadata) error {
	return p.Create(cu, metadata)
}

func (p *campusUserProcessor) Destroy(cu *duoapi.CampusUser, metadata *duoapi.WebhookMetadata) error {
	campusID, err := p.db.Campus.Query().Where(campus.DuoID(cu.CampusUD)).FirstID(p.ctx)
	if err != nil && !modelgen.IsNotFound(err) {
		return err
	}

	if modelgen.IsNotFound(err) {
		return nil
	}

	return p.db.User.Update().Where(user.CurrentCampusID(campusID)).ClearCurrentCampusID().Exec(p.ctx)
}

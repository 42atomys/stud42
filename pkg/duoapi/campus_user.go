package duoapi

import "context"

// CampusUserWebhookProcessor is the interface that must be implemented by a
// webhook processor for the CampusUser model.
type CampusUserWebhookProcessor interface {
	WebhookProcessor

	// Create is called when a new campusUser is created.
	Create(campusUser *CampusUser, metadata *WebhookMetadata) error
	// Update is called when a campusUser is updated.
	Update(campusUser *CampusUser, metadata *WebhookMetadata) error
	// Destroy is called when a campusUser is destroyed.
	Destroy(campusUser *CampusUser, metadata *WebhookMetadata) error
}

// HasWebhooks returns true because the CampusUser model has webhooks.
func (*CampusUser) HasWebhooks() bool {
	return true
}

// ProcessWebhook processes a webhook for the CampusUser model.
func (cu *CampusUser) ProcessWebhook(ctx context.Context, metadata *WebhookMetadata, processor WebhookProcessor) error {
	p, ok := processor.(CampusUserWebhookProcessor)
	if !ok {
		return ErrInvalidWebhookProcessor
	}

	switch metadata.Event {
	case "create":
		return p.Create(cu, metadata)
	case "update":
		return p.Update(cu, metadata)
	case "destroy":
		return p.Destroy(cu, metadata)
	}
	return nil
}

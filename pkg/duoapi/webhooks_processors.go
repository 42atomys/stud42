package duoapi

import (
	"context"
)

// LocationWebhookProcessor is the interface that must be implemented by a
// webhook processor for the Location model.
type LocationWebhookProcessor[T ILocationUser] interface {
	WebhookProcessor

	// Create is called when a new location is created.
	Create(location *Location[T], metadata *WebhookMetadata) error
	// Close is called when a location is closed.
	// (When an user disconnects from a location)
	Close(location *Location[T], metadata *WebhookMetadata) error
	// Destroy is called when a location is destroyed.
	// (When a location is invalid and removed by the system)
	Destroy(location *Location[T], metadata *WebhookMetadata) error
}

// HasWebhooks returns true because the Location model has webhooks.
func (*Location[LocationUser]) HasWebhooks() bool {
	return true
}

// ProcessWebhook processes a webhook for the Location model.
func (l *Location[LocationUser]) ProcessWebhook(ctx context.Context, metadata *WebhookMetadata, processor WebhookProcessor) error {
	p, ok := processor.(LocationWebhookProcessor[LocationUser])
	if !ok {
		return ErrInvalidWebhookProcessor
	}

	switch metadata.Event {
	case "create":
		return p.Create(l, metadata)
	case "close":
		return p.Close(l, metadata)
	case "destroy":
		return p.Destroy(l, metadata)
	}
	return nil
}

// UserWebhookProcessor is the interface that must be implemented by a
// webhook processor for the User model.
type UserWebhookProcessor interface {
	WebhookProcessor

	// Create is called when a new user is created.
	Create(location *User, metadata *WebhookMetadata) error
	// Update is called when an user is updated.
	Update(location *User, metadata *WebhookMetadata) error
	// Alumnize is called when an user is alumnized.
	Alumnize(location *User, metadata *WebhookMetadata) error
}

// HasWebhooks returns true because the User model has webhooks.
func (*User) HasWebhooks() bool {
	return true
}

// ProcessWebhook processes a webhook for the User model.
func (l *User) ProcessWebhook(ctx context.Context, metadata *WebhookMetadata, processor WebhookProcessor) error {
	p, ok := processor.(UserWebhookProcessor)
	if !ok {
		return ErrInvalidWebhookProcessor
	}

	switch metadata.Event {
	case "create":
		return p.Create(l, metadata)
	case "update":
		return p.Update(l, metadata)
	case "alumnize":
		return p.Alumnize(l, metadata)
	}
	return nil
}

package duoapi

import (
	"context"
	"encoding/json"
)

func UserGet(ctx context.Context, userID string) (*User, error) {
	var user = &User{}
	err := request(ctx, EndpointUsers+"/"+userID, nil, &user)
	if err != nil {
		return nil, err
	}
	return user, nil
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

// MarshalBinary implements the encoding.BinaryMarshaler interface.
// This is used by the cache package.
func (obj *User) MarshalBinary() ([]byte, error) {
	return json.Marshal(obj)
}

// UnmarshalBinary implements the encoding.BinaryUnmarshaler interface.
// This is used by the cache package.
func (obj *User) UnmarshalBinary(data []byte) error {
	return json.Unmarshal(data, &obj)
}

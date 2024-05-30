package duoapi

import (
	"context"
	"strings"
)

// LocationsActive returns the list of active locations of a campus
func LocationsActive(ctx context.Context, campusID string) ([]*Location[ComplexLocationUser], error) {
	var locations = make([]*Location[ComplexLocationUser], 0)
	err := requestCollection(ctx, EndpointLocations, map[string]string{"campus_id": campusID, "per_page": "100", "filter[active]": "true"}, &locations)
	if err != nil {
		return nil, err
	}
	return locations, nil
}

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

	// Skip location for anonymized users
	if strings.HasPrefix(l.User.Login, "3b3") {
		return nil
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

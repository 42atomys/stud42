package duoapi

import (
	"context"
	"encoding/json"

	"github.com/rs/zerolog/log"
)

type WebhookMetadata struct {
	Event string `json:"X-Event"`
	Model string `json:"X-Model"`
	DeliveryID    string `json:"X-Delivery-ID"`
}

type Webhook[T any] struct {
	Metadata *WebhookMetadata `json:"metadata"`
	Payload     *T 						 `json:"payload"`
}

func WebhookHandler[T any](ctx context.Context, data []byte) {
	md := &Webhook[T]{}
	err := json.Unmarshal(data, &md)
	if err != nil {
		log.Error().Err(err).Msg("Failed to unmarshal webhook metadata")
	}

	switch md.Metadata.Event {
		case "location":
			log.Debug().Msg("Received location webhook")
			locationHandler(ctx, md.Payload)
	}
}

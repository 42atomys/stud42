package webhooks

import (
	"encoding/json"

	"github.com/rs/zerolog/log"
)

// unmarshalWebhook is an helper function to unmarshal the webhook payload with
// the desired type of metadata and payload. Thanks to the Go generics, this
// function can be used with any type of metadata and payload.
func unmarshalWebhook[Metadata any, Payload any](data []byte) (*webhook[Metadata, Payload], error) {
	webhookPayload := &webhook[Metadata, Payload]{}

	if err := json.Unmarshal(data, &webhookPayload); err != nil {
		log.Error().Err(err).Msg("Failed to unmarshal webhook payload")
		return nil, err
	}

	return webhookPayload, nil
}

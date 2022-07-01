package duoapi

import (
	"context"
	"encoding/json"
	"errors"
)

// Webhooks System is an advanced mechanism of the 42 API. Most applications
// will not need to use it and cannot have access to the Webhooks system.
//
// The Webhooks system is used to send notifications to applications when
// certain events happen in the 42 ecosystem.
//
// To use the s42 webhooks system, you need to reformat the JSON payloads
// that are sent to the webhooks system. The following is an example of a
// webhook payload:
// 	{
//	"metadata": {
//		"event": "create",
//		"model": "location",
//		"deliveryID": "6e9004ca-160e-4712-b3df-c2670f49c03f"
//	},
//	"payload": {
//		"campus_id": "12345",
//		"id": "12345",
//		"active": true,
//		"host": "e1r1p1",
//	}
// }
//
//
// A Wiki page will be created in the future to explain the webhooks system
// and how to use it. For now, please refer to the implementation of the
// webhooks system in the s42 API. (internal/webhooks/*.go)

type IWebhookPayload interface {
	ProcessWebhook(ctx context.Context, metadata *WebhookMetadata, processor WebhookProcessor) error
}

// WebhookMetadata contains the metadata of a webhook.
// This informations is sended originally by the 42 API on the Header of the
// webhook.
type WebhookMetadata struct {
	// Event is the event that triggered the webhook. (Header: X-Event)
	// Possible values are listed on the interface {Model}WebhookProcessor.
	Event string `json:"event"`
	// Model is the model that triggered the webhook. (Header: X-Model)
	// Possible values are all models with WebhookProcessor implemented.
	Model string `json:"model"`
	// DeliveryID is the ID of the webhook delivery. (Header: X-Delivery)
	DeliveryID string `json:"deliveryID"`
}

// Webhook is the JSON structure of a FORMATTED webhook payload.
// This is the format used acutally internally by the S42 project.
type Webhook struct {
	Metadata *WebhookMetadata `json:"metadata"`
	Payload  IWebhookPayload  `json:"payload"`
}

// WebhookProcessor is the interface that must be implemented by all webhook
// processors and used to know which models have webhooks.
type WebhookProcessor interface {
	HasWebhooks() bool
}

// ErrInvalidWebhookProcessor is returned when the processor is not valid for
// the requested model. To know which methods are valid for a model, please
// refer to the implementation of {Model}WebhookProcessor.
//
// Example: for `Location` refers to `LocationWebhookProcessor``
var ErrInvalidWebhookProcessor = errors.New("invalid webhook processor for current type")

// UnmarshalJSON unmarshals the JSON FORMATTED payload into a Webhook struct.
// This is the format used acutally internally by the S42 project.
func (w *Webhook) UnmarshalJSON(data []byte) error {
	type tp struct {
		Metadata struct {
			Model string `json:"model"`
		} `json:"metadata"`
	}
	var typ = tp{}

	if err := json.Unmarshal(data, &typ); err != nil {
		return err
	}

	switch typ.Metadata.Model {
	case "location":
		w.Payload = new(Location[LocationUser])
	case "user":
		w.Payload = new(User)
	}

	type tmp Webhook // avoids infinite recursion
	return json.Unmarshal(data, (*tmp)(w))
}

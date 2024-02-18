package webhooks

import (
	"time"
)

type webhook[Metadata any, Payload any] struct {
	Metadata Metadata `json:"metadata"`
	Payload  Payload  `json:"payload"`
}

// metadataWebhooked is the structure of the webhook metadata sent by the
// webhooked project formatted following this schema:
type webhookMetadata struct {
	SpecName string `json:"specName"`
}

// githubWebhookMetadata is the structure of the webhook metadata sent by the
// webhooked project formatted following this schema for GitHub webhooks:
type githubWebhookMetadata struct {
	webhookMetadata
	// The event that was performed.
	// @see https://docs.github.com/en/webhooks/webhook-events-and-payloads
	Event string `json:"event"`
}

// githubWebhookPayload is the structure of the webhook payload sent by the
// webhooked project formatted following this schema for GitHub webhooks:
type githubWebhookPayload struct {
	// The action that was performed. This can be one of created, cancelled,
	// edited, tier_changed, pending_cancellation, or pending_tier_change.
	// Note: The created action is only triggered after payment is processed.
	Action string `json:"action"`

	// The user that triggered the event.
	Sender struct {
		Login string `json:"login"`
		ID    int    `json:"id"`
	} `json:"sender"`
}

// githubSponsorshipWebhookPayload is the structure of the webhook payload sent
// by the webhooked project formatted following this schema for GitHub webhooks
// with the sponsorship event:
type githubSponsorshipWebhookPayload struct {
	githubWebhookPayload

	Sponsorship githubSponsorship `json:"sponsorship"`

	// The pending_cancellation and pending_tier_change event types will
	// include the date the cancellation or tier change will take effect.
	EffectiveDate time.Time `json:"effective_date"`
	// The tier_changed and pending_tier_change will include the original
	// tier before the change or pending change. For more information,
	// see the pending tier change payload.
	Changes struct {
		Tier struct {
			From githubSponsorTier `json:"from"`
		} `json:"tier"`
		// The edited event types include the details about the change when
		// someone edits a sponsorship to change the privacy.
		PrivacyLevel string `json:"privacy_level"`
	} `json:"changes"`
}

type githubSponsorship struct {
	CreatedAt   time.Time `json:"created_at"`
	Sponsorable struct {
		Login     string `json:"login"`
		ID        int    `json:"id"`
		AvatarURL string `json:"avatar_url"`
		Type      string `json:"type"`
	} `json:"sponsorable"`
	Sponsor struct {
		Login     string `json:"login"`
		ID        int    `json:"id"`
		AvatarURL string `json:"avatar_url"`
		Type      string `json:"type"`
	} `json:"sponsor"`
	PrivacyLevel string            `json:"privacy_level"`
	Tier         githubSponsorTier `json:"tier"`
}

type githubSponsorTier struct {
	CreatedAt             time.Time `json:"created_at"`
	Description           string    `json:"description"`
	MonthlyPriceInCents   int       `json:"monthly_price_in_cents"`
	MonthlyPriceInDollars int       `json:"monthly_price_in_dollars"`
	Name                  string    `json:"name"`
	IsOneTime             bool      `json:"is_one_time"`
	IsCustomAmount        bool      `json:"is_custom_amount"`
}

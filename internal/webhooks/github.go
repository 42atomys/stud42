package webhooks

import "time"

type GithubSponsorshipWebhook struct {
	// The action that was performed. This can be one of created, cancelled,
	// edited, tier_changed, pending_cancellation, or pending_tier_change.
	// Note: The created action is only triggered after payment is processed.
	Action      string            `json:"action"`
	Sponsorship GithubSponsorship `json:"sponsorship"`
	// The user that triggered the event.
	Sender struct {
		Login string `json:"login"`
		ID    int    `json:"id"`
	} `json:"sender"`
	// The pending_cancellation and pending_tier_change event types will
	// include the date the cancellation or tier change will take effect.
	EffectiveDate time.Time `json:"effective_date"`
	// The tier_changed and pending_tier_change will include the original
	// tier before the change or pending change. For more information,
	// see the pending tier change payload.
	Changes struct {
		Tier struct {
			From GithubSponsorTier `json:"from"`
		} `json:"tier"`
		// The edited event types include the details about the change when
		// someone edits a sponsorship to change the privacy.
		PrivacyLevel string `json:"privacy_level"`
	} `json:"changes"`
}

type GithubSponsorship struct {
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
	Tier         GithubSponsorTier `json:"tier"`
}

type GithubSponsorTier struct {
	CreatedAt             time.Time `json:"created_at"`
	Description           string    `json:"description"`
	MonthlyPriceInCents   int       `json:"monthly_price_in_cents"`
	MonthlyPriceInDollars int       `json:"monthly_price_in_dollars"`
	Name                  string    `json:"name"`
	IsOneTime             bool      `json:"is_one_time"`
	IsCustomAmount        bool      `json:"is_custom_amount"`
}

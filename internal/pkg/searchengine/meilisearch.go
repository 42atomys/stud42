package searchengine

import (
	"fmt"

	"github.com/meilisearch/meilisearch-go"
	"github.com/rs/zerolog/log"
	"github.com/spf13/viper"
)

type Client struct {
	*meilisearch.Client
}

// initMeilisearchDependency initializes the MeiliSearch client and ensures that
// all the indexes exist and are configured correctly.
func initMeilisearchDependency() {
	if err := NewClient().EnsureAllIndexes(); err != nil {
		log.Fatal().Err(err).Msg("failed to ensure all indexes")
	}
}

// NewClient creates a new MeiliSearch client and returns it.
// It uses the configuration to get the host and the API key.
func NewClient() *Client {
	var host, token string
	if host = viper.GetString("searchengine.meilisearch.host"); host == "" {
		log.Fatal().Msg("searchengine.meilisearch.host not set")
	}

	if token = viper.GetString("searchengine.meilisearch.token"); token == "" {
		log.Fatal().Msg("searchengine.meilisearch.token not set")
	}

	return &Client{
		Client: meilisearch.NewClient(meilisearch.ClientConfig{
			Host:   host,
			APIKey: token,
		}),
	}
}

// EnsureAllIndexes ensures that all the MeiliSearch indexes exist and are
// configured correctly. It should be called at startup.
func (c *Client) EnsureAllIndexes() error {
	if err := c.EnsureUserIndex(); err != nil {
		return fmt.Errorf("failed to ensure user index: %w", err)
	}
	return nil
}

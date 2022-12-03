package searchengine

import (
	"fmt"

	"github.com/google/uuid"
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
	var host, apiKey string
	if host = viper.GetString("searchengine.meilisearch.host"); host == "" {
		log.Fatal().Msg("searchengine.meilisearch.host not set")
	}

	if apiKey = viper.GetString("searchengine.meilisearch.apiKey"); apiKey == "" {
		log.Fatal().Msg("searchengine.meilisearch.apiKey not set")
	}

	return &Client{
		Client: meilisearch.NewClient(meilisearch.ClientConfig{
			Host:   host,
			APIKey: apiKey,
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

// SearchUser searches for a user in the MeiliSearch index.
// It returns a slice of UUIDs of the users found.
func (c *Client) SearchUser(query string) ([]uuid.UUID, error) {
	results, err := c.Client.Index(IndexUser).Search(query,
		&meilisearch.SearchRequest{
			Limit: 10,
		})

	if err != nil {
		return nil, err
	}

	var usersIDs []uuid.UUID

	for _, res := range results.Hits {
		usersIDs = append(usersIDs, uuid.MustParse(fmt.Sprint(res.(map[string]interface{})["id"])))
	}
	return usersIDs, nil
}

package searchengine

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/meilisearch/meilisearch-go"
	"github.com/rs/zerolog/log"
)

// UserDocument is a struct that represents a user in the MeiliSearch index.
type UserDocument struct {
	ID              uuid.UUID  `json:"id"`
	CurrentCampusID *uuid.UUID `json:"current_campus_id,omitempty"`
	HasOnline       bool       `json:"has_online,omitempty"`
	DuoLogin        string     `json:"duo_login,omitempty"`
	FirstName       string     `json:"first_name,omitempty"`
	UsualFirstName  *string    `json:"usual_first_name,omitempty"`
	LastName        string     `json:"last_name,omitempty"`
}

const (
	// IndexUser is the name of the MeiliSearch index for users.
	IndexUser = "s42_users"
	// IndexUserPrimaryKey is the primary key for the MeiliSearch index
	// for users.
	IndexUserPrimaryKey = "id"
)

func (c *Client) EnsureUserIndex() error {
	// Create index if it doesn't exist
	if _, err := c.GetIndex(IndexUser); err != nil {
		if _, err := c.CreateIndex(&meilisearch.IndexConfig{
			Uid:        IndexUser,
			PrimaryKey: IndexUserPrimaryKey,
		}); err != nil {
			return err
		}
		log.Info().Msgf("created index %s on meilisearch", IndexUser)
	}

	// User index
	_, err := c.Client.Index(IndexUser).UpdateSettings(&meilisearch.Settings{
		TypoTolerance: &meilisearch.TypoTolerance{
			Enabled: true,
			MinWordSizeForTypos: meilisearch.MinWordSizeForTypos{
				OneTypo:  1,
				TwoTypos: 3,
			},
		},
		Pagination: &meilisearch.Pagination{
			MaxTotalHits: 10,
		},
		SearchableAttributes: []string{"duo_login", "first_name", "last_name", "usual_first_name"},
		// Only display the user id in the search results to avoid leaking information
		// about the user.
		DisplayedAttributes:  []string{IndexUserPrimaryKey},
		FilterableAttributes: []string{"current_location_id", "current_campus_id"},
	})
	if err != nil {
		return err
	}
	return nil
}

// SearchUser searches for a user in the MeiliSearch index.
// It returns a slice of UUIDs of the users found.
func (c *Client) SearchUser(query string, onlyOnline bool) ([]uuid.UUID, error) {
	req := &meilisearch.SearchRequest{
		Limit: 10,
	}

	if onlyOnline {
		req.Filter = "current_location_id != null"
	}

	results, err := c.Client.Index(IndexUser).Search(query, req)

	if err != nil {
		return nil, err
	}

	var usersIDs []uuid.UUID

	for _, res := range results.Hits {
		usersIDs = append(usersIDs, uuid.MustParse(fmt.Sprint(res.(map[string]interface{})["id"])))
	}
	return usersIDs, nil
}

// UpdateUserDocument updates the MeiliSearch document for the given user. It
// should be called when a user is created or updated. It will create the
// document if it doesn't exist. It will update it if it does.
func (c *Client) UpdateUserDocument(ctx context.Context, document *UserDocument) error {
	log.Debug().Interface("document", document).Msg("updating user document")

	_, err := c.Client.Index(IndexUser).UpdateDocuments(document, IndexUserPrimaryKey)
	return err
}

// DeleteUserDocument deletes the MeiliSearch document for the given user. It
// should be called when a user is deleted. It will do nothing if the document

func (c *Client) DeleteUserDocument(userID uuid.UUID) error {
	log.Debug().Str("docuemntId", userID.String()).Msgf("deleting user document")

	_, err := c.Client.Index(IndexUser).DeleteDocument(userID.String())
	return err
}

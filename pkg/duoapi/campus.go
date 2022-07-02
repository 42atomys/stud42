package duoapi

import (
	"context"

	"github.com/rs/zerolog/log"
)

// CampusAll returns the list of all campuses in the 42 ecosystem
func CampusAll(ctx context.Context) ([]*Campus, error) {
	var campus = make([]*Campus, 0)
	err := requestCollection(ctx, EndpointCampus, map[string]string{"per_page": "100"}, &campus)
	if err != nil {
		log.Error().Err(err).Msg("Failed to get response")
		return nil, err
	}
	return campus, nil
}

// CampusGet returns the campus with the given ID or nil if not found
func CampusGet(ctx context.Context, campusID string) (*Campus, error) {
	var campus = &Campus{}
	err := request(ctx, EndpointCampus+"/"+campusID, nil, &campus)
	if err != nil {
		log.Error().Err(err).Msg("Failed to get response")
		return nil, err
	}
	return campus, nil
}

package duoapi

import (
	"context"

	"github.com/rs/zerolog/log"
)

func CampusAll(ctx context.Context) ([]*Campus, error) {
	var campus = make([]*Campus, 0)
	err := requestCollection(ctx, EndpointCampus, map[string]string{"per_page": "100"}, &campus)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to get response")
		return nil, err
	}
	return campus, nil
}

package duoapi

import (
	"context"

	"github.com/rs/zerolog/log"
)

func CampusAll() ([]*Campus, error) {
	var campus = make([]*Campus, 0)
	err := request(context.Background(), EndpointCampus, map[string]string{"per_page": "100"}, &campus)
	if err != nil {
		log.Fatal().Err(err).Msg("Failed to get response")
		return nil, err
	}
	return campus, nil
}

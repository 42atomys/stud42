package duoapi

import (
	"context"
)

// LocationsActive returns the list of active locations of a campus
func LocationsActive(ctx context.Context, campusID string) ([]*Location[ComplexLocationUser], error) {
	var locations = make([]*Location[ComplexLocationUser], 0)
	err := requestCollection(ctx, EndpointLocations, map[string]string{"campus_id": campusID, "per_page": "100", "filter[active]": "true"}, &locations)
	if err != nil {
		return nil, err
	}
	return locations, nil
}

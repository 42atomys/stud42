package duoapi

var (
	// Endpoints is the list of endpoints
	EndpointBaseAPI = "https://api.intra.42.fr"
	EndpointVersion = "/v2"

	EndpointCampus    = EndpointBaseAPI + EndpointVersion + "/campus"
	EndpointLocations = EndpointBaseAPI + EndpointVersion + "/locations"
)

package duoapi

import (
	"context"
	"encoding/json"
	"net/http"
	"net/url"
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/clientcredentials"
)

// config is the clientcredentials.Config used to get the token
var config *clientcredentials.Config

func init() {
	config = &clientcredentials.Config{
		ClientID:     os.Getenv("FORTY_TWO_CLIENT_ID"),
		ClientSecret: os.Getenv("FORTY_TWO_CLIENT_SECRET"),
		TokenURL:     "https://api.intra.42.fr/oauth/token",
		AuthStyle:    oauth2.AuthStyleInHeader,
	}
}

// Client is the http client with the token set in the header
func Client(ctx context.Context) *http.Client {
	return config.Client(ctx)
}

// request is the generic request function used to get the response
// from the endpoint and unmarshal the response into the given interface
func request[T any](ctx context.Context, endpoint string, query map[string]string, result *T) error {
	url, err := url.Parse(endpoint)
	if err != nil {
		return err
	}

	if query != nil {
		q := url.Query()
		for k, v := range query {
			q.Set(k, v)
		}
	}

	resp, err := Client(ctx).Get(url.String())
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		return err
	}
	return nil
}

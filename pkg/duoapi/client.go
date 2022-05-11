package duoapi

import (
	"context"
	"encoding/json"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/rs/zerolog/log"
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
func request[T any](ctx context.Context, endpoint string, query map[string]string, data *T) error {
	url, err := url.Parse(endpoint)
	if err != nil {
		return err
	}

	if query != nil {
		q := url.Query()
		for k, v := range query {
			q.Set(k, v)
		}
		url.RawQuery = q.Encode()
	}

	resp, err := Client(ctx).Get(url.String())
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	
	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		return err
	}
	return nil
}

// requestCollection is the generic request function used to get the response
// from the endpoint and unmarshal the response into the given interface
// When a Link header is present, it will fetch all pages until there are no more
// pages. 
// BE CARREFUL WHEN USING THIS FUNCTION, IT WILL BE LOOPED FOR A LONG TIME IF
// THERE ARE MANY PAGES. PREFER USE THE request FUNCTION
func requestCollection[T any](ctx context.Context, endpoint string, query map[string]string, data *[]T) error {
	url, err := url.Parse(endpoint)
	if err != nil {
		return err
	}

	if query != nil {
		q := url.Query()
		for k, v := range query {
			q.Set(k, v)
		}
		url.RawQuery = q.Encode()
	}

	log.Debug().Msgf("Requesting %s", url.String())
	resp, err := Client(ctx).Get(url.String())
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	
	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		return err
	}

	if headerLinkValue := resp.Header.Get("Link"); headerLinkValue != "" {
		links := linksInHeaders(headerLinkValue)

		if nextLink, ok := links["next"]; ok {
			var collection []T
			if err := requestCollection(ctx, nextLink, nil, &collection); err != nil {
				return err
			}
			*data = append(*data, collection...)
		}
	}

	return nil
}

// linksInHeaders extract links present in the header. It returns a map
// with the key being the rel and the value being the link itself
// 
// @see https://datatracker.ietf.org/doc/html/rfc8288#section-3
func linksInHeaders(headerLinkValue string) HeaderLink {
	linksStr := strings.Split(headerLinkValue, ",")

	var links = make(HeaderLink)
	for _, l := range linksStr {
		link := strings.Trim(strings.Split(l, ";")[0], " <>")

		params := make(map[string]string)
		for _, p := range strings.Split(l, ";")[1:] {
			params[strings.Trim(strings.Split(p, "=")[0], " \"")] = strings.Trim(strings.Split(p, "=")[1], " \"")
		}

		links[params["rel"]] = link
	}
	return links
}
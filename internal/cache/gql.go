package cache

import (
	"context"
	"time"

	"github.com/eko/gocache/v3/store"
	"github.com/getsentry/sentry-go"
	"github.com/rs/zerolog/log"
)

type GQLCache struct {
	*TypedClient[any]
	ttl time.Duration
}

// NewGQLCache creates a new cache client for the graphql layer with the given
// ttl for the cache.
func (c *Client) NewGQLCache(ttl time.Duration) (*GQLCache, error) {
	return &GQLCache{TypedClient: NewTyped[any](c), ttl: ttl}, nil
}

// Add adds a new value to the cache with the given key.
// This is based on the [GQLGen Doc]
//
// [GQLGen Doc]: https://github.com/99designs/gqlgen/blob/master/graphql/cache.go
func (c *GQLCache) Add(ctx context.Context, key string, value interface{}) {
	err := c.Set(ctx, gqlCacheKey.WithObject(key).Build(), value, store.WithExpiration(c.ttl), store.WithTags([]string{"gql"}))
	if err != nil {
		log.Error().Err(err).Msg("failed to add to cache")
		sentry.CaptureException(err)
	}
}

// Get gets a value from the cache with the given key.
// This is based on the [GQLGen Doc]
//
// [GQLGen Doc]: https://github.com/99designs/gqlgen/blob/master/graphql/cache.go
func (c *GQLCache) Get(ctx context.Context, key string) (interface{}, bool) {
	s, err := c.TypedClient.Get(ctx, gqlCacheKey.WithObject(key).Build())
	if err != nil {
		return struct{}{}, false
	}

	return s, true
}

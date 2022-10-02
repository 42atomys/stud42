package cache

import (
	"context"
	"time"

	"github.com/dgraph-io/ristretto"
	"github.com/eko/gocache/v3/cache"
	"github.com/eko/gocache/v3/store"
	"github.com/go-redis/redis/v8"
	"github.com/rs/zerolog/log"
)

type Client struct {
	ristrettoClient *store.RistrettoStore
	redisStore      *store.RedisStore
}

type TypedClient[T any] struct {
	Client
	*cache.ChainCache[T]
}

// New create a new cache client with initialized stores and cache. It will
// return an error if the cache cannot be initialized.
//
// The cache will be initialized with the following stores:
// - Ristretto: In memory cache optimized for high performance and low memory usage.
// - Redis: Redis cache for distributed cache.
func New(redisUrl string) (*Client, error) {
	// Ristretto cache is a in memory cache that is optimized for high performance
	// and low memory usage. It is a drop in replacement for the standard library
	// cache.
	ristrettoCache, err := ristretto.NewCache(&ristretto.Config{
		NumCounters: int64(1e7), // number of keys to track frequency of (10M).
		MaxCost:     int64(1e8), // maximum cost of cache (100MB).
		BufferItems: 64,         // number of keys per Get buffer.
	})
	if err != nil {
		return nil, err
	}
	ristrettoStore := store.NewRistretto(ristrettoCache)

	// Redis is a high performance key value store that is used for caching
	// this is used as fallback to ristretto cache when we are in a high
	// traffic situation (scale on multiple instances).
	opts, err := redis.ParseURL(redisUrl)
	if err != nil {
		return nil, err
	}

	opts.DialTimeout = 10 * time.Second
	opts.ReadTimeout = 30 * time.Second
	opts.WriteTimeout = 30 * time.Second
	opts.PoolSize = 10
	opts.PoolTimeout = 30 * time.Second

	redisStore := store.NewRedis(redis.NewClient(opts))

	return &Client{
		ristrettoClient: ristrettoStore,
		redisStore:      redisStore,
	}, nil
}

// NewTyped creates a new typed cache client with initialized stores and cache.
// The type is used to ensure that the cache is only used for the correct type
// and automatically casted to the correct type.
func NewTyped[T any](c *Client) *TypedClient[T] {
	return &TypedClient[T]{
		Client: *c,
		ChainCache: cache.NewChain[T](
			cache.New[T](c.ristrettoClient),
			cache.New[T](c.redisStore),
		),
	}
}

// WithLoader is a wrapper around the cache that allows us to load data from the
// `lf` function if it is not in the cache. This is useful for loading data
// from a database or other source.
func (tc *TypedClient[T]) WithLoader(ctx context.Context, lf LoadFunction[T]) *LoadableCache[T] {
	return NewLoadable(lf, tc)
}

// Get returns the value stored in the cache for the given key. If the key is
// not found in the cache, and this function is chained with `Loader` before
// the value is loaded from the `lf` function and stored in the cache. If the
// key is not found in the cache and there is no `Loader` function, then the
// value is nil and the bool is false.
func (tc *TypedClient[T]) Get(ctx context.Context, key CacheKey) (T, error) {
	log.Debug().Str("key", key.String()).Msg("get value from cache")
	return tc.ChainCache.Get(ctx, key.String())
}

// Set stores the value in the cache for the given key. The value is stored
// with the given options.
func (tc *TypedClient[T]) Set(ctx context.Context, key CacheKey, object T, options ...store.Option) error {
	log.Debug().Str("key", key.String()).Msg("set value in cache")
	return tc.ChainCache.Set(ctx, key.String(), object, options...)
}

// Delete removes the value from the cache for the given key.
func (tc *TypedClient[T]) Delete(ctx context.Context, key CacheKey) error {
	log.Debug().Str("key", key.String()).Msg("delete value from cache")
	return tc.ChainCache.Delete(ctx, key.String())
}

// Invalidate removes all the values from the cache for the given tags.
// If no tags are given, all the values are removed from the cache.
func (tc *TypedClient[T]) Invalidate(ctx context.Context, options ...store.InvalidateOption) error {
	log.Debug().Msg("invalidate cache")
	return tc.ChainCache.Invalidate(ctx, options...)
}

// Clear removes all the values from the cache.
func (tc *TypedClient[T]) Clear(ctx context.Context) error {
	log.Debug().Msg("clear cache")
	return tc.ChainCache.Clear(ctx)
}

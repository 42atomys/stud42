package cache

import (
	"context"
	"encoding"
	"errors"
	"reflect"
	"sync"
	"time"

	"log"

	"github.com/redis/go-redis/v9"
)

type Client struct {
	redisStore *redis.Client
}

type LoadFunction[T any] func(ctx context.Context, key CacheKey) (T, error)

type loadableKeyValue[T any] struct {
	key     CacheKey
	value   T
	options []option
}

type TypedClient[T any] struct {
	*Client
	setterWg   *sync.WaitGroup
	setChannel chan *loadableKeyValue[T]
	loader     LoadFunction[T]
}

// New create a new cache client with initialized stores and cache. It will
// return an error if the cache cannot be initialized.
//
// The cache will be initialized with the following stores:
// - Redis: Redis cache for distributed cache.
func NewClient(redisUrl string) (*Client, error) {
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

	redisClient := redis.NewClient(opts)
	if _, err := redisClient.Ping(context.Background()).Result(); err != nil {
		return nil, err
	}

	return &Client{
		redisStore: redisClient,
	}, nil
}

type BinaryMarshable interface {
	encoding.BinaryMarshaler
	encoding.BinaryUnmarshaler
}

var ErrNotFound = errors.New("item not found in cache")

// New creates a new typed cache client with initialized stores and cache.
// The type is used to ensure that the cache is only used for the correct type
// and automatically casted to the correct type.
func New[T any](client *Client) *TypedClient[T] {

	typedClient := &TypedClient[T]{
		Client: client,
		loader: func(ctx context.Context, key CacheKey) (obj T, err error) {
			return obj, ErrNotFound
		},
		setterWg:   &sync.WaitGroup{},
		setChannel: make(chan *loadableKeyValue[T]),
	}

	typedClient.setterWg.Add(1)
	go typedClient.setter()

	return typedClient
}

func (tc *TypedClient[T]) setter() {
	defer tc.setterWg.Done()

	for item, ok := <-tc.setChannel; ok; item, ok = <-tc.setChannel {
		if err := tc.Set(context.Background(), item.key, item.value, item.options...); err != nil {
			log.Printf("failed to set value in cache: %s", err.Error())
		}
	}
}

// Close the LoadableCache update channel to prevent any goroutine leak
// and wait for the setter goroutine to finish
func (c *TypedClient[T]) Close() error {
	close(c.setChannel)

	return nil
}

// WithLoader is a wrapper around the cache that allows us to load data from the
// `lf` function if it is not in the cache. This is useful for loading data
// from a database or other source.
func (tc *TypedClient[T]) WithLoader(lf LoadFunction[T]) *TypedClient[T] {
	tc.loader = lf
	return tc
}

// Get returns the value stored in the cache for the given key. If the key is
// not found in the cache, and this function is chained with `Loader` before
// the value is loaded from the `lf` function and stored in the cache. If the
// key is not found in the cache and there is no `Loader` function, then the
// value is nil and the bool is false.
func (tc *TypedClient[T]) Get(ctx context.Context, key CacheKey, setOptions ...option) (object T, err error) {
	if reflect.ValueOf(object).Kind() != reflect.Ptr {
		return object, errors.New("object must be a pointer")
	}

	// initialize the object to the zero value of the type
	object = reflect.New(reflect.TypeOf(object).Elem()).Interface().(T)

	err = tc.redisStore.Get(ctx, key.String()).Scan(object)
	if err == nil {
		return object, nil
	}

	if !errors.Is(err, redis.Nil) {
		return object, err
	}

	object, err = tc.loader(ctx, key)
	if err == nil {
		tc.setChannel <- &loadableKeyValue[T]{
			key:     key,
			value:   object,
			options: setOptions,
		}
	}

	return object, err
}

type SetOption struct {
	Expiration time.Duration
}

type option func(*SetOption)

func WithExpiration(expiration time.Duration) option {
	return func(o *SetOption) {
		o.Expiration = expiration
	}
}

func ApplyOptions(opts ...option) SetOption {
	o := SetOption{
		Expiration: 0,
	}
	for _, opt := range opts {
		opt(&o)
	}
	return o
}

// Set stores the value in the cache for the given key. The value is stored
// with the given options.
func (tc *TypedClient[T]) Set(ctx context.Context, key CacheKey, object T, options ...option) error {
	o := ApplyOptions(options...)
	return tc.redisStore.Set(ctx, key.String(), object, o.Expiration).Err()
}

// Delete removes the value from the cache for the given key.
func (tc *TypedClient[T]) Delete(ctx context.Context, key CacheKey) error {
	return tc.redisStore.Del(ctx, key.String()).Err()
}

// // Invalidate removes all the values from the cache for the given tags.
// // If no tags are given, all the values are removed from the cache.
// func (tc *TypedClient[T]) Invalidate(ctx context.Context, options ...store.InvalidateOption) error {
// }

// Clear removes all the values from the cache.
func (tc *TypedClient[T]) Clear(ctx context.Context) error {
	return tc.redisStore.FlushAll(ctx).Err()
}

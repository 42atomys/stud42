// Credits to @eko (https://github.com/eko) for the gocache library.
// This LoadableCache is a wrapper around the gocache library that adds
// the ability to load values from a loader function if the value is not
// in the cache with a custom set options on the cache.
//
// Add also a logger for the set channel
package cache

import (
	"context"
	"sync"

	"github.com/eko/gocache/v3/store"
	"github.com/rs/zerolog/log"
)

type loadableKeyValue[T any] struct {
	key     CacheKey
	value   T
	options []store.Option
}

type LoadFunction[T any] func(ctx context.Context, key CacheKey) (T, error)

type LoadableCache[T any] struct {
	*TypedClient[T]
	loadFunc   LoadFunction[T]
	setChannel chan *loadableKeyValue[T]
	setterWg   *sync.WaitGroup
}

// NewLoadable instanciates a new cache that uses a function to load data
func NewLoadable[T any](loadFunc LoadFunction[T], cache *TypedClient[T]) *LoadableCache[T] {
	loadable := &LoadableCache[T]{
		TypedClient: cache,
		loadFunc:    loadFunc,
		setChannel:  make(chan *loadableKeyValue[T], 10000),
		setterWg:    &sync.WaitGroup{},
	}

	loadable.setterWg.Add(1)
	go loadable.setter()

	return loadable
}

func (c *LoadableCache[T]) setter() {
	defer c.setterWg.Done()

	for item := range c.setChannel {
		err := c.TypedClient.Set(context.Background(), item.key, item.value, item.options...)
		if err != nil {
			log.Error().Err(err).Msg("failed to set value in cache")
		}
	}
}

// Get returns the object stored in cache if it exists
func (c *LoadableCache[T]) Get(ctx context.Context, key CacheKey, setOptions ...store.Option) (T, error) {
	var err error

	object, err := c.TypedClient.Get(ctx, key)
	if err == nil {
		return object, err
	}

	// Unable to find in cache, try to load it from load function
	object, err = c.loadFunc(ctx, key)
	if err != nil {
		return object, err
	}

	// Then, put it back in cache
	c.setChannel <- &loadableKeyValue[T]{key, object, setOptions}

	return object, err
}

// Set sets a value in available caches
func (c *LoadableCache[T]) Set(ctx context.Context, key CacheKey, object T, options ...store.Option) error {
	return c.TypedClient.Set(ctx, key, object, options...)
}

// Delete removes a value from cache
func (c *LoadableCache[T]) Delete(ctx context.Context, key CacheKey) error {
	return c.TypedClient.Delete(ctx, key)
}

// Invalidate invalidates cache item from given options
func (c *LoadableCache[T]) Invalidate(ctx context.Context, options ...store.InvalidateOption) error {
	return c.TypedClient.Invalidate(ctx, options...)
}

// Clear resets all cache data
func (c *LoadableCache[T]) Clear(ctx context.Context) error {
	return c.TypedClient.Clear(ctx)
}

func (c *LoadableCache[T]) Close() error {
	close(c.setChannel)

	return nil
}

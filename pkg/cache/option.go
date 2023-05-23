package cache

import "time"

type option func(*SetOption)

type SetOption struct {
	Expiration time.Duration
}

// WithExpiration sets the expiration time for the cache key.
// If the expiration is set to 0, the key will never expire.
func WithExpiration(expiration time.Duration) option {
	return func(o *SetOption) {
		o.Expiration = expiration
	}
}

// ApplyOptions applies the given options to the SetOption struct.
// If no options are given, the default options are used.
func ApplyOptions(opts ...option) SetOption {
	o := SetOption{
		Expiration: 0,
	}
	for _, opt := range opts {
		opt(&o)
	}
	return o
}

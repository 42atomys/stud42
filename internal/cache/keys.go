package cache

import (
	"strings"
)

type CacheKey string

const (
	keySeparator = ":"
)

var (
	CurrentUserCacheKey = NewKeyBuilder().WithPrefix("s42-current-user")
	gqlCachekBuilder    = NewKeyBuilder().WithPrefix("s42-gql-cache")
)

func (k CacheKey) String() string {
	return string(k)
}

type KeyBuilder struct {
	key    CacheKey
	parts  []string
	prefix string
	suffix string
}

func (b *KeyBuilder) String() string {
	var key string
	if b.prefix != "" {
		key += b.prefix
	}

	if b.key != "" {
		key += keySeparator + string(b.key)
	}

	if len(b.parts) > 0 {
		key += keySeparator + strings.Join(b.parts, keySeparator)
	}

	if b.suffix != "" {
		key += keySeparator + b.suffix
	}

	return key
}

func (b *KeyBuilder) WithPrefix(prefix string) *KeyBuilder {
	b.prefix = prefix
	return b
}

func (b *KeyBuilder) WithSuffix(suffix string) *KeyBuilder {
	b.suffix = suffix
	return b
}

func (b *KeyBuilder) WithKey(key CacheKey) *KeyBuilder {
	b.key = key
	return b
}

func (b *KeyBuilder) WithParts(parts ...string) *KeyBuilder {
	b.parts = parts
	return b
}

func NewKeyBuilder() *KeyBuilder {
	return &KeyBuilder{}
}

func (b *KeyBuilder) Build() CacheKey {
	return CacheKey(b.String())
}

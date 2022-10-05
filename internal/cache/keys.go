package cache

import (
	"regexp"
	"strings"
)

type CacheKey string

const (
	defaultKeySeparator = ":"
)

var (
	// CurrentUserCacheKey is the key used to store the current user in cache,
	// Usage:
	// 	CurrentUserCacheKey.WithParts("user_id").Build()
	CurrentUserCacheKey = NewKeyBuilder().WithPrefix("s42-current-user")
	gqlCachekBuilder    = NewKeyBuilder().WithPrefix("s42-gql-cache")
)

func (k CacheKey) String() string {
	return string(k)
}

type KeyBuilder struct {
	key       CacheKey
	parts     []string
	prefix    string
	suffix    string
	separator string
}

var (
	matchFirstCap = regexp.MustCompile("(.)([A-Z][a-z]+)")
	matchAllCap   = regexp.MustCompile("([a-z0-9])([A-Z])")
	keyReplacer   = strings.NewReplacer(".", " ", "_", " ", "-", " ")
)

func (b *KeyBuilder) String() string {
	var keyParts = []string{}

	if b.prefix != "" {
		keyParts = append(keyParts, kebabCase(b.prefix))
	}

	if b.key != "" {
		keyParts = append(keyParts, kebabCase(string(b.key)))
	}

	if len(b.parts) > 0 {
		for _, part := range b.parts {
			keyParts = append(keyParts, kebabCase(part))
		}
	}

	if b.suffix != "" {
		keyParts = append(keyParts, kebabCase(b.suffix))
	}

	return strings.Join(keyParts, b.separator)
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

func (b *KeyBuilder) WithSeparator(separator string) *KeyBuilder {
	b.separator = separator
	return b
}

func NewKeyBuilder() *KeyBuilder {
	return &KeyBuilder{separator: defaultKeySeparator}
}

func (b *KeyBuilder) Build() CacheKey {
	return CacheKey(b.String())
}

func kebabCase(s string) string {
	// convert camel case to snake case
	s = matchAllCap.ReplaceAllString(
		matchFirstCap.ReplaceAllString(s, "${1} ${2}"),
		"${1} ${2}",
	)

	// convert to lower case and replace separators with spaces
	s = keyReplacer.Replace(s)
	s = strings.Join(strings.Fields(s), "-")

	return strings.ToLower(s)
}

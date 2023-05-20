package cache

/**
 * The cache package is used to manage the multiple cache system for s42 app.
 *
 * The key builder is used to generate the key of the cache with a simplify
 * way to manage it. A key must be have a scope (prefix), multiple parts (parts)
 * and a suffix. The key builder is used to generate the key with a separator
 * between each part of the key. The default separator is a colon and can be
 * changed with `WithSeparator` function.
 *
 * Examples of build :
 *	- WithPrefix("user").WithObject("1").WithSuffix("profile").Build() => user:1:profile
 *	- WithPrefix("user").WithObject("1").WithParts("profile", "avatar").Build() => user:1:profile:avatar
 *	- WithPrefix("user").WithObject("1").WithParts("profile", "avatar").WithSuffix("outdated").Build() => user:1:profile:avatar:outdated
 *
 * The most important rule when you use the key builder is to use the same
 * separator in all your application. If you change the separator, you must
 * change it everywhere in your application.
 *
 * When you use the key builder, you must use the `WithPrefix` function to
 * set the scope of the key. The prefix is used to know where the key is used.
 * For example, if you use the key builder to generate a key for the current user
 * profile, you must use the prefix `s42-current-user` (KeyBuilder is stored in
 * the `CurrentUserCacheKey` variable below).
 *
 * THE PREFIX, SUFFIX, PARTS AND KEY MUST BE ALWAYS IN KEBAB CASE (kebab-case)
 */

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/rs/zerolog/log"
)

type CacheKey string

const (
	// defaultKeySeparator is the key separator used on all application.
	// WARNING: If you change the separator, you must change it everywhere in
	// your application.
	defaultKeySeparator = ":"
)

// String will return the cache key as string to matche the Stringer interface
func (k CacheKey) String() string {
	return string(k)
}

// KeyBuilder is used to build a cache key with a prefix, a suffix, multiple
// parts and a key.
type KeyBuilder struct {
	key       string
	parts     []string
	prefix    string
	suffix    string
	separator string
}

var (
	// The followings vars is used to transform any style to kebak-style
	// to ensure the kebak style
	matchFirstCap = regexp.MustCompile("(.)([A-Z][a-z]+)")
	matchAllCap   = regexp.MustCompile("([a-z0-9])([A-Z])")
	keyReplacer   = strings.NewReplacer(".", " ", "_", " ", "-", " ")
)

// String will generate and return the builded key as String (we use String to
// follow the Stringer interface of Golang).
//
// String method will ensure the kebab style of the key. In case of the key is
// not in kebab style, the key will be converted to kebab style and print an
// Warning to the log
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

// WithPrefix will set the prefix of the key. The prefix must be in
// kebab-case. When your prefix is used in multiple place (like s42-current-user)
// add the pre-builded key on the var group on top of this file to prevent code
// duplication
func (b *KeyBuilder) WithPrefix(prefix string) *KeyBuilder {
	b.prefix = prefix
	return b
}

// WithSuffix will set the suffix of the key. The suffix must be in
// kebab-case. When your suffix is used in multiple place add the pre-builded
// key on the var group on top of this file to prevent code duplication
func (b *KeyBuilder) WithSuffix(suffix string) *KeyBuilder {
	b.suffix = suffix
	return b
}

// WithObject will set the object of the key. This is used principally to define
// the object relative to the cacke key. The Object must be a string or a
// Stringer (implement the `String() string` method).
// Example, when you build the cache key for current user :
//
//	CurrentUserCacheKey.WithObject("00000000-0000-0000-0000-000000000000").Build()
//	 // "s42-current-user:00000000-0000-0000-0000-000000000000"
func (b *KeyBuilder) WithObject(key any) *KeyBuilder {
	switch s := key.(type) {
	case fmt.Stringer:
		b.key = s.String()
	case string:
		b.key = s
	default:
		log.Warn().Msgf("The key %v is not a stringer or a string", key)
	}
	return b
}

// WithParts will set extra parts on your key to store extra informations about
// your object.
// Example, store avatar object of the current user in small size :
//
//	CurrentUserCacheKey
//		.WithObject("00000000-0000-0000-0000-000000000000")
//		.WithParts("avatar", "small")
//		.Build() // "s42-current-user:00000000-0000-0000-0000-000000000000:avatar:small"
func (b *KeyBuilder) WithParts(parts ...string) *KeyBuilder {
	b.parts = parts
	return b
}

// WithSeparator will set the separator used to build the key. The default
// separator is a colon. If you change the separator, you must change it
// everywhere in your application. Be carreful when you change the separator
func (b *KeyBuilder) WithSeparator(separator string) *KeyBuilder {
	b.separator = separator
	return b
}

// NewKeyBuilder will return a new KeyBuilder with the default separator
// (colon). Always start your KeyBuilder journey here.
func NewKeyBuilder() *KeyBuilder {
	return &KeyBuilder{separator: defaultKeySeparator}
}

// Build will transform the key builder to a CacheKey type to matche the
// Stringer interface of Golang and to be used in the cache package of the
// application
func (b *KeyBuilder) Build() CacheKey {
	return CacheKey(b.String())
}

// kebakCase will transform any style to kebak-style to ensure the kebak style
// as the convention of the cache. In case of the key is not in kebab style, the
// key will be converted to kebab style and print an Warning to the log.
func kebabCase(s string) string {
	// convert camel case to snake case
	s = matchAllCap.ReplaceAllString(
		matchFirstCap.ReplaceAllString(s, "${1} ${2}"),
		"${1} ${2}",
	)

	if strings.Contains(s, " ") {
		log.Warn().Msgf("Your cache key is not in kebak-case. Please convert it to avoid any issue. The key is %s", s)
	}

	// convert to lower case and replace separators with spaces
	s = keyReplacer.Replace(s)
	s = strings.Join(strings.Fields(s), "-")

	return strings.ToLower(s)
}
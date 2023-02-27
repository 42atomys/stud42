package utils

import "regexp"

// SlugifyRegex is a regular expression that matches a slugified string.
// It is used to validate a slugified string. It is exported so that it can be
// used in other packages.
var SlugifyRegex = regexp.MustCompile(`^(?:[a-z]+-?|[0-9]-?)+(<!-)?$`)

// Slugify returns a slugified version of the given string.
// The slug is a URL-friendly version of the string.
// It is all lowercase and contains only letters, numbers, and hyphens.
// It also removes any leading or trailing hyphens.
// For example, "Hello, world!" becomes "hello-world".
func Slugify(s string) string {
	var (
		b    []byte
		prev byte
	)
	for _, c := range []byte(s) {
		if c >= 'A' && c <= 'Z' {
			c += 'a' - 'A'
		}
		if (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') {
			b = append(b, c)
			prev = c
			continue
		}
		if prev != '-' {
			b = append(b, '-')
			prev = '-'
		}
	}
	if len(b) > 0 && b[len(b)-1] == '-' {
		b = b[:len(b)-1]
	}
	return string(b)
}

package utils

import (
	"bytes"
	"io"
	"strings"
)

// StringLimiter will limit a string to a specific limit and drop rest of the
// string
//
// Example:
//   StringLimiter("hello world", 15) => "hello world"
//   StringLimiter("hello world", 3) => "hell"
func StringLimiter(str string, limit int) string {
	reader := strings.NewReader(str)
	var buff = make([]byte, limit)

	_, _ = io.ReadAtLeast(reader, buff, limit)

	return string(bytes.Trim(buff, "\x00"))
}

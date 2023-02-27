package utils

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSlugify(t *testing.T) {
	assert := assert.New(t)

	var tests = []struct {
		input    string
		expected string
	}{
		{"Hello, world!", "hello-world"},
		{"String With Spaces", "string-with-spaces"},
		{"String With Spaces and Numbers 123", "string-with-spaces-and-numbers-123"},
		{"String With Spaces and Numbers 123 and Symbols !@#$%^&*()", "string-with-spaces-and-numbers-123-and-symbols"},
		{"String With Spaces and Numbers 123 and Symbols !@#$%^&*() and Dashes -", "string-with-spaces-and-numbers-123-and-symbols-and-dashes"},
		{"String With Spaces and Numbers 123 and Symbols !@#$%^&*() and Dashes - and Underscores _", "string-with-spaces-and-numbers-123-and-symbols-and-dashes-and-underscores"},
		{"String With Spaces and Numbers 123 and Symbols !@#$%^&*() and Dashes - and Underscores _ and Uppercase Letters", "string-with-spaces-and-numbers-123-and-symbols-and-dashes-and-underscores-and-uppercase-letters"},
		{"String With Spaces and Numbers 123 and Symbols !@#$%^&*() and Dashes - and Underscores _ and Uppercase Letters and Lowercase Letters", "string-with-spaces-and-numbers-123-and-symbols-and-dashes-and-underscores-and-uppercase-letters-and-lowercase-letters"},
		{"String With Spaces and Numbers 123 and Symbols !@#$%^&*() and Dashes - and Underscores _ and Uppercase Letters and Lowercase Letters and Dots .", "string-with-spaces-and-numbers-123-and-symbols-and-dashes-and-underscores-and-uppercase-letters-and-lowercase-letters-and-dots"},
		{"String With Spaces and Numbers 123 and Symbols !@#$%^&*() and Dashes - and Underscores _ and Uppercase Letters and Lowercase Letters and Dots . and Commas ,", "string-with-spaces-and-numbers-123-and-symbols-and-dashes-and-underscores-and-uppercase-letters-and-lowercase-letters-and-dots-and-commas"},
		{"String With Spaces and Numbers 123 and Symbols !@#$%^&*() and Dashes - and Underscores _ and Uppercase Letters and Lowercase Letters and Dots . and Commas , and Semicolons ;", "string-with-spaces-and-numbers-123-and-symbols-and-dashes-and-underscores-and-uppercase-letters-and-lowercase-letters-and-dots-and-commas-and-semicolons"},
		{"String With Spaces and Numbers 123 and Symbols !@#$%^&*() and Dashes - and Underscores _ and Uppercase Letters and Lowercase Letters and Dots . and Commas , and Semicolons ; and Colons :", "string-with-spaces-and-numbers-123-and-symbols-and-dashes-and-underscores-and-uppercase-letters-and-lowercase-letters-and-dots-and-commas-and-semicolons-and-colons"},
		{"String With Spaces and Numbers 123 and Symbols !@#$%^&*() and Dashes - and Underscores _ and Uppercase Letters and Lowercase Letters and Dots . and Commas , and Semicolons ; and Colons : and Question Marks ?", "string-with-spaces-and-numbers-123-and-symbols-and-dashes-and-underscores-and-uppercase-letters-and-lowercase-letters-and-dots-and-commas-and-semicolons-and-colons-and-question-marks"},
		{"String With Spaces and Numbers 123 and Symbols !@#$%^&*() and Dashes - and Underscores _ and Uppercase Letters and Lowercase Letters and Dots . and Commas , and Semicolons ; and Colons : and Question Marks ? and Exclamation Points !", "string-with-spaces-and-numbers-123-and-symbols-and-dashes-and-underscores-and-uppercase-letters-and-lowercase-letters-and-dots-and-commas-and-semicolons-and-colons-and-question-marks-and-exclamation-points"},
	}

	for _, test := range tests {
		result := Slugify(test.input)

		assert.Equal(test.expected, result)
		assert.Regexp(SlugifyRegex, result)
	}
}

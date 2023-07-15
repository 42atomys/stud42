package utils

import (
	"regexp"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetRandomHexColor(t *testing.T) {
	assert := assert.New(t)

	// Test that the result starts with "#" character
	randomHexColor := GetRandomHexColor()
	assert.True(string(randomHexColor[0]) == "#")

	// Test that the result has a length of 7 characters
	assert.Equal(7, len(randomHexColor))

	// Test that the result is a valid hexadecimal value
	assert.Regexp(regexp.MustCompile("^#[0-9a-fA-F]{6}$"), randomHexColor)

	// Test that the function does not panic when called
	assert.NotPanics(func() { GetRandomHexColor() })

	// Test that the function uses the crypto/rand library to generate random bytes
	assert.NotEqual(GetRandomHexColor(), GetRandomHexColor())
}

func TestGetRandomRBGColor(t *testing.T) {
	assert := assert.New(t)

	// Test that the function does not panic when called
	assert.NotPanics(func() { GetRandomRBGColor() })

	// Test that the function returns a valid RGBColor struct
	randomRGBColor := GetRandomRBGColor()
	assert.True(randomRGBColor.Red >= 0 && randomRGBColor.Red <= 255)
	assert.True(randomRGBColor.Green >= 0 && randomRGBColor.Green <= 255)
	assert.True(randomRGBColor.Blue >= 0 && randomRGBColor.Blue <= 255)

	// Test that the function uses the crypto/rand library to generate random bytes
	assert.NotEqual(GetRandomRBGColor(), GetRandomRBGColor())
}

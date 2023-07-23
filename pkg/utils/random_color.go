package utils

import (
	"fmt"
	"math/rand"
	"time"
)

// RGBColor Type
type RGBColor struct {
	Red   int
	Green int
	Blue  int
}

// GetRandomRBGColor returns a random RGBColor struct pointer
// with random values for Red, Green and Blue
func GetRandomRBGColor() *RGBColor {
	return &RGBColor{randOnUnix().Intn(255), randOnUnix().Intn(255), randOnUnix().Intn(255)}
}

// GetRandomHexColor returns a random hex color string
// with random values for Red, Green and Blue in hex format
func GetRandomHexColor() string {
	bytes := make([]byte, 3)

	_, err := randOnUnix().Read(bytes)
	if err != nil {
		panic(err)
	}
	return fmt.Sprintf("#%x", bytes)
}

// randOnUnix returns a new Rand that uses a UnixNano as a seed
func randOnUnix() *rand.Rand {
	return rand.New(rand.NewSource(time.Now().UnixNano()))
}

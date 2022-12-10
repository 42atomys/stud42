package utils

import (
	"testing"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
)

func TestRemove(t *testing.T) {
	tests := []struct {
		name          string
		sliceBase     []string
		itemsToRemove []string
		want          []string
	}{
		{"remove one item", []string{"a", "b", "c"}, []string{"b"}, []string{"a", "c"}},
		{"remove multiple items", []string{"a", "b", "c"}, []string{"b", "c"}, []string{"a"}},
		{"remove all items", []string{"a", "b", "c"}, []string{"a", "b", "c"}, []string{}},
		{"remove nothing", []string{"a", "b", "c"}, []string{"d", "e", "f"}, []string{"a", "b", "c"}},
	}
	for _, tt := range tests {
		assert.Equal(t, tt.want, Remove(tt.sliceBase, tt.itemsToRemove...), tt.name)
	}
}

func TestContains(t *testing.T) {
	tests := []struct {
		name      string
		sliceBase []string
		item      string
		want      bool
	}{
		{"contains one item", []string{"a", "b", "c"}, "b", true},
		{"contains multiple items", []string{"a", "b", "c"}, "b", true},
		{"contains all items", []string{"a", "b", "c"}, "a", true},
		{"contains nothing", []string{"a", "b", "c"}, "d", false},
	}
	for _, tt := range tests {
		assert.Equal(t, tt.want, Contains(tt.sliceBase, tt.item), tt.name)
	}
}

func TestUniq(t *testing.T) {
	tests := []struct {
		name      string
		sliceBase []string
		want      []string
	}{
		{"uniq one item", []string{"a", "b", "c"}, []string{"a", "b", "c"}},
		{"uniq multiple items", []string{"a", "b", "c", "a", "b", "c"}, []string{"a", "b", "c"}},
		{"uniq all items", []string{"a", "b", "c", "a", "b", "c"}, []string{"a", "b", "c"}},
		{"uniq nothing", []string{"a", "b", "c", "d", "e", "f"}, []string{"a", "b", "c", "d", "e", "f"}},
	}
	for _, tt := range tests {
		assert.Equal(t, tt.want, Uniq(tt.sliceBase), tt.name)
	}
}

func TestStringifySlice(t *testing.T) {
	uuidTest := uuid.New()

	assert.Equal(t, []string{uuidTest.String()}, StringifySlice([]uuid.UUID{uuidTest}))
}

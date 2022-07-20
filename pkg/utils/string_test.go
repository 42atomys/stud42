package utils

import "testing"

func TestStringLimiter(t *testing.T) {
	tests := []struct {
		name  string
		str   string
		limit int
		want  string
	}{
		{"limit to same count", "hello world", 11, "hello world"},
		{"limit to less count", "hello world", 4, "hell"},
		{"limit to more count", "hello world", 15, "hello world"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := StringLimiter(tt.str, tt.limit); got != tt.want {
				t.Errorf("StringLimiter() = %v, want %v", got, tt.want)
			}
		})
	}
}

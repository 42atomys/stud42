package modelsutils

import (
	"bytes"
	"reflect"
	"testing"

	"github.com/google/uuid"
)

func TestUnmarshalUUID(t *testing.T) {

	tests := []struct {
		name    string
		input   interface{}
		want    uuid.UUID
		wantErr bool
	}{
		{"valid uuid", "a0a0a0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a", uuid.MustParse("a0a0a0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a"), false},
		{"invalid uuid", "invalid", uuid.UUID{}, true},
		{"invalid type passed", 123, uuid.UUID{}, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := UnmarshalUUID(tt.input)
			if (err != nil) != tt.wantErr {
				t.Errorf("UnmarshalUUID() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("UnmarshalUUID() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestMarshalUUID(t *testing.T) {
	tests := []struct {
		name  string
		input uuid.UUID
		want  string
	}{
		{"valid uuid", uuid.MustParse("a0a0a0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a"), "\"a0a0a0a0-0a0a-0a0a-0a0a-0a0a0a0a0a0a\""},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var b bytes.Buffer

			got := MarshalUUID(tt.input)
			got.MarshalGQL(&b)

			if !reflect.DeepEqual(b.String(), tt.want) {
				t.Errorf("MarshalUUID() = %v, want %v", got, tt.want)
			}
		})
	}
}

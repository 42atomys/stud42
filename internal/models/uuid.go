package models

import (
	"errors"
	"io"

	"github.com/99designs/gqlgen/graphql"
	"github.com/google/uuid"
)

// Function for converting a time-object to an RFC3339-String with GraphQL.
// Returns the corresponding marshaller to perform this task.
func MarshalUUID(uuid uuid.UUID) graphql.Marshaler {
	return graphql.WriterFunc(func(w io.Writer) {
		_, _ = io.WriteString(w, uuid.String())
	})
}

// Function for converting a RFC3339 Time-String into an time-object. Used by GraphQL.
// Returns a Time-Object representing the Time-String.
func UnmarshalUUID(v interface{}) (uuid.UUID, error) {
	if uuidString, ok := v.(string); ok {
		parsedUUID, err := uuid.Parse(uuidString)
		if err != nil {
			return uuid.UUID{}, err
		}
		return parsedUUID, nil
	}
	return uuid.UUID{}, errors.New("uuid should be a string")
}

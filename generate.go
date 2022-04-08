//go:build ignore
//+build generate

package main

//go:generate echo "⌛ Auto-generating schema"
//go:generate go run -mod=mod entgo.io/ent/cmd/ent generate --target ./internal/models/generated ./internal/models/schema
//go:generate echo "⌛ Auto-generating gql"
//go:generate go run -mod=mod github.com/99designs/gqlgen generate
//go:generate echo "✔️ Successfully generated"

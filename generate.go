//go:build ignore
// +build ignore

package main

//go:generate echo "⌛ Auto-generating schema"
//go:generate go run generate.go
//go:generate echo "⌛ Auto-generating gql"
//go:generate go run -mod=mod github.com/99designs/gqlgen generate
//go:generate echo "✔️ Successfully generated"

import (
	"log"

	"entgo.io/contrib/entgql"
	"entgo.io/ent/entc"
	"entgo.io/ent/entc/gen"
)

func main() {
	ex, err := entgql.NewExtension(
		entgql.WithWhereFilters(true),
		entgql.WithSchemaPath("./api/graphs/api.graphqls"),
	)
	if err != nil {
		log.Fatalf("creating entgql extension: %v", err)
	}

	err = entc.Generate("./internal/models/schema", &gen.Config{
		Features: []gen.Feature{
			gen.FeaturePrivacy,
			gen.FeatureSnapshot,
			gen.FeatureUpsert,
			gen.FeatureVersionedMigration,
		},
		Target:  "./internal/models/generated",
		Package: "atomys.codes/stud42/internal/models/generated",
	}, entc.Extensions(ex))
	if err != nil {
		log.Fatalf("running ent codegen: %v", err)
	}
}

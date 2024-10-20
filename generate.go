//go:build ignore
// +build ignore

package main

//go:generate go run generate.go

import (
	"fmt"
	"log"
	"os"

	"entgo.io/contrib/entgql"
	"entgo.io/ent/entc"
	"entgo.io/ent/entc/gen"
	"github.com/42atomys/stud42/pkg/cache"
	gqlgenapi "github.com/99designs/gqlgen/api"
	"github.com/99designs/gqlgen/codegen/config"
	"github.com/99designs/gqlgen/plugin/modelgen"
	"github.com/vektah/gqlparser/v2/ast"
)

func main() {
	log.Println("⌛ Auto-generating schema")
	generateEntc()
	log.Println("⌛ Auto-generating gql")
	generateGqlGen()
	log.Println("✔️ Successfully generated")
}

func generateEntc() {
	ex, err := entgql.NewExtension(
		entgql.WithConfigPath("./gqlgen.yml"),
	)
	if err != nil {
		log.Fatalf("creating entgql extension: %v", err)
	}

	opts := []entc.Option{
		entc.Extensions(ex),
		entc.TemplateDir("./internal/models/templates"),
		entc.Dependency(
			entc.DependencyName("Cache"),
			entc.DependencyType(&cache.Client{}),
		),
	}

	err = entc.Generate("./internal/models/schema", &gen.Config{
		Features: []gen.Feature{
			gen.FeaturePrivacy,
			gen.FeatureModifier,
			gen.FeatureSnapshot,
			gen.FeatureUpsert,
			gen.FeatureVersionedMigration,
		},
		Target:  "./internal/models/generated",
		Package: "github.com/42atomys/stud42/internal/models/generated",
	}, opts...)
	if err != nil {
		log.Fatalf("running ent codegen: %v", err)
	}
}

func generateGqlGen() {
	cfg, err := config.LoadConfigFromDefaultLocations()
	if err != nil {
		log.Fatalf("cannot load config: %v", err)
	}

	// Attaching the mutation function onto modelgen plugin
	p := modelgen.Plugin{
		FieldHook: extraStructTagFieldHook,
	}

	err = gqlgenapi.Generate(cfg, gqlgenapi.ReplacePlugin(&p))

	if err != nil {
		fmt.Fprintln(os.Stderr, err.Error())
		os.Exit(3)
	}
}

func extraStructTagFieldHook(td *ast.Definition, fd *ast.FieldDefinition, f *modelgen.Field) (*modelgen.Field, error) {

	c := fd.Directives.ForName("extraStructTag")
	if c != nil {
		for _, arg := range c.Arguments {
			f.Tag += fmt.Sprintf(" %s:%s", arg.Name, arg.Value.String())
		}
	}

	return f, nil
}

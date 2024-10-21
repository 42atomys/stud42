package api

import (
	"github.com/99designs/gqlgen/graphql"
	"go.opentelemetry.io/otel/trace"

	apigen "github.com/42atomys/stud42/internal/api/generated"
	modelgen "github.com/42atomys/stud42/internal/models/generated"
	"github.com/42atomys/stud42/pkg/cache"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	client *modelgen.Client
	cache  *cache.Client
	tracer trace.Tracer
}

type contextKey string

// NewSchema creates a graphql executable schema.
func NewSchema(client *modelgen.Client, cacheClient *cache.Client, tr trace.Tracer) graphql.ExecutableSchema {
	return apigen.NewExecutableSchema(apigen.Config{
		Resolvers: &Resolver{
			client: client,
			cache:  cacheClient,
			tracer: tr,
		},
		Directives: apigen.DirectiveRoot{
			AuthzByPolicy: directiveAuthzByPolicy,
			Authenticated: directiveAuthorization(client),
		},
	})
}

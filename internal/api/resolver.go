package api

import (
	apigen "atomys.codes/stud42/internal/api/generated"
	modelgen "atomys.codes/stud42/internal/models/generated"
	"github.com/99designs/gqlgen/graphql"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{ client *modelgen.Client }

type contextKey string

// NewSchema creates a graphql executable schema.
func NewSchema(client *modelgen.Client) graphql.ExecutableSchema {
	return apigen.NewExecutableSchema(apigen.Config{
		Resolvers: &Resolver{client},
		Directives: apigen.DirectiveRoot{
			AuthorizationByPolicy: directiveAuthorizationByPolicy,
			Authenticated:         directiveAuthorization(client),
		},
	})
}

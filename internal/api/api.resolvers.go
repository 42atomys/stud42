package api

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"atomys.codes/stud42/internal/api/generated"
	"atomys.codes/stud42/internal/models"
)

func (r *mutationResolver) HelloWorld(ctx context.Context, input models.Hello) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) HelloWorld(ctx context.Context) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

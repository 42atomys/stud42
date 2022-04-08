package api

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"atomys.codes/stud42/internal/api/generated"
	"atomys.codes/stud42/internal/models"
	generated1 "atomys.codes/stud42/internal/models/generated"
)

func (r *accountResolver) ID(ctx context.Context, obj *generated1.Account) (*string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *accountResolver) User(ctx context.Context, obj *generated1.Account) (*generated1.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateUser(ctx context.Context, input models.CreateUserInput) (*generated1.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) LinkAccount(ctx context.Context, input models.LinkAccountInput) (*generated1.Account, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) GetUserByAccount(ctx context.Context, provider string, uid string) (*generated1.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) GetUserByEmail(ctx context.Context, email string) (*generated1.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) GetUser(ctx context.Context, id string) (*generated1.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateUser(ctx context.Context, id string, input string) (*generated1.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) DeleteUser(ctx context.Context, id string) (*generated1.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UnlinkAccount(ctx context.Context, provider string, uid string) (*generated1.Account, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) CreateSession(ctx context.Context, sessionToken string, userID string, expires string) (*generated1.Session, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) GetSessionAndUser(ctx context.Context, sessionToken string) (interface{}, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) UpdateSession(ctx context.Context, sessionToken string) (*generated1.Session, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *mutationResolver) DeleteSession(ctx context.Context, sessionToken string) (*generated1.Session, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *queryResolver) HelloWorld(ctx context.Context) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *sessionResolver) ID(ctx context.Context, obj *generated1.Session) (*string, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *sessionResolver) User(ctx context.Context, obj *generated1.Session) (*generated1.User, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *userResolver) Accounts(ctx context.Context, obj *generated1.User) ([]*generated1.Account, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *userResolver) Sessions(ctx context.Context, obj *generated1.User) ([]*generated1.Session, error) {
	panic(fmt.Errorf("not implemented"))
}

// Account returns generated.AccountResolver implementation.
func (r *Resolver) Account() generated.AccountResolver { return &accountResolver{r} }

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// Session returns generated.SessionResolver implementation.
func (r *Resolver) Session() generated.SessionResolver { return &sessionResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type accountResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type sessionResolver struct{ *Resolver }
type userResolver struct{ *Resolver }

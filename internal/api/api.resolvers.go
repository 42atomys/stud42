package api

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"os"

	apigen "atomys.codes/stud42/internal/api/generated"
	typesgen "atomys.codes/stud42/internal/api/generated/types"
	"atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/account"
	"atomys.codes/stud42/internal/models/generated/campus"
	"atomys.codes/stud42/internal/models/generated/location"
	"atomys.codes/stud42/internal/models/generated/user"
	"github.com/bwmarrin/discordgo"
	"github.com/google/uuid"
	"github.com/rs/zerolog/log"
	"github.com/shurcooL/githubv4"
	"github.com/spf13/viper"
	"golang.org/x/oauth2"
)

func (r *mutationResolver) CreateFriendship(ctx context.Context, userID uuid.UUID) (bool, error) {
	cu, err := CurrentUserFromContext(ctx)
	if err != nil {
		return false, err
	}

	if _, err := r.client.User.UpdateOne(cu).AddFollowingIDs(userID).Save(ctx); err != nil {
		return false, err
	}
	return true, nil
}

func (r *mutationResolver) DeleteFriendship(ctx context.Context, userID uuid.UUID) (bool, error) {
	cu, err := CurrentUserFromContext(ctx)
	if err != nil {
		return false, err
	}

	if _, err := r.client.User.UpdateOne(cu).RemoveFollowingIDs(userID).Save(ctx); err != nil {
		return false, err
	}
	return true, nil
}

func (r *mutationResolver) InternalCreateUser(ctx context.Context, input typesgen.CreateUserInput) (uuid.UUID, error) {
	return r.client.User.Create().
		SetEmail(input.Email).
		SetDuoLogin(input.DuoLogin).
		SetDuoID(input.DuoID).
		SetFirstName(input.FirstName).
		SetNillableUsualFirstName(input.UsualFirstName).
		SetLastName(input.LastName).
		SetNillablePoolYear(input.PoolYear).
		SetNillablePoolMonth(input.PoolMonth).
		SetNillablePhone(input.Phone).
		SetIsStaff(input.IsStaff).
		SetIsAUser(true).
		OnConflictColumns(user.FieldDuoID).
		UpdateNewValues().
		ID(ctx)
}

func (r *mutationResolver) InternalLinkAccount(ctx context.Context, input typesgen.LinkAccountInput) (*generated.Account, error) {
	id, err := r.client.Account.Create().
		SetProvider(input.Provider.String()).
		SetProviderAccountID(input.ProviderAccountID).
		SetUsername(input.Username).
		SetType(input.Type.String()).
		SetAccessToken(input.AccessToken).
		SetNillableRefreshToken(input.RefreshToken).
		SetTokenType(input.TokenType).
		SetNillableExpiresAt(input.ExpiresAt).
		SetScope(input.Scope).
		SetUserID(uuid.MustParse(input.UserID)).
		OnConflictColumns(account.FieldProvider, account.FieldProviderAccountID).
		UpdateNewValues().
		ID(ctx)
	if err != nil {
		return nil, err
	}

	return r.client.Account.Get(ctx, id)
}

func (r *mutationResolver) InviteOnDiscord(ctx context.Context) (bool, error) {
	cu, err := CurrentUserFromContext(ctx)
	if err != nil {
		return false, err
	}
	s, err := discordgo.New("Bot " + os.Getenv("DISCORD_TOKEN"))
	if err != nil {
		return false, err
	}

	acc := r.client.Account.Query().Where(account.UserID(cu.ID), account.Provider(string(typesgen.ProviderDiscord))).OnlyX(ctx)

	err = s.GuildMemberAdd(acc.AccessToken, viper.GetString("discord.guildID"), acc.ProviderAccountID, "", []string{}, false, false)
	if err != nil {
		return false, err
	}
	return true, nil
}

func (r *queryResolver) Me(ctx context.Context) (*generated.User, error) {
	cu, err := CurrentUserFromContext(ctx)
	if err != nil {
		return nil, err
	}

	return r.client.User.Query().WithFollowing(func(q *generated.UserQuery) {
		q.Order(generated.Asc(user.FieldDuoLogin))
	}).Where(user.ID(cu.ID)).First(ctx)
}

func (r *queryResolver) SearchUser(ctx context.Context, query string) ([]*generated.User, error) {
	cu, _ := CurrentUserFromContext(ctx)
	return r.client.User.Query().
		Where(user.Or(
			user.DuoLoginContainsFold(query),
			user.FirstNameContainsFold(query),
			user.LastNameContainsFold(query),
			user.UsualFirstNameContainsFold(query),
		),
			user.IDNEQ(cu.ID),
		).
		Limit(10).
		All(ctx)
}

func (r *queryResolver) Campus(ctx context.Context, id uuid.UUID) (*generated.Campus, error) {
	return r.client.Campus.Query().Where(campus.ID(id)).Only(ctx)
}

func (r *queryResolver) User(ctx context.Context, id uuid.UUID) (*generated.User, error) {
	return r.client.User.Query().Where(user.ID(id)).Only(ctx)
}

func (r *queryResolver) Location(ctx context.Context, id uuid.UUID) (*generated.Location, error) {
	return r.client.Location.Query().Where(location.ID(id)).Only(ctx)
}

func (r *queryResolver) Locations(ctx context.Context, page typesgen.PageInput, campusID uuid.UUID) (*generated.LocationConnection, error) {
	return r.client.Location.Query().
		Where(location.CampusID(campusID)).
		WithCampus().
		WithUser().
		Where(location.EndAtIsNil()).
		Paginate(ctx, page.After, &page.First, page.Before, page.Last)
}

func (r *queryResolver) LocationsByCampusName(ctx context.Context, page typesgen.PageInput, campusName string) (*generated.LocationConnection, error) {
	return r.client.Campus.Query().
		Where(campus.Name(campusName)).
		QueryLocations().
		WithCampus().
		WithUser().
		Where(location.EndAtIsNil()).
		Paginate(ctx, page.After, &page.First, page.Before, page.Last)
}

func (r *queryResolver) LocationsByCluster(ctx context.Context, page typesgen.PageInput, campusName string, identifierPrefix *string) (*generated.LocationConnection, error) {
	return r.client.Campus.Query().
		Where(campus.Name(campusName)).
		QueryLocations().
		WithCampus().
		WithUser().
		Where(location.IdentifierHasPrefix(*identifierPrefix), location.EndAtIsNil()).
		Paginate(ctx, page.After, &page.First, page.Before, page.Last)
}

func (r *queryResolver) InternalGetUserByAccount(ctx context.Context, provider typesgen.Provider, uid string) (*generated.User, error) {
	return r.client.Account.Query().
		Where(account.Provider(provider.String()), account.ProviderAccountID(uid)).
		QueryUser().
		Only(ctx)
}

func (r *queryResolver) InternalGetUserByEmail(ctx context.Context, email string) (*generated.User, error) {
	return r.client.User.Query().
		Where(user.Email(email)).
		Only(ctx)
}

func (r *queryResolver) InternalGetUser(ctx context.Context, id uuid.UUID) (*generated.User, error) {
	return r.client.User.Get(ctx, id)
}

func (r *userResolver) Features(ctx context.Context, obj *generated.User) ([]typesgen.Feature, error) {
	var features = make([]typesgen.Feature, 0)

	// TODO @42Atomys Remove hardcoded check
	if obj.DuoLogin == "gdalmar" {
		return typesgen.AllFeature, nil
	}

	acc, err := r.client.Account.Query().
		Select("username").
		Where(
			account.UserID(obj.ID),
			account.Provider(string(typesgen.ProviderGithub)),
		).
		Only(ctx)

	if (err != nil) || (acc == nil) {
		return features, nil
	}

	// TODO Move github utils outside of resolvers
	httpClient := oauth2.NewClient(context.Background(), oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: os.Getenv("GITHUB_TOKEN")},
	))

	client := githubv4.NewClient(httpClient)

	var query struct {
		User struct {
			SponsorshipForViewerAsSponsorable struct {
				Tier struct {
					ID                    string
					MonthlyPriceInDollars int
				}
			}
		} `graphql:"user(login: $login)"`
	}

	err = client.Query(ctx, &query, map[string]interface{}{
		"login": githubv4.String(acc.Username),
	})
	if err != nil {
		log.Error().Err(err).Msg("failed to query github")
		return nil, err
	}

	if query.User.SponsorshipForViewerAsSponsorable.Tier.MonthlyPriceInDollars >= 5 {
		features = append(features, typesgen.FeatureDiscordAccess)
	}

	if query.User.SponsorshipForViewerAsSponsorable.Tier.MonthlyPriceInDollars >= 25 {
		features = append(features, typesgen.FeatureBetaAccess)
	}

	return features, nil
}

func (r *userResolver) IsFollowing(ctx context.Context, obj *generated.User) (bool, error) {
	cu, _ := CurrentUserFromContext(ctx)

	for _, f := range cu.Edges.Following {
		if f.ID == obj.ID {
			return true, nil
		}
	}

	return false, nil
}

func (r *userResolver) IsFollower(ctx context.Context, obj *generated.User) (bool, error) {
	cu, _ := CurrentUserFromContext(ctx)

	for _, f := range cu.Edges.Followers {
		if f.ID == obj.ID {
			return true, nil
		}
	}

	return false, nil
}

// Mutation returns apigen.MutationResolver implementation.
func (r *Resolver) Mutation() apigen.MutationResolver { return &mutationResolver{r} }

// Query returns apigen.QueryResolver implementation.
func (r *Resolver) Query() apigen.QueryResolver { return &queryResolver{r} }

// User returns apigen.UserResolver implementation.
func (r *Resolver) User() apigen.UserResolver { return &userResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }

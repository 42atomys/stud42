package api

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"strconv"
	"strings"
	"time"

	apigen "atomys.codes/stud42/internal/api/generated"
	typesgen "atomys.codes/stud42/internal/api/generated/types"
	"atomys.codes/stud42/internal/cache"
	"atomys.codes/stud42/internal/discord"
	modelsutils "atomys.codes/stud42/internal/models"
	"atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/account"
	"atomys.codes/stud42/internal/models/generated/campus"
	"atomys.codes/stud42/internal/models/generated/location"
	"atomys.codes/stud42/internal/models/generated/user"
	"atomys.codes/stud42/internal/models/gotype"
	"atomys.codes/stud42/pkg/utils"
	"entgo.io/ent/dialect/sql"
	"github.com/eko/gocache/v3/store"
	"github.com/google/uuid"
)

// CreateFriendship is the resolver for the createFriendship field.
func (r *mutationResolver) CreateFriendship(ctx context.Context, userID uuid.UUID) (bool, error) {
	cu, err := CurrentUserFromContext(ctx)
	if err != nil {
		return false, err
	}

	if userID == cu.ID {
		return false, fmt.Errorf("cannot befriend yourself")
	}

	if _, err := r.client.User.UpdateOne(cu).AddFollowingIDs(userID).Save(ctx); err != nil {
		return false, err
	}
	return true, nil
}

// DeleteFriendship is the resolver for the deleteFriendship field.
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

// UpdateSettings is the resolver for the updateSettings field.
func (r *mutationResolver) UpdateSettings(ctx context.Context, input typesgen.SettingsInput) (*gotype.Settings, error) {
	cu, err := CurrentUserFromContext(ctx)
	if err != nil {
		return nil, err
	}

	updatedUser, err := r.client.User.UpdateOne(cu).SetSettings(gotype.Settings(input)).Save(ctx)
	if err != nil {
		return nil, err
	}
	return &updatedUser.Settings, nil
}

// InternalCreateUser is the resolver for the internalCreateUser field.
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
		SetNillableDuoAvatarURL(input.ImageURL).
		SetIsStaff(input.IsStaff).
		SetIsAUser(true).
		OnConflictColumns(user.FieldDuoID).
		UpdateNewValues().
		ID(ctx)
}

// InternalLinkAccount is the resolver for the internalLinkAccount field.
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

	account, err := r.client.Account.Get(ctx, id)
	if err != nil {
		return nil, err
	}

	go accountLinkCallback(ctx, account)

	return account, nil
}

// InviteOnDiscord is the resolver for the inviteOnDiscord field.
func (r *mutationResolver) InviteOnDiscord(ctx context.Context) (bool, error) {
	cu, err := CurrentUserFromContext(ctx)
	if err != nil {
		return false, err
	}

	acc, err := r.client.Account.Query().Where(account.UserID(cu.ID), account.Provider(string(typesgen.ProviderDiscord))).Only(ctx)
	if err != nil {
		return false, err
	}

	err = discord.DefaultClient().InviteOnOurDiscord(ctx, acc.AccessToken, acc.ProviderAccountID)
	if err != nil {
		return false, err
	}
	return true, nil
}

// Me is the resolver for the me field.
func (r *queryResolver) Me(ctx context.Context) (*generated.User, error) {
	return CurrentUserFromContext(ctx)
}

// SearchUser is the resolver for the searchUser field.
func (r *queryResolver) SearchUser(ctx context.Context, query string, onlyOnline *bool) ([]*generated.User, error) {
	cu, _ := CurrentUserFromContext(ctx)

	sqlQuery := r.client.User.Query()

	if onlyOnline != nil && *onlyOnline {
		sqlQuery = sqlQuery.WithCurrentLocation(func(lq *generated.LocationQuery) {
			lq.WithCampus()
		})
	}

	return sqlQuery.Where(func(s *sql.Selector) {
		t := sql.Table(user.Table)

		// predicates to know if the user is online
		var onlinePredicate *sql.Predicate
		if onlyOnline != nil && *onlyOnline {
			onlinePredicate = sql.NotNull(t.C(user.FieldCurrentLocationID))
		} else {
			onlinePredicate = sql.IsNull(t.C(user.FieldCurrentLocationID))
		}

		s.Select(t.Columns(user.Columns...)...).
			From(t).
			Where(
				sql.And(
					sql.NEQ(t.C(user.FieldID), cu.ID),
					sql.Like(t.C(user.FieldDuoLogin), query),
					onlinePredicate,
				),
			).
			UnionAll(
				sql.Select(t.Columns(user.Columns...)...).
					From(t).
					Where(
						sql.And(
							sql.NEQ(t.C(user.FieldID), cu.ID),
							onlinePredicate,
							sql.ExprP("CONCAT(COALESCE(NULLIF(TRIM(usual_first_name), ''), first_name), ' ', last_name) ILIKE $4", fmt.Sprintf("%%%s%%", utils.StringLimiter(query, 20))),
						),
					),
			)
	}).Limit(10).All(ctx)
}

// Campus is the resolver for the campus field.
func (r *queryResolver) Campus(ctx context.Context, id uuid.UUID) (*generated.Campus, error) {
	return r.client.Campus.Query().Where(campus.ID(id)).Only(ctx)
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id uuid.UUID) (*generated.User, error) {
	return r.client.User.Query().Where(user.ID(id)).Only(ctx)
}

// Location is the resolver for the location field.
func (r *queryResolver) Location(ctx context.Context, id uuid.UUID) (*generated.Location, error) {
	return r.client.Location.Query().Where(location.ID(id)).Only(ctx)
}

// Locations is the resolver for the locations field.
func (r *queryResolver) Locations(ctx context.Context, page typesgen.PageInput, campusID uuid.UUID) (*generated.LocationConnection, error) {
	return r.client.Location.Query().
		Where(location.CampusID(campusID)).
		WithCampus().
		WithUser().
		Where(location.EndAtIsNil()).
		Paginate(ctx, page.After, &page.First, page.Before, page.Last)
}

// LocationsByCampusName is the resolver for the locationsByCampusName field.
func (r *queryResolver) LocationsByCampusName(ctx context.Context, page typesgen.PageInput, campusName string) (*generated.LocationConnection, error) {
	return r.client.Campus.Query().
		Where(campus.Name(campusName)).
		QueryLocations().
		WithCampus().
		WithUser().
		Where(location.EndAtIsNil()).
		Paginate(ctx, page.After, &page.First, page.Before, page.Last)
}

// LocationsByCluster is the resolver for the locationsByCluster field.
func (r *queryResolver) LocationsByCluster(ctx context.Context, page typesgen.PageInput, campusName string, identifierPrefix *string) (*generated.LocationConnection, error) {
	locationConnectionCache := cache.NewTyped[*generated.LocationConnection](r.cache)

	cacheParts := []string{campusName, *identifierPrefix, strconv.Itoa(page.First)}
	if page.After != nil {
		cacheParts = append(cacheParts, page.After.ID.String())
	}
	cacheKey := cache.NewKeyBuilder().WithPrefix("locations-by-cluster").WithParts(cacheParts...).Build()

	loader := locationConnectionCache.
		WithLoader(ctx, func(ctx context.Context, key cache.CacheKey) (*generated.LocationConnection, error) {
			return r.client.Campus.Query().
				Where(campus.NameEqualFold(campusName)).
				QueryLocations().
				WithCampus().
				WithUser().
				Where(location.IdentifierHasPrefix(*identifierPrefix), location.EndAtIsNil()).
				Paginate(ctx, page.After, &page.First, page.Before, page.Last)
		})
	defer loader.Close()

	return loader.Get(ctx,
		cacheKey,
		store.WithTags([]string{"locations-by-cluster", campusName, *identifierPrefix}),
		store.WithExpiration(30*time.Second),
	)
}

// MyFollowing is the resolver for the myFollowing field.
func (r *queryResolver) MyFollowing(ctx context.Context) ([]*generated.User, error) {
	cu, _ := CurrentUserFromContext(ctx)

	return r.client.User.Query().
		Where(user.ID(cu.ID)).
		QueryFollowing().
		WithCurrentLocation(func(lq *generated.LocationQuery) {
			lq.WithCampus()
		}).
		// Unique is necessary because the query builder always add a DISTINCT clause
		// and cannot order the query properly by location identifier
		Unique(false).
		Order(func(s *sql.Selector) {
			//: Hack to order the friends as A -> Z over the connected status
			t := sql.Table(location.Table)
			s.LeftJoin(t).On(s.C(user.FieldCurrentLocationID), t.C(location.FieldID))
			s.OrderBy(t.C(location.FieldUserDuoLogin), s.C(user.FieldDuoLogin))
			//: Hack to order the friends as A -> Z over the connected status
		}).
		All(ctx)
}

// InternalGetUserByAccount is the resolver for the internalGetUserByAccount field.
func (r *queryResolver) InternalGetUserByAccount(ctx context.Context, provider typesgen.Provider, uid string) (*generated.User, error) {
	return r.client.Account.Query().
		Where(account.Provider(provider.String()), account.ProviderAccountID(uid)).
		QueryUser().
		Only(ctx)
}

// InternalGetUserByEmail is the resolver for the internalGetUserByEmail field.
func (r *queryResolver) InternalGetUserByEmail(ctx context.Context, email string) (*generated.User, error) {
	return r.client.User.Query().
		Where(user.Email(email)).
		Only(ctx)
}

// InternalGetUser is the resolver for the internalGetUser field.
func (r *queryResolver) InternalGetUser(ctx context.Context, id uuid.UUID) (*generated.User, error) {
	return r.client.User.Get(ctx, id)
}

// IsSwimmer is the resolver for the isSwimmer field.
func (r *userResolver) IsSwimmer(ctx context.Context, obj *generated.User) (bool, error) {
	if obj.PoolYear == nil || obj.PoolMonth == nil {
		return false, nil
	}

	now := time.Now()
	return (*obj.PoolYear == strconv.Itoa(now.Year()) &&
		strings.EqualFold(*obj.PoolMonth, now.Format("January"))), nil
}

// IsMe is the resolver for the isMe field.
func (r *userResolver) IsMe(ctx context.Context, obj *generated.User) (bool, error) {
	cu, _ := CurrentUserFromContext(ctx)

	return cu.ID == obj.ID, nil
}

// Flags is the resolver for the flags field.
func (r *userResolver) Flags(ctx context.Context, obj *generated.User) ([]typesgen.Flag, error) {
	return modelsutils.TranslateFlagFromORM(obj.FlagsList), nil
}

// IsFollowing is the resolver for the isFollowing field.
func (r *userResolver) IsFollowing(ctx context.Context, obj *generated.User) (bool, error) {
	cu, _ := CurrentUserFromContext(ctx)

	for _, f := range cu.Edges.Following {
		if f.ID == obj.ID {
			return true, nil
		}
	}

	return false, nil
}

// IsFollower is the resolver for the isFollower field.
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

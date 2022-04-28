package api

import (
	"context"
	"errors"
	"net/http"
	"strings"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/google/uuid"
	"github.com/lestrrat-go/jwx/v2/jwk"
	"github.com/lestrrat-go/jwx/v2/jwt"
	"github.com/rs/zerolog/log"
	"github.com/spf13/viper"

	modelgen "atomys.codes/stud42/internal/models/generated"
	"atomys.codes/stud42/internal/models/generated/user"
)

// authTokenContextKey is the context key to store the JWT Token from the
// Authorization header.
const authTokenContextKey contextKey = "auth_token"
const currentUsreContextKey contextKey = "auth_current_user"

// errUnauthenticated is the error returned by the directiveAuthorization
// when the request is not authenticated.
var errUnauthenticated = errors.New("request not authenticated")

// AuthenticationMiddleware is a middleware that extracts the JWT Token from
// the Authorization header and stores it in the context for the
// directiveAuthorization.
func AuthenticationMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var token string

		splitToken := strings.Split(r.Header.Get("Authorization"), "Bearer ")
		if len(splitToken) == 2 {
			token = strings.TrimSpace(splitToken[1])
		} else {
			cookie, _ := r.Cookie("__s42.auth-token")

			if cookie != nil {
				token = cookie.Value
			}
		}

		ctx := context.WithValue(r.Context(), authTokenContextKey, token)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// directiveAuthorization is a directive that checks the JWT Token and returns
// an error if the user is not authenticated. If a Token is present and valid
// the user will be stored in the context for the resolver.
// The directive is registered in the schema and automatically used by the
// resolver on fields that have the @authorization directive.
func directiveAuthorization(client *modelgen.Client) func(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {
	return func(ctx context.Context, obj interface{}, next graphql.Resolver) (res interface{}, err error) {
		jwtToken, _ := ctx.Value(authTokenContextKey).(string)

		if jwtToken == "" {
			log.Debug().Msg("request not authenticated")
			return nil, errUnauthenticated
		}

		jwks, err := jwk.Fetch(ctx, viper.GetString("jwtks.endpoints.sets"))
		if err != nil {
			log.Error().Err(err).Msg("error fetching jwks")
			return nil, err
		}

		tok, err := jwt.ParseString(jwtToken, jwt.WithKeySet(jwks))
		if err != nil {
			log.Error().Err(err).Msg("failed to parse JWT")
			return nil, err
		}

		if !tok.Expiration().IsZero() && tok.Expiration().Before(time.Now().UTC()) {
			return nil, errors.New("token expired")
		}

		user, err := client.User.Query().Where(user.ID(uuid.MustParse(tok.Subject()))).Only(ctx)
		if err != nil {
			return nil, errUnauthenticated
		}

		ctx = context.WithValue(ctx, currentUsreContextKey, user)

		return next(ctx)
	}
}

// CurrentUserFromContext will retrieve the current user from the context.
func CurrentUserFromContext(ctx context.Context) (*modelgen.User, error) {
	user, ok := ctx.Value(currentUsreContextKey).(*modelgen.User)
	if !ok {
		return nil, errUnauthenticated
	}
	return user, nil
}

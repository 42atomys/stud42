package api

import (
	"context"
	"errors"
	"net/http"
	"strings"

	modelgen "atomys.codes/stud42/internal/models/generated"
	"github.com/99designs/gqlgen/graphql"
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
			// TODO : Change when PR on next-auth is merged
			// https://github.com/nextauthjs/next-auth/pull/4385
			cookie, _ := r.Cookie("next-auth.session-token")

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
		// jweToken, _ := ctx.Value(authTokenContextKey).(string)

		// if jweToken == "" {
		// 	log.Debug().Msg("request not authenticated")
		// 	return nil, errUnauthenticated
		// }

		// log.Debug().Msgf("T: %s", jweToken)

		// // Extract sub from jwe
		// // Decrypt the receive key
		// jwe, err := jose.ParseEncrypted(jweToken)
		// if err != nil {
		// 	log.Error().Err(err).Msg("error parsing token")
		// 	return nil, errors.New("internal server error")
		// }

		// var decryptedKey []byte
		// if secret := os.Getenv("NEXTAUTH_SECRET"); secret != "" {
		// 	log.Debug().Msgf("secre: %s", secret)
		// 	encryptionKey := hkdf.New(sha256.New, []byte(secret), []byte{}, []byte("NextAuth.js Generated Encryption Key"))
		// 	decryptedKey, err = jwe.Decrypt(encryptionKey)
		// 	if err != nil {
		// 		log.Error().Err(err).Msg("error decrypting token")
		// 		return nil, errors.New("internal server error")
		// 	}
		// }

		// log.Debug().Msgf("decrypted key: %s", decryptedKey)

		// var claims = &jwt.StandardClaims{}
		// token, err := jwt.ParseWithClaims(jwtToken, claims, func(token *jwt.Token) (interface{}, error) {
		// 	if secret := os.Getenv("NEXTAUTH_SECRET"); secret != "" {
		// 		return secret, nil
		// 	}
		// 	return nil, errors.New("NEXTAUTH_SECRET env variable not set")
		// })

		// if err != nil {
		// 	if err == jwt.ErrSignatureInvalid {
		// 		return nil, errUnauthenticated
		// 	}
		// 	log.Error().Err(err).Msg("error parsing token")
		// 	return nil, errors.New("internal server error")
		// }
		// if !token.Valid {
		// 	return nil, errUnauthenticated
		// }

		// user, err := client.User.Query().Where(user.ID(uuid.MustParse(claims.Subject))).Only(ctx)
		// if err != nil {
		// 	return nil, errUnauthenticated
		// }

		// ctx = context.WithValue(ctx, currentUsreContextKey, user)

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

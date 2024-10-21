package api

import (
	"context"
	"errors"
	"net/http"
	"os"
	"strings"

	"github.com/99designs/gqlgen/graphql"
	"github.com/rs/zerolog/log"

	typesgen "github.com/42atomys/stud42/internal/api/generated/types"
)

// policyRequestHeaderAuthorizationContextKey is the context key for the request IP.
// It is used by the AuthzByPolicyMiddleware and the directiveAuthzByPolicy.
// The type of the context value must be a net.IP.
const policyRequestHeaderAuthorizationContextKey contextKey = "policy_request_header_authorization"

// errBlockedByPolicy is the error returned by the directiveAuthzByPolicy.
// when the request IP is not allowed by the policy.
var errBlockedByPolicy = errors.New("request blocked by policy")

// AuthzByPolicyMiddleware is a middleware that checks the request IP and stores
// it in the context for the directiveAuthzByPolicy. It is used by the
// directiveAuthzByPolicy.
func AuthzByPolicyMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var authString = r.Header.Get("Authorization")
		splitToken := strings.Split(authString, "ServiceToken ")
		if len(splitToken) != 2 {
			splitToken = append(splitToken, "")
		}

		ctx := context.WithValue(r.Context(), policyRequestHeaderAuthorizationContextKey, splitToken[1])
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// directiveAuthzByPolicy is a directive that checks the request IP and
// returns an error if the IP is not allowed by the policy.
// The directive is registered in the schema and automatically used by the
// resolver on fields that have the @authorizationByPolicy directive.
func directiveAuthzByPolicy(ctx context.Context, obj interface{}, next graphql.Resolver, policy *typesgen.SecurityPolicy) (res interface{}, err error) {
	token := ctx.Value(policyRequestHeaderAuthorizationContextKey).(string)
	log.Debug().Msgf("Request being tested against policy %s", policy)

	if os.Getenv("GO_ENV") == "development" {
		log.Warn().Msg("policy is not enforced in development mode")
		return next(ctx)
	}

	switch *policy {
	case typesgen.SecurityPolicyServiceToken:
		log.Debug().Str("token", token).Str("env", os.Getenv("S42_SERVICE_TOKEN")).Msg("testing service token")
		if token != os.Getenv("S42_SERVICE_TOKEN") {
			return nil, errBlockedByPolicy
		}
	case typesgen.SecurityPolicyNone:
		break
	default:
		break
	}

	return next(ctx)
}

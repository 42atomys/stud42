package api

import (
	"context"
	"errors"
	"net"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql"
	"github.com/rs/zerolog/log"

	typesgen "atomys.codes/stud42/internal/api/generated/types"
)

// networkPolicyRequestIPContextKey is the context key for the request IP.
// It is used by the NetworkPolicyMiddleware and the directiveAuthorizationByPolicy.
// The type of the context value must be a net.IP.
const networkPolicyRequestIPContextKey contextKey = "network_policy_request_ip"

// errNetworkPolicy is the error returned by the directiveAuthorizationByPolicy.
// when the request IP is not allowed by the policy.
var errNetworkPolicy = errors.New("request blocked by network policy")

// NetworkPolicyMiddleware is a middleware that checks the request IP and stores
// it in the context for the directiveAuthorizationByPolicy. It is used by the
// directiveAuthorizationByPolicy.
func NetworkPolicyMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var clientIp = r.Header.Get("X-Forwarded-For")
		if clientIp == "" {
			log.Debug().Msg("X-Forwarded-For header not found falling back to remote address")
			var err error
			clientIp, _, err = net.SplitHostPort(r.RemoteAddr)
			if err != nil {
				log.Error().Err(err).Msg("could not get request IP")
				http.Error(w, "could not get request IP", http.StatusInternalServerError)
				return
			}
		}

		ctx := context.WithValue(r.Context(), networkPolicyRequestIPContextKey, net.ParseIP(clientIp))
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// directiveAuthorizationByPolicy is a directive that checks the request IP and
// returns an error if the IP is not allowed by the policy.
// The directive is registered in the schema and automatically used by the
// resolver on fields that have the @authorizationByPolicy directive.
func directiveAuthorizationByPolicy(ctx context.Context, obj interface{}, next graphql.Resolver, networkPolicy *typesgen.NetworkPolicy) (res interface{}, err error) {
	requestIP := ctx.Value(networkPolicyRequestIPContextKey).(net.IP)
	log.Debug().Msgf("Request from %s being tested against network policy %s", requestIP.String(), networkPolicy)

	if os.Getenv("GO_ENV") == "development" {
		log.Warn().Msg("network policy is not enforced in development mode")
		return next(ctx)
	}

	switch *networkPolicy {
	case typesgen.NetworkPolicyCluster:
		if !requestIP.IsPrivate() {
			return nil, errNetworkPolicy
		}
	case typesgen.NetworkPolicyLocal:
		if !requestIP.IsLoopback() {
			return nil, errNetworkPolicy
		}
	case typesgen.NetworkPolicyNone:
		break
	default:
		break
	}

	return next(ctx)
}

package auth

import (
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"os"
	"time"

	sentryhttp "github.com/getsentry/sentry-go/http"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/lestrrat-go/jwx/v2/jwt"
	"github.com/rs/cors"
	"github.com/rs/zerolog/log"
	"github.com/spf13/viper"
)

/**
 * ServeHTTP starts a HTTP server on the given port. This server
 * only handles the JWKS endpoint.
 *
 * NOTE: Actually this Service and this endpoint can hold only one
 * key set. But for the sake of simplicity, we are using a single key
 * called `global` and we are using the `kid` field to identify the
 * key.
 */
func ServeHTTP(port *string) error {
	lis, err := net.Listen("tcp4", fmt.Sprintf(":%s", *port))
	if err != nil {
		log.Fatal().Msgf("failed to listen: %v", err)
	}

	router := chi.NewRouter()
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "Sentry-Trace"},
		AllowCredentials: true,
	}).Handler)

	sentryHandler := sentryhttp.New(sentryhttp.Options{
		Repanic:         false,
		WaitForDelivery: true,
	})

	router.Handle("/.well-known/jwks", sentryHandler.HandleFunc(jwksHandler))
	router.Handle("/token", sentryHandler.HandleFunc(tokenHandler))

	log.Info().Msgf("server http listening at %v", lis.Addr())
	return http.Serve(lis, router)
}

/**
 * jwksHandler handles the JWKS endpoint and returns the key set
 * as a JSON object.
 */
func jwksHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	b, err := json.Marshal(GetKeySet())
	if err != nil {
		log.Fatal().Err(err).Msg("failed to marshal jwks")
	}

	if _, err = w.Write(b); err != nil {
		log.Fatal().Err(err).Msg("failed to write jwks")
	}
}

/**
 * tokenHandler handles the token endpoint and returns a signed JWT
 * token. The token is signed using the key set. The key set is a
 * single key called `global` and we are using the `kid` field to identify
 * the key. The token is signed using the `global` key using the `RS256`
 * algorithm.
 */
func tokenHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if r.Header.Get("Authorization") != fmt.Sprintf("ServiceToken %s", os.Getenv("S42_SERVICE_TOKEN")) {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	request := &TokenRequest{}

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		log.Fatal().Err(err).Msg("failed to decode request payload")
	}

	token, err := jwt.NewBuilder().
		Issuer(viper.GetString("auth.jwk.issuer")).
		IssuedAt(time.Now()).
		Expiration(time.Now().UTC().Add(time.Duration(request.Validity) * time.Second)).
		NotBefore(time.Now().UTC()).
		// Audience is not required, but it's a good idea to set it.
		// Following the spec, it should be an array of strings containing the
		// audience of the token. "{type}:{entity}:{scope}"
		Audience([]string{viper.GetString("auth.jwk.audience")}).
		// ID is required, and should be a string containing a unique identifier
		// for the token. It's recommended to use a UUID.
		// @TODO generate and set a unique ID to invalidate the token for more security.
		JwtID(uuid.NewString()).
		Subject(request.UserId).
		Build()

	if err != nil {
		http.Error(w, "failed to build token", http.StatusInternalServerError)
		return
	}

	for k, v := range request.Payload {
		if err := token.Set(k, v); err != nil {
			http.Error(w, fmt.Sprintf("failed to set %s payload", k), http.StatusInternalServerError)
			return
		}
	}

	jwkKey := getGlobalSigningJWK()
	signed, err := jwt.Sign(token, jwt.WithKey(jwkKey.Algorithm(), jwkKey))
	if err != nil {
		http.Error(w, "failed to sign token", http.StatusInternalServerError)
		return
	}

	response := &TokenResponse{
		Token:     string(signed),
		TokenId:   token.JwtID(),
		IssuedAt:  token.IssuedAt(),
		ExpiresAt: token.Expiration(),
	}

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "failed to encode response payload", http.StatusInternalServerError)
		return
	}
}

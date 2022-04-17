package jwtks

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/lestrrat-go/jwx/v2/jwk"
	"github.com/lestrrat-go/jwx/v2/jwt"
	"github.com/rs/zerolog/log"
)

type response struct {
	Valid bool   `json:"valid"`
	Token string `json:"token,omitempty"`
	Error string `json:"error,omitempty"`
}

/**
 * ValidateHandler will validate the JWT Token sended by the client in the
 * Authorization header, following the Bearer scheme. Token must be signed with
 * the private key of the server.
 *
 * If the token is valid, it will return a response with a valid field set as true.
 * If the token is invalid, it will return a response with a valid field set as false.
 *
 */
func ValidateHandler(w http.ResponseWriter, r *http.Request) {
	var err error
	defer func() {
		if err != nil {
			log.Error().Err(err).Msg("failed to validate token")
		}
	}()

	tok, err := jwt.ParseHeader(r.Header, "Authorization", jwt.WithKeySet(GetKeySet()))
	if err != nil {
		log.Error().Err(err).Msg("failed to parse JWT")
		err = writeResponse(w, &response{Valid: false})
		return
	}

	if !tok.Expiration().IsZero() && tok.Expiration().Before(time.Now().UTC()) {
		err = writeResponse(w, &response{Valid: false})
		return
	}

	err = writeResponse(w, &response{Valid: true})
}

/**
 *
 * GenerateHandler will generate a JWT Token with the given payload.
 *
 * The payload must be a JSON object with the following fields:
 *
 * - user_id: string
 *
 * The token will be signed with the private key of the server.
 * The token will expire every 30 days (30 * 24 * 60 * 60 seconds) by default.
 */
func GenerateHandler(w http.ResponseWriter, r *http.Request) {
	var err error
	defer func() {
		if err != nil {
			log.Error().Err(err).Msg("failed to generate a token")
		}
	}()

	payload := struct {
		UserID string `json:"user_id"`
	}{}
	if err = json.NewDecoder(r.Body).Decode(&payload); err != nil {
		err = writeResponse(w, &response{Valid: false, Token: "", Error: "invalid payload"})
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	tok, err := jwt.NewBuilder().
		Issuer(`student-id-provider`).
		IssuedAt(time.Now()).
		Expiration(time.Now().UTC().Add(30 * 24 * time.Hour)).
		NotBefore(time.Now().UTC()).
		// Audience is not required, but it's a good idea to set it.
		// Following the spec, it should be an array of strings containing the
		// audience of the token. "{type}:{entity}:{scope}"
		Audience([]string{`user:current:private`, `app:stud42:public`}).
		// Subject is required, and should be a string containing the subject of
		// the token, usually the user ID.
		Subject(payload.UserID).
		// ID is required, and should be a string containing a unique identifier
		// for the token. It's recommended to use a UUID.
		// @TODO generate and set a unique ID to invalidate the token for more security.
		JwtID(uuid.NewString()).
		Build()

	if err != nil {
		fmt.Printf("failed to build token: %s\n", err)
	}

	jwkey, err := jwk.FromRaw(privateKey)
	if err != nil {
		fmt.Printf("failed to get jwkey: %s\n", err)
	}

	if err = addHeaderToJWK(jwkey); err != nil {
		fmt.Printf("failed to add header to jwkey: %s\n", err)
	}

	signed, err := jwt.Sign(tok, jwt.WithKey(jwkey.Algorithm(), jwkey))
	if err != nil {
		log.Error().Err(err).Msg("failed to sign token with HS256")
	}

	if _, err = w.Write(signed); err != nil {
		log.Fatal().Err(err).Msg("failed to write jwks")
	}
}

func writeResponse(w http.ResponseWriter, res *response) error {
	w.Header().Set("Content-Type", "application/json")
	return json.NewEncoder(w).Encode(res)
}

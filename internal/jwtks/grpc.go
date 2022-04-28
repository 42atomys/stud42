package jwtks

import (
	context "context"
	"encoding/json"
	"fmt"
	"net"
	"time"

	"github.com/google/uuid"
	"github.com/lestrrat-go/jwx/v2/jwt"
	"github.com/rs/zerolog/log"
	"github.com/spf13/viper"
	"google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	"google.golang.org/grpc/credentials"
	status "google.golang.org/grpc/status"
)

type server struct {
	UnimplementedJWTKSServiceServer

	tokenValidity time.Duration
}

/**
 * ServeGRPC starts a GRPC server on the given port. This server
 * implements the JWTKSServiceServer interface and is used to
 * generate and validate JWT tokens. JWTKS gRPC Server is secure
 * using SSL/TLS in all environments except `DEVENV`
 * @param port The port to listen on without `:` prefix.
 */
func ServeGRPC(port *string) error {

	lis, err := net.Listen("tcp4", fmt.Sprintf(":%s", *port))
	if err != nil {
		log.Fatal().Msgf("failed to listen: %v", err)
	}

	var s *grpc.Server
	var insecure = viper.GetBool("jwtks.grpc.insecure")

	if insecure {
		log.Warn().Msg("GRPC Server is insecure, don't use in production!")
		s = grpc.NewServer()
	} else {
		creds, err := credentials.NewServerTLSFromFile(
			viper.GetString("jwtks.grpc.cert_public_key_file"),
			viper.GetString("jwtks.grpc.cert_private_key_file"),
		)
		if err != nil {
			log.Fatal().Msgf("failed to load credentials: %v", err)
		}

		s = grpc.NewServer(grpc.Creds(creds))
	}

	RegisterJWTKSServiceServer(s, &server{
		tokenValidity: 30 * 24 * time.Hour,
	})
	log.Info().Msgf("server grpc listening at %v", lis.Addr())
	return s.Serve(lis)
}

/**
 * SignPayload generates a JWT token using the JWKS strategy.
 * @param request The request containing the payload to insert into the JWT.
 * @return The Reply containing the generated JWT token and her validity.
 */
func (s *server) SignPayload(ctx context.Context, r *SignPayloadRequest) (*Reply, error) {
	var payload = make(map[string]interface{})

	if err := json.Unmarshal([]byte(r.GetPayload()), &payload); err != nil {
		return nil, status.Errorf(codes.Internal, "failed to unmarshal token: %s", err)
	}

	tok, err := jwt.NewBuilder().
		Issuer(`student-id-provider`).
		IssuedAt(time.Now()).
		Expiration(time.Now().UTC().Add(s.tokenValidity)).
		NotBefore(time.Now().UTC()).
		// Audience is not required, but it's a good idea to set it.
		// Following the spec, it should be an array of strings containing the
		// audience of the token. "{type}:{entity}:{scope}"
		Audience([]string{`user:current:private`, `app:stud42:public`}).
		// ID is required, and should be a string containing a unique identifier
		// for the token. It's recommended to use a UUID.
		// @TODO generate and set a unique ID to invalidate the token for more security.
		JwtID(uuid.NewString()).
		Build()

	for k, v := range payload {
		if err := tok.Set(k, v); err != nil {
			return nil, status.Errorf(codes.Internal, "failed to set token: %s", err)
		}
	}

	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to build token: %s", err)
	}

	jwkKey := getGlobalSigningJWK()
	signed, err := jwt.Sign(tok, jwt.WithKey(jwkKey.Algorithm(), jwkKey))
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to sign token: %s", err)
	}

	return &Reply{Token: string(signed), Valid: true}, nil
}

/**
 * ValidateToken validates a JWT token using the JWKS strategy.
 * @param request The request containing the ValidateRequest.
 * @return The Reply containing the validation result and the refresh token if needed
 */
func (s *server) ValidateToken(ctx context.Context, r *ValidateRequest) (*Reply, error) {
	var err error
	defer func() {
		if err != nil {
			log.Error().Err(err).Msg("failed to validate token")
		}
	}()

	tok, err := jwt.ParseString(r.Token, jwt.WithKeySet(GetKeySet()))
	if err != nil {
		log.Error().Err(err).Msg("failed to parse JWT")
		return nil, status.Errorf(codes.InvalidArgument, "failed to parse JWT: %s", err)
	}

	if !tok.Expiration().IsZero() && tok.Expiration().Before(time.Now().UTC()) {
		return nil, status.Errorf(codes.Unauthenticated, "token expired")
	}

	if r.Regenerate {
		tok.Expiration().Add(s.tokenValidity)

		jwkKey := getGlobalSigningJWK()
		signed, err := jwt.Sign(tok, jwt.WithKey(jwkKey.Algorithm(), jwkKey))
		if err != nil {
			return nil, status.Errorf(codes.Internal, "failed to sign token: %s", err)
		}

		return &Reply{Token: string(signed), Valid: true}, nil
	}

	return &Reply{Valid: true}, nil
}

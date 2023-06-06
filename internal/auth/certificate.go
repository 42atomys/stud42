package auth

import (
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"errors"
	"os"

	"github.com/rs/zerolog/log"
)

var (
	// privateKey contains the private key used to sign tokens.
	// Can be nil if no private key is given. In this case
	// no tokens can be generated.
	privateKey *rsa.PrivateKey
	// publicKey contains the public key used to validate tokens.
	// Can be nil if no public key is given. In this case
	// we take the public key from the private key.
	publicKey *rsa.PublicKey
)

/**
 * Loads the private and public key from the file at the given path.
 * The file must be in PEM format.
 * If no private key is given, no generation of tokens will be possible,
 * but the public key can be used to validate tokens ONLY.
 * If no public key is given, use the public key from the private key.
 */
func SetCertificates(privateKeyPath, publicKeyPath string) error {
	if privateKeyPath == "" && publicKeyPath == "" {
		return errors.New("no certificates given. At least one is required")
	}

	privateBytes, err := os.ReadFile(privateKeyPath)
	if err != nil && !errors.Is(err, os.ErrNotExist) {
		return err
	} else if err != nil && errors.Is(err, os.ErrNotExist) {
		log.Warn().Msg("No private key given, no tokens can be generated")
	}

	publicBytes, err := os.ReadFile(publicKeyPath)
	if err != nil && !errors.Is(err, os.ErrNotExist) {
		return err
	}

	return setCertificatesFromBytes(privateBytes, publicBytes)
}

/**
 * Loads the private and public key from the given bytes. The bytes
 * must be in PEM format. If no private key is given, no generation of
 * tokens will be possible, but the public key can be used to validate
 * tokens ONLY. If no public key is given, use the public key from the
 * private key.
 */
func setCertificatesFromBytes(privateKeyBytes, publicKeyBytes []byte) (err error) {
	if privateKeyBytes != nil {
		block, _ := pem.Decode(privateKeyBytes)
		privateKey, err = x509.ParsePKCS1PrivateKey(block.Bytes)
		if err != nil {
			return err
		}
	}

	if publicKeyBytes != nil {
		block, _ := pem.Decode(publicKeyBytes)
		parsedKey, err := x509.ParsePKIXPublicKey(block.Bytes)
		if err != nil {
			return err
		}

		var ok bool
		if publicKey, ok = parsedKey.(*rsa.PublicKey); !ok {
			log.Error().Err(err).Msgf("Unable to parse RSA public key, generating a temp one")
			return err
		}
	} else {
		log.Info().Msgf("No public key given, using private key to generate tokens")
		publicKey = &privateKey.PublicKey
	}

	return importRSAPRivateKey(publicKey)
}

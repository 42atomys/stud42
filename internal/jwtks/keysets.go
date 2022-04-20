package jwtks

import (
	"crypto/rsa"

	"github.com/lestrrat-go/jwx/v2/jwa"
	"github.com/lestrrat-go/jwx/v2/jwk"
)

/**
 * keysSets hold references to all the keys used to sign and validate
 * JWT Tokens.
 *
 * NOTE: Actually this Service and this endpoint can hold only one
 * key set. But for the sake of simplicity, we are using a single key
 * called `global` and we are using the `kid` field to identify the
 * key.
 */
var keySets jwk.Set = jwk.NewSet()

/**
 * AddKey adds a key to the key set. If a key with the same key ID already exists,
 * it will be overwritten.
 */
func AddKey(key jwk.Key) (err error) {
	if _, ok := keySets.Get(key.KeyID()); ok {
		return keySets.Remove(key.KeyID())
	}

	if err = addHeaderToJWK(key); err != nil {
		return
	}

	return keySets.AddKey(key)
}

/**
 * GetKeySet returns the key set.
 * If you want to modify the key set, use AddKey instead.
 */
func GetKeySet() jwk.Set {
	return keySets
}

/**
 * getGlobalSigninKey will return the global jwk Key used to
 * sign the JWT Token.
 */
func getGlobalSigningJWK() jwk.Key {
	jwkey, _ := jwk.FromRaw(privateKey)
	_ = addHeaderToJWK(jwkey)
	return jwkey
}

/**
 * addHeaderToJWK adds the default header to the JWK.
 * This is required for the JWK to be usable by the JWT library.
 */
func addHeaderToJWK(jwkey jwk.Key) (err error) {
	// @TODO: Generate a KID frm RSA
	if err = jwkey.Set(jwk.KeyIDKey, "global"); err != nil {
		return
	}

	if err = jwkey.Set(jwk.AlgorithmKey, jwa.RS256); err != nil {
		return
	}

	return
}

/**
 * importRSAPrivateKey will import a RSA private key from
 * a PEM encoded string and add it to the key set.
 */
func importRSAPRivateKey(pkey *rsa.PublicKey) (err error) {
	var jwkey jwk.Key
	if jwkey, err = jwk.FromRaw(pkey); err != nil {
		return
	}

	if err = addHeaderToJWK(jwkey); err != nil {
		return
	}

	return keySets.AddKey(jwkey)
}

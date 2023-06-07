import { getConfig, getServiceToken } from '@lib/config';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { JWTOptions } from 'next-auth/jwt';

/**
 * encodeJWT will encode a JWT token using the JWT library and the
 * JWKS client. This method map the `next-auth` encode method. It
 * takes a payload and returns a promise that resolves to a signed JWT token.
 *
 * @param token The payload to encode.
 * @returns A promise that resolves to the signed JWT token.
 */
export const encodeJWT: JWTOptions['encode'] = async ({ token, maxAge }) => {
  return fetch(getConfig().auth.endpoints.sign, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `ServiceToken ${getServiceToken()}`,
    },
    credentials: 'include',
    body: JSON.stringify({
      user_id: token?.sub,
      validity: maxAge,
      payload: {
        scopes: [],
      },
    }),
  })
    .then((r) => r.json())
    .then((r) => r.token);
};

/**
 * decodeJWT will decode a JWT token using the JWT library and the
 * JWKS client. This method map the `next-auth` decode method. It
 * takes a token and returns a promise that resolves the payload of the
 * JWT token ONLY if the token is valid.
 *
 * @param token The JWT token to decode.
 * @returns A promise that resolves to the payload of the JWT token.
 */
export const decodeJWT: JWTOptions['decode'] = async ({ token }) => {
  if (!token) return null;

  const JWTKS = createRemoteJWKSet(new URL(getConfig().auth.endpoints.sets));

  return jwtVerify(token, JWTKS, {
    algorithms: ['RS256'],
    clockTolerance: 5000,
    audience: getConfig().auth.jwk.audience,
    issuer: getConfig().auth.jwk.issuer,
  }).then((r) => r.payload);
};

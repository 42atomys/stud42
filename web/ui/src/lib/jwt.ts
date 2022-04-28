import { getConfig } from '@lib/config';
import { SignToken } from 'grpc/jwtks';
import jwt, { JwtHeader } from 'jsonwebtoken';
import JwksClient from 'jwks-rsa';
import { JWT, JWTOptions } from 'next-auth/jwt';

/**
 * encodeJWT will encode a JWT token using the JWT library and the
 * JWKS client. This method map the `next-auth` encode method. It
 * takes a payload and returns a promise that resolves to a signed JWT token.
 *
 * @param token The payload to encode.
 * @returns A promise that resolves to the signed JWT token.
 */
export const encodeJWT: JWTOptions['encode'] = async ({
  token: payload = {},
}) => {
  return (
    await SignToken({
      payload: typeof payload === 'string' ? payload : JSON.stringify(payload),
    })
  ).token;
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

  const c = JwksClient({
    jwksUri: getConfig().jwtks.endpoints.sets,
  });

  const getKey = (
    header: JwtHeader,
    callback: (_: Error | null, publicKey: string) => void
  ) => {
    c.getSigningKey(header.kid, (err, key) => {
      if (err || !key) return callback(err, '');
      callback(err, key.getPublicKey());
    });
  };

  return new Promise<JWT | null>((resolve, reject) => {
    jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded as JWT);
    });
  });
};

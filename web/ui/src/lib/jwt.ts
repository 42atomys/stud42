import config from '@config';
import { SignToken } from 'grpc/jwtks';
import jwt, { JwtHeader } from 'jsonwebtoken';
import JwksClient, { SigningKey } from 'jwks-rsa';
import { JWT, JWTOptions } from 'next-auth/jwt';

export const encodeJWT: JWTOptions['encode'] = async ({
  token: payload = {},
}) => {
  return (
    await SignToken({
      payload: typeof payload === 'string' ? payload : JSON.stringify(payload),
    })
  ).token;
};

export const decodeJWT: JWTOptions['decode'] = async ({ token }) => {
  if (!token) return null;

  console.log(config.jwks.endpoints.sets)
  const c = JwksClient({
    jwksUri: config.jwks.endpoints.sets,
  });

  const getKey = (
    header: JwtHeader,
    callback: (_: Error | null, publicKey: string) => void
  ) => {
    c.getSigningKey(header.kid, (err, key) => {
      if (err) return callback(err, "");
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

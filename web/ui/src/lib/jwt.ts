import { SignToken } from 'grpc/jwtks';
import jwt, { JwtHeader } from 'jsonwebtoken';
import JwksClient from 'jwks-rsa';
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

  const c = JwksClient({
    jwksUri: 'http://127.0.0.1:5500/jwks',
  });

  const getKey = (
    header: JwtHeader,
    callback: (_: null, publicKey: string) => void
  ) => {
    c.getSigningKey(header.kid, (err, key) => {
      callback(null, key.getPublicKey());
    });
  };

  return new Promise<JWT | null>((resolve, reject) => {
    jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded as JWT);
    });
  });
};

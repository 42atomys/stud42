import * as grpc from '@grpc/grpc-js';
import { readFileSync } from 'fs';
import { jwtks } from './jwtks';

import { getConfig } from '@lib/config';

export * from './jwtks';

/**
 * secureCredentials is a gRPC credential used to authenticate the gRPC
 * endpoint.
 */
const secureCredentials = (): grpc.ChannelCredentials => {
  const { certRootCaFile, certPrivateKeyFile, certPublicKeyFile } = getConfig().jwtks.grpc;

  return grpc.credentials.createSsl(
    certRootCaFile ? readFileSync(certRootCaFile) : null,
    certPrivateKeyFile ? readFileSync(certPrivateKeyFile) : null,
    certPublicKeyFile ? readFileSync(certPublicKeyFile) : null
  );
};

/**
 * JWTKSClient is a gRPC client used to communicate with the JWTKS service.
 */
export const JWTKSClient = new jwtks.JWTKSServiceClient(
  getConfig().jwtks.endpoints.sign,
  getConfig().jwtks.grpc.insecure ? grpc.credentials.createInsecure() : secureCredentials()
);

/**
 * SignToken is a function used to sign a JWT token. It takes a payload
 * and returns a promise that resolves to a signed JWT token.
 */
export const SignToken: SignTokenFn = async (req) => {
  return new Promise<any>((resolve, reject) => {
    JWTKSClient.SignPayload(new jwtks.SignPayloadRequest(req), (err, token) => {
      if (err) return reject(err);
      return resolve({ token: token?.token, valid: token?.valid });
    });
  });
};

/**
 * ValidateToken is a function used to validate a JWT token. It takes a
 * token and returns a promise that resolves to a validated JWT token.
 */
export const ValidateToken: ValidateTokenFn = async (req) => {
  return new Promise<any>((resolve, reject) => {
    JWTKSClient.ValidateToken(new jwtks.ValidateRequest(req), (err, token) => {
      if (err) return reject(err);
      return resolve({ token: token?.token, valid: token?.valid });
    });
  });
};

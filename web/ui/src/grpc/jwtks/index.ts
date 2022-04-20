import * as grpc from '@grpc/grpc-js';
import { readFileSync } from 'fs';
import { jwtks } from './jwtks';

import config from '@config'

export * from './jwtks';

const secure = (): grpc.ChannelCredentials => {
  return grpc.credentials.createSsl(
    readFileSync(config.jwks.certs.rootCertFile),
    readFileSync(config.jwks.certs.privateKeyFile),
    readFileSync(config.jwks.certs.publicKeyFile)
  );
};

const insecure = (): grpc.ChannelCredentials => {
  return grpc.credentials.createInsecure();
};

export const JWTKSClient = new jwtks.JWTKSServiceClient(
  config.jwks.endpoints.sign,
  config.jwks.insecure ? insecure() : secure()
);

type SignTokenFn = {
  (req: { payload: string }): Promise<{
    token: string;
    valid: boolean;
  }>;
};

export const SignToken: SignTokenFn = async (req) => {
  return new Promise<any>((resolve, reject) => {
    JWTKSClient.SignPayload(new jwtks.SignPayloadRequest(req), (err, token) => {
      if (err) return reject(err);
      return resolve({ token: token?.token, valid: token?.valid });
    });
  });
};

type ValidateTokenFn = {
  (req: { token: string; regenerate?: boolean }): Promise<{
    token: string;
    valid: boolean;
  }>;
};

export const ValidateToken: ValidateTokenFn = async (req) => {
  return new Promise<any>((resolve, reject) => {
    JWTKSClient.ValidateToken(new jwtks.ValidateRequest(req), (err, token) => {
      if (err) return reject(err);
      return resolve({ token: token?.token, valid: token?.valid });
    });
  });
};

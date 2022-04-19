import * as grpc from '@grpc/grpc-js';
import { readFileSync } from 'fs';
import { jwtks } from './jwtks';

export * from './jwtks';

const secure = (): grpc.ChannelCredentials => {
  return grpc.credentials.createSsl(
    readFileSync('/root/.local/share/mkcert/rootCA.pem'),
    readFileSync('../../certs/server-key.pem'),
    readFileSync('../../certs/server-cert.pem')
  );
};

const insecure = (): grpc.ChannelCredentials => {
  return grpc.credentials.createInsecure();
};

export const JWTKSClient = new jwtks.JWTKSServiceClient(
  'localhost:5000',
  // @ts-ignore
  process.env.NODE_ENV === 'DEVENV' ? insecure() : secure()
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

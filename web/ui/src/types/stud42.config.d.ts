declare module '@config' {
  const data: Configuration;
  export { data as Config }
  export default data;
}

type Configuration = {
  jwks: {
    endpoints: {
      sets: string
      sign: string
    }
    insecure: boolean;
    certs: {
      rootCertFile: string;
      publicKeyFile: string;
      privateKeyFile: string;
    }
  }
}
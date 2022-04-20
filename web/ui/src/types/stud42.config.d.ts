declare module '@config' {
  const data: Configuration;
  export { data as Config };
  export default data;
}

type Configuration = {
  /**
   * Configuration relating to the JWT token.
   */
  jwks: {
    /**
     * Endpoints used to retrieve the public key for the JWT token using
     * the JWKS endpoint, and signing the JWT token.
     */
    endpoints: {
      /**
       * The endpoint used to retrieve the public key for the JWT token.
       * This endpoint is a HTTP(S) endpoint. If you have access to the
       * DEVENV, you can use the public dev endpoint. Else, use the
       * `jwtks-service` configured locally.
       *
       * In production, the JWTKS endpoint is a HTTPS endpoint. Accessible
       * to the public.
       */
      sets: string;
      /**
       * The endpoint used to retrieve the public key for the JWT token.
       * This endpoint is a gRPC endpoint. In order to use this endpoint,
       * the `jwtks-service` must be running. If you have access to the DEVENV
       * you can use the public dev endpoint and set `insecure` to `true` to
       * bypass the TLS certificate check during development ONLY.
       *
       * In production, the endpoint should be `secure` and use a TLS
       * certificate. The communication with the signing server is cluster
       * specific and cannot be called from outside the cluster.
       */
      sign: string;
    };
    /**
     * Set the connection to sign gRPC Service to insecure or not.
     * In development, you can set this to `true` to bypass the TLS
     * certificate check.
     *
     * In production, this should be `false` and the TLS certificate should
     * be configured.
     */
    insecure: boolean;
    /**
     * Certificates used to authenticate the gRPC endpoint.
     */
    certs: {
      /**
       * If you use a self-signed certificate, you need to provide the
       * root CA certificate. If you use a certificate signed by a CA,
       * you can set this to `null`.
       */
      rootCertFile: string;
      /**
       * The public key of the certificate used to connect to the gRPC
       * endpoint.
       */
      publicKeyFile: string;
      /**
       * The private key of the certificate used to connect to the gRPC
       * endpoint.
       */
      privateKeyFile: string;
    };
  };
};

type Configuration = {
  /**
   * Configuration relating to the JWT token.
   */
  auth: {
    /**
     * Endpoints used to retrieve the public key for the JWT token using
     * the JWKS endpoint, and signing the JWT token.
     */
    endpoints: {
      /**
       * The endpoint used to retrieve the public key for the JWT token.
       * This endpoint is a HTTP(S) endpoint. If you have access to the
       * DEVENV, you can use the public dev endpoint. Else, use the
       * `auth-service` configured locally.
       *
       * In production, the auth endpoint is a HTTPS endpoint. Accessible
       * to the public.
       */
      sets: string;
      /**
       * The endpoint used to generate a JWT token from a user.
       * In order to use this endpoint, the `auth-service` must be running.
       * If you have access to the DEVENV you can use the public dev endpoint.
       *
       * In production, the endpoint should be `secure`.
       * The communication with the authorization server is cluster
       * specific and cannot be called from outside the cluster without the
       * proper credentials.
       */
      sign: string;
    };
  };
};

type SignTokenFn = {
  (req: { payload: string }): Promise<{
    token: string;
    valid: boolean;
  }>;
};

type ValidateTokenFn = {
  (req: { token: string; regenerate?: boolean }): Promise<{
    token: string;
    valid: boolean;
  }>;
};

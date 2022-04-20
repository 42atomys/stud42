type ErrorType =
  | 'default'
  | 'configuration'
  | 'accessdenied'
  | 'verification'
  | 'oauthcreateaccount'
  | 'oauthaccountnotlinked'
  | 'oauthcallback'
  | 'oauthsignin'
  | 'callback'
  | 'sessionrequired';

type ErrorView = {
  name: string;
  message: string;
};

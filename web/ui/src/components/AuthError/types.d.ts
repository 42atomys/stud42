type ErrorType =
  | 'default'
  | 'configuration'
  | 'accessdenied'
  | 'verification'
  | 'oauthcreateaccount'
  | 'oauthaccountnotlinked'
  | 'oauthcallback'
  | 'callback'
  | 'sessionrequired';

type ErrorView = {
  name: string;
  message: string;
};

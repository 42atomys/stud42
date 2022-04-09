type ErrorType =
  | "default"
  | "configuration"
  | "accessdenied"
  | "verification"
  | "oauthcreateaccount"
  | "oauthaccountnotlinked"
  | "oauthcallback"
  | "callback"

type ErrorView = {
  name: string;
  message: string;
}

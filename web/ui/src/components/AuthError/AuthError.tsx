export const Error = ({
  error = 'default',
}: {
  error: ErrorType | 'null' | 'undefined';
}) => {
  const errors: Record<ErrorType, ErrorView> = {
    default: {
      name: 'An error occured',
      message: 'An error occured, please try again later',
    },
    configuration: {
      name: 'Configuration error',
      message: 'The configuration of the provider is not valid',
    },
    accessdenied: {
      name: 'Access denied',
      message: "You don't have access to this page",
    },
    verification: {
      name: 'Verification error',
      message: 'The verification of the provider is not valid',
    },
    oauthcreateaccount: {
      name: 'OAuth create account error',
      message: 'An error occured while creating your account',
    },
    oauthaccountnotlinked: {
      name: 'OAuth account not linked',
      message:
        'Your account is not linked to your email. Contact support on Discord',
    },
    oauthcallback: {
      name: 'OAuth callback error',
      message: 'An error occured while linking your account',
    },
    callback: {
      name: 'Callback error',
      message: 'An error occured while processing the callback',
    },
    sessionrequired: {
      name: 'Access required',
      message: 'You need to be logged in to access this page',
    },
  };

  if (error === 'null' || error === 'undefined') error = 'default';

  const { name, message } = errors[error.toLowerCase() as ErrorType];
  return (
    <div className="bg-red-400 px-6 py-4 text-white rounded mb-10">
      <h1 className="text-lg mb-2">{name}</h1>
      <p className="text-sm text-red-800 dark:text-red-100 mb-2">{message}</p>
    </div>
  );
};

export default Error;

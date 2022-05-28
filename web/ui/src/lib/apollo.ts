import {
  ApolloClient,
  from,
  createHttpLink,
  InMemoryCache,
  QueryOptions,
  ApolloQueryResult,
  NetworkStatus,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export type ServerSideRequest = {
  cookies: NextApiRequestCookies & {
    '__s42.auth-token'?: string;
  };
};

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
  credentials: 'include',
});

const authLink = setContext((_, context) => {
  const COOKIE_NAME = '__s42.auth-token';
  let authToken = Cookies.get(COOKIE_NAME);

  if (!authToken) {
    authToken = context.authToken;
  }

  return {
    headers: {
      ...context.headers,
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  };
});

/**
 * Definition of the Apollo client used in the application.
 */
export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  version: process.env.NEXT_PUBLIC_VERSION,
  ssrMode: typeof window === 'undefined',
  connectToDevTools: process.env.NODE_ENV === 'development',
  cache: new InMemoryCache(),
  credentials: 'include',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: typeof window === 'undefined' ? 'no-cache' : 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      fetchPolicy: typeof window === 'undefined' ? 'no-cache' : 'network-only',
      errorPolicy: 'all',
    },
  },
});

/**
 * This function is used to authenticate a server-side request with the
 * Apollo client and token located in the cookies.
 */
export const queryAuthenticatedSSR = async <T = any>(
  req: ServerSideRequest,
  opts: QueryOptions<T>
): Promise<ApolloQueryResult<T>> => {
  const { query, context, ...rest } = opts;

  return apolloClient.query<T>({
    query,
    context: {
      authToken: req.cookies['__s42.auth-token'],
      ...context,
    },
    ...rest,
  });
};

/**
 * Retrieve if the current network status is a refetch event or not
 * @param networkStatus - the network status of apollo query
 */
export const isRefetching = (networkStatus: NetworkStatus): boolean => {
  return networkStatus === NetworkStatus.refetch;
};

/**
 * Check if the current network status is the first loading event or not.
 * Is very usefull to know if we need to show a loading indicator on the UI
 * when a page is loading. And to know if is necessary to show a loading
 * indicator when we just refetch a query (to prevent any blinking)
 * @param networkStatus - the network status of apollo query
 * @returns
 */
export const isFirstLoading = (networkStatus: NetworkStatus): boolean => {
  return (
    networkStatus === NetworkStatus.loading && !isRefetching(networkStatus)
  );
};

export default apolloClient;

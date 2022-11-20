import {
  ApolloClient,
  ApolloQueryResult,
  createHttpLink,
  from,
  InMemoryCache,
  NetworkStatus,
  QueryOptions,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import merge from 'deepmerge';
import Cookies from 'js-cookie';
import { useMemo } from 'react';
import { ServerSideRequest } from 'types/next';

/**
 * the token cookie name is used to store the token in the cookie and to read it
 * from the cookie
 */
const tokenCookieName = '__s42.auth-token';

// Reuse client on the client-side.
let apolloClient: ApolloClient<any>;

/**
 * Creates and configures the ApolloClient instance.
 * @returns {ApolloClient} The ApolloClient instance.
 */
const createApolloClient = () => {
  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(
        ({ message, locations, path }) =>
          new Error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
      );
  });

  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
    credentials: 'include',
  });

  const authLink = setContext((_, context) => {
    let authToken = Cookies.get(tokenCookieName);

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

  return new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    version: process.env.NEXT_PUBLIC_VERSION,
    ssrMode: typeof window === 'undefined',
    connectToDevTools: process.env.NODE_ENV === 'development',
    cache: new InMemoryCache(),
    credentials: 'include',
    defaultOptions: {},
  });
};

/**
 * Creates and initialize a new Apollo Client instance with an optional initial
 * state.
 * @param initialState The initial state to hydrate the client with.
 * @returns The new Apollo Client instance.
 */
export const initializeApollo = (initialState: any = null) => {
  const client = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    client.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return client;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = client;

  return client;
};

/** This function is used to get the initialized Apollo Client or initialize a
 * new one if it doesn't exist. The client is memorized to prevent it from
 * being reinitialized on every request on the client side with Memo.
 *
 * This is the default function to use when you want to use Apollo Client.
 */
export const useApollo = (initialState: any) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};

/**
 * This function is used to authenticate a server-side request with the
 * Apollo client and token located in the cookies.
 */
export const queryAuthenticatedSSR = async <T = any>(
  req: ServerSideRequest,
  opts: QueryOptions<T>
): Promise<ApolloQueryResult<T>> => {
  const { query, context, ...rest } = opts;
  const client = createApolloClient();

  const token =
    typeof req.cookies?.get === 'function'
      ? req.cookies.get(tokenCookieName)
      : // @ts-ignore
        req.cookies[tokenCookieName];

  return client.query<T, any>({
    query,
    context: {
      authToken: token,
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
 * Retrieve if the current network status is a first loading event or if
 * the loading state is due to a page change (or a variable change)
 * @param networkStatus - the network status of apollo query
 */
export const isFetchLoading = (networkStatus: NetworkStatus): boolean => {
  return (
    networkStatus === NetworkStatus.loading ||
    networkStatus === NetworkStatus.setVariables
  );
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

export default useApollo;

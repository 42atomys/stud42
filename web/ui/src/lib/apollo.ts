import {
  ApolloClient,
  from,
  createHttpLink,
  InMemoryCache,
  QueryOptions,
  ApolloQueryResult,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { IncomingMessage } from 'http';
import Cookies from 'js-cookie';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

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

  const modifiedHeader = {
    headers: {
      ...context.headers,
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  };
  return modifiedHeader;
});

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

type ServerSideRequest = IncomingMessage & {
  cookies: NextApiRequestCookies & {
    '__s42.auth-token'?: string;
  };
};

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

export default apolloClient;

import {
  ApolloClient,
  from,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
  credentials: 'include',
});

const authLink = setContext(async (_, { headers }: { headers: Headers }) => {
  const COOKIE_NAME = 'next-auth.session-token';
  const authToken = Cookies.get(COOKIE_NAME);

  const modifiedHeader = {
    headers: {
      ...headers,
      authorization: authToken ? `Bearer ${authToken}` : '',
    },
  };
  return modifiedHeader;
});

export const apolloClient = new ApolloClient({
  link: from([authLink, httpLink]),
  name: 'interface',
  version: process.env.NEXT_PUBLIC_VERSION,
  ssrMode: true,
  connectToDevTools: process.env.NODE_ENV === 'development',
  cache: new InMemoryCache(),
  credentials: 'include',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;

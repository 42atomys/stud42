import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import Cookies from 'js-cookie';

import '../styles/globals.css';
import { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';

const COOKIE_NAME = 'next-auth.session-token';
const authToken = Cookies.get(COOKIE_NAME);

const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
  name: 'dashboard',
  version: process.env.NEXT_PUBLIC_VERSION,
  ssrMode: true,
  connectToDevTools: process.env.NODE_ENV === 'development',
  cache: new InMemoryCache(),
  credentials: 'include',
  headers: {
    authorization: authToken ? `Bearer ${authToken}` : '',
  },
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

const Interface = ({
  Component,
  session,
  pageProps,
}: AppProps & {
  Component: NextComponentType<NextPageContext, any, {}>;
} & SessionProviderProps) => {
  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={true}
      refetchInterval={60}
    >
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
};

export default Interface;

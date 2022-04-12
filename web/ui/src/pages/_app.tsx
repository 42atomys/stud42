import { ApolloProvider } from '@apollo/client';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';

import '../styles/globals.css';
import { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import apolloClient from '@lib/apollo';

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

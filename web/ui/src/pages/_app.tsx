import { ApolloProvider } from '@apollo/client';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';

import '../styles/globals.css';
import { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import apolloClient from '@lib/apollo';
import Script from 'next/script';

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
      <Script
        src="https://kit.fontawesome.com/a8d6f88c41.js"
        crossOrigin="anonymous"
      ></Script>
    </SessionProvider>
  );
};

export default Interface;

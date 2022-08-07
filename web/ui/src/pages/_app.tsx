import { ApolloProvider } from '@apollo/client';
import useNotification from '@components/Notification';
import apolloClient from '@lib/apollo';
import { NextComponentType, NextPageContext } from 'next';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { AppProps } from 'next/app';
import Script from 'next/script';
import '../styles/globals.css';

const Interface = ({
  Component,
  session,
  pageProps,
}: AppProps & {
  Component: NextComponentType<NextPageContext, any, {}>;
} & SessionProviderProps) => {
  const { NotificationProvider, NotificationContainer } = useNotification();

  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={true}
      refetchInterval={60}
    >
      <ApolloProvider client={apolloClient}>
        <NotificationProvider>
          <Component {...pageProps} />
          <NotificationContainer />
        </NotificationProvider>
      </ApolloProvider>
      <Script
        src="https://kit.fontawesome.com/a8d6f88c41.js"
        crossOrigin="anonymous"
      ></Script>
    </SessionProvider>
  );
};

export default Interface;

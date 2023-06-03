import { ApolloProvider } from '@apollo/client';
import { MeProvider } from '@ctx/currentUser';
import { NotificationProvider, useNotification } from '@ctx/notifications';
import { useApollo } from '@lib/apollo';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { AppProps } from 'next/app';
import Script from 'next/script';
import React, { useMemo } from 'react';
import '../styles/globals.css';

const InteractiveApp: React.FC<
  React.PropsWithChildren<{
    initialApolloState?: unknown;
    session?: SessionProviderProps['session'];
  }>
> = ({ initialApolloState, session, children }) => {
  const { addNotification } = useNotification();
  const apolloClient = useApollo(initialApolloState, { addNotification });

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <MeProvider apolloClient={apolloClient} session={session}>
          {children}
        </MeProvider>
      </ApolloProvider>
    </SessionProvider>
  );
};

const Interface = ({
  Component,
  pageProps: props = {},
}: AppProps & SessionProviderProps) => {
  const { initialApolloState, session, ...pageProps } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const MemorizedComponent = useMemo(() => Component, [pageProps]);

  // Use the layout defined at the page level, if available
  const getLayout = MemorizedComponent.getLayout || ((page) => page);

  return (
    <>
      <NotificationProvider>
        <InteractiveApp
          initialApolloState={initialApolloState}
          session={session}
        >
          {getLayout(<MemorizedComponent {...pageProps} />)}
        </InteractiveApp>
      </NotificationProvider>
      <Script
        src="https://kit.fontawesome.com/a8d6f88c41.js"
        crossOrigin="anonymous"
        data-auto-replace-svg="nest"
      ></Script>
    </>
  );
};

//! Disable server side session fetching due to next-auth latency issues
// Interface.getServerSideProps = async (context: GetServerSidePropsContext) => {
//   const session = await getServerSession(context.req, context.res, nextAuthOptions);
//   return { session };
// };

export default Interface;

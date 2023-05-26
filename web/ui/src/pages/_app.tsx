import { ApolloProvider } from '@apollo/client';
import useNotification from '@components/Notification';
import { MeProvider } from '@ctx/currentUser';
import { useApollo } from '@lib/apollo';
import { SessionProviderProps, getSession } from 'next-auth/react';
import { AppContext, AppProps } from 'next/app';
import Script from 'next/script';
import { useMemo } from 'react';
import '../styles/globals.css';

const Interface = ({
  Component,
  session,
  pageProps: props = {},
}: AppProps & SessionProviderProps) => {
  const { initialApolloState, ...pageProps } = props;
  const apolloClient = useApollo(initialApolloState);

  const { NotificationProvider, NotificationContainer } = useNotification();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const MemorizedComponent = useMemo(() => Component, [pageProps]);

  // Use the layout defined at the page level, if available
  const getLayout = MemorizedComponent.getLayout || ((page) => page);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <MeProvider apolloClient={apolloClient} session={session}>
          <NotificationProvider>
            {getLayout(<MemorizedComponent {...pageProps} />)}
            <NotificationContainer />
          </NotificationProvider>
        </MeProvider>
      </ApolloProvider>
      <Script
        src="https://kit.fontawesome.com/a8d6f88c41.js"
        crossOrigin="anonymous"
        data-auto-replace-svg="nest"
      ></Script>
    </>
  );
};

Interface.getInitialProps = async ({ ctx }: AppContext) => {
  const session = await getSession(ctx);
  return { session };
};

export default Interface;

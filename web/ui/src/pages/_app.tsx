import { ApolloProvider } from '@apollo/client';
import useNotification from '@components/Notification';
import { Theme } from '@graphql.d';
import { useApollo } from '@lib/apollo';
import useSettings, { useTheme } from '@lib/useSettings';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { useMemo } from 'react';
import '../styles/globals.css';

const Interface = ({
  Component,
  session,
  pageProps: props,
}: AppProps & SessionProviderProps) => {
  const { initialApolloState, ...pageProps } = props;
  const apolloClient = useApollo(initialApolloState);

  const { NotificationProvider, NotificationContainer } = useNotification();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const MemorizedComponent = useMemo(() => Component, [pageProps]);
  const [settings] = useSettings({ apolloClient });
  useTheme(settings.theme || Theme.AUTO);

  // Use the layout defined at the page level, if available
  const getLayout = MemorizedComponent.getLayout || ((page) => page);

  return (
    <SessionProvider
      session={session}
      refetchOnWindowFocus={true}
      refetchInterval={60}
    >
      <ApolloProvider client={apolloClient}>
        <NotificationProvider>
          {getLayout(<MemorizedComponent {...pageProps} />)}
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

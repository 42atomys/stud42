import { ApolloProvider } from '@apollo/client';
import { MeProvider } from '@ctx/currentUser';
import { NotificationProvider, useNotification } from '@ctx/notifications';
import { useApollo } from '@lib/apollo';
import { AppProps } from 'next/app';
import Script from 'next/script';
import { useMemo } from 'react';
import '../styles/globals.css';

const Interface = ({ Component, pageProps: props = {} }: AppProps) => {
  const { initialApolloState, ...pageProps } = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const MemorizedComponent = useMemo(() => Component, [pageProps]);

  // Use the layout defined at the page level, if available
  const getLayout = MemorizedComponent.getLayout || ((page) => page);

  const { addNotification } = useNotification();
  const apolloClient = useApollo(initialApolloState, { addNotification });

  return (
    <>
      <NotificationProvider>
        <ApolloProvider client={apolloClient}>
          <MeProvider apolloClient={apolloClient}>
            {getLayout(<MemorizedComponent {...pageProps} />)}
          </MeProvider>
        </ApolloProvider>
      </NotificationProvider>
      <Script
        src="https://kit.fontawesome.com/a8d6f88c41.js"
        crossOrigin="anonymous"
        data-auto-replace-svg="nest"
      ></Script>
    </>
  );
};

export default Interface;

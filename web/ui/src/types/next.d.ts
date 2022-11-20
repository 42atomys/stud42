import type {
  GetServerSidePropsContext,
  NextComponentType,
  NextPageContext,
} from 'next';
import type { Session } from 'next-auth';
import type { Router } from 'next/router';
import { NextRequest } from 'next/server';

export type ServerSideRequest = NextRequest | GetServerSidePropsContext['req'];

declare module 'next' {
  type NextPage<P = {}, IP = P> = React.ComponentType<P> & {
    getInitialProps?(context: NextPageContext): IP | Promise<IP>;
    getLayout?: (page: ReactElement) => ReactNode;
  };
}
declare module 'next/app' {
  type AppProps<P = Record<string, unknown>> = {
    Component: NextComponentType<NextPageContext, any, P> & {
      getLayout?: (page: ReactElement) => ReactNode;
    };
    router: Router;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    pageProps: P & {
      /** Initial session passed in from `getServerSideProps` or `getInitialProps` */
      session?: Session;
    };
  };
}

import {
  Feature,
  MeWithFeaturesDocument,
  MeWithFeaturesQuery,
} from '@graphql.d';
import { queryAuthenticatedSSR } from '@lib/apollo';
import { NextMiddleware, NextResponse } from 'next/server';

export const middleware: NextMiddleware = async (req) => {
  const { pathname } = req.nextUrl.clone();

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/discord')
  ) {
    return NextResponse.next();
  }

  const { data } = await queryAuthenticatedSSR<MeWithFeaturesQuery>(req, {
    query: MeWithFeaturesDocument,
  });

  if (pathname.startsWith('/auth') && data) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!data) {
    return NextResponse.redirect(
      new URL(
        '/auth/signin?callbackUrl=' + encodeURIComponent(pathname),
        req.url
      )
    );
  }

  const { features = [] } = data?.me || {};
  if (
    features.includes(Feature.ALPHA_ACCESS) ||
    features.includes(Feature.BETA_ACCESS)
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/discord', req.url));
};

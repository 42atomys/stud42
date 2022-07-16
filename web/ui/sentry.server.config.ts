// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { BrowserTracing } from '@sentry/tracing';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new BrowserTracing()],
    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 0,
    sampleRate: 1,
    // ...
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
    release: `stud42@${process.env.APP_VERSION || 'dev'}`,
    environment: process.env.NODE_ENV,
  });
}

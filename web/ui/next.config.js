/** @type {import('next').NextConfig} */

const path = require('path');
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  images: {
    domains: ['cdn.intra.42.fr', 'cdn.jsdelivr.net'],
    minimumCacheTTL: 300,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  publicRuntimeConfig: {
    appVersion: process.env.APP_VERSION || 'indev',
  },

  output: 'standalone',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },

  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
  },

  webpack: (config, options) => {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test?.('.svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.tsx?$/,
      include: [options.dir],
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@svgr/webpack',
          options: { babel: false },
        },
      ],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: [
        {
          loader: 'yaml-loader',
          options: {
            asJSON: true,
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    // Configure watch mode for webpack to work with docker volumes on Windows
    // and MacOS. Avoid watching node_modules to improve performance and avoid
    // unnecessary rebuilds.
    config.watchOptions = {
      ignored: /node_modules/,
      followSymlinks: true,
      poll: 1000,
      aggregateTimeout: 300,
    };

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  org: 'stud42',
  project: 'interface',

  silent: false, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.

  authToken: process.env.SENTRY_AUTH_TOKEN,
  include: 'src/*',
  ignore: ['node_modules', 'webpack.config.js'],
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);

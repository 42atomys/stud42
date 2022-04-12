import GraphQLAdapter from '@lib/GraphqlAdapter';
import NextAuth from 'next-auth';
import FortyTwoProvider from 'next-auth/providers/42-school';
import GithubProvider from 'next-auth/providers/github';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // @ts-ignore
  adapter: GraphQLAdapter(),
  // https://next-auth.js.org/configuration/providers
  providers: [
    FortyTwoProvider({
      clientId: process.env.FORTY_TWO_CLIENT_ID as string,
      clientSecret: process.env.FORTY_TWO_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
      // @ts-ignore
      scope: 'user,user:email,user:follow',
    }),
  ],
  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET_KEY,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout', // Displays form with sign out button
    error: '/auth/signin', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn({ user, account, profile }) {
      // Extend account with additional profile data to be saved to database
      // with linkAccount function on adapter
      account._profile = profile;

      if (account.provider == '42-school') {
        user.duo = {
          id: profile.id,
          login: profile.login,
          firstName: profile.first_name,
          lastName: profile.last_name,
          usualFirstName: profile.usual_first_name,
          poolYear: profile.pool_year,
          poolMonth: profile.pool_month,
          phone: profile.phone,
        };
        return true;
      } else if (account.provider == 'github') {
        user.github = {
          id: profile.id,
          login: profile.login,
          type: profile.type,
        };
        return true;
      }

      return false;
    },

    async session({ session, user, token }) {
      const { user: userToken, ...rest } = token;
      session.user = user || userToken;
      if (token) session.token = rest;
      return session;
    },

    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: false,
});

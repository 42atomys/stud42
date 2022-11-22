import type { Adapter } from 'next-auth/adapters';

/**
 * `createVerificationToken` and `useVerificationToken` are omitted because they
 * are not used in this adapter. This is because the `next-auth` library uses
 * it to create a verification token for a user and enable the support of
 * email / passwordless sign in.
 *
 * `deleteUser` and `unlinkAccount` are omitted because they are not actually
 * implemented in the `next-auth` library.
 * @see https://next-auth.js.org/tutorials/creating-a-database-adapter#unimplemented-methods
 *
 * `createSession`, `getSessionAndUser`, `updateSession` and `deleteSession`
 * are omitted because they are not used in this adapter due
 * to the fact that we are using JWT tokens for authentication.
 *
 * `updateUser` are omitted because it is not used in this adapter due to the fact
 * that we are using JWT tokens for authentication. This is only required for
 * email authentication.
 */
export type S42Adapter = Omit<
  Adapter,
  | 'createSession'
  | 'updateUser'
  | 'getSessionAndUser'
  | 'updateSession'
  | 'deleteSession'
  | 'createVerificationToken'
  | 'useVerificationToken'
  | 'deleteUser'
  | 'unlinkAccount'
>;

/**
 * EmailVerifiedOverride is used to surcharge the `AdapterUser` type from the
 * `next-auth` library. The surcharge the `emailVerified` property
 * to be able to work with your custom implementation
 */
interface EmailVerifiedOverride {
  user: {
    emailVerified: null;
  };
}

/**
 * DuoContext is used to store Duo context from the 42 API during the
 * oauth2 authentication process.
 */
export interface DuoContext {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  usualFirstName: string;
  poolYear: string;
  poolMonth: string;
  imageUrl: string;
  imageSmallUrl: string;
  phone: string;
  isStaff: boolean;
  currentCampusID: number;
}

export interface GithubContext {
  id: number;
  login: string;
  type: 'User' | 'Organization' | 'Bot' | 'Enterprise';
}

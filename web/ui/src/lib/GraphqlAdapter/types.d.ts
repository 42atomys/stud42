import type { Adapter, AdapterUser } from 'next-auth/adapters';

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
 * S42AdapterUser is the type of the user returned by the S42 adapter.
 * It is the same as the `AdapterUser` type from the `next-auth` library extended
 * with the `duo` property.
 */
export interface S42AdapterUser extends AdapterUser {
  // The `duo` property is used to store Duo context.
  duo?: DuoContext;
  // The `github` property is used to store GitHub context.
  github?: GithubContext
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
  phone: string;
}

export interface GithubContext {
  id: number;
  login: string;
  type: "User" | "Organization" | "Bot" | "Enterprise";
}
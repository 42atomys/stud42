import { UserDataFragment } from '@graphql.d';
import { DuoContext, GithubContext } from '@lib/GraphqlAdapter';
import {
  DefaultSession,
  DefaultAccount,
  DefaultUser,
  DefaultProfile,
} from 'next-auth';

interface Session extends DefaultSession {
  user: JWT['user'];
  token: Omit<JWT, 'user'>;
}

interface User extends Record<string, unknown>, DefaultUser {}

interface Profile extends Record<string, unknown>, DefaultProfile {}

interface Account extends Record<string, unknown>, DefaultAccount {
  _profile?: Profile & {
    login: string;
  };
}

interface JWT {
  sub: string;
  iat: number;
  exp: number;
  jti: string;
  user: UserDataFragment;
}

declare module 'next-auth' {
  export type { Account, Profile, Session, User };

  export interface AdapterUser extends User {
    id: string;
    // The `duo` property is used to store Duo context.
    duo?: DuoContext;
    // The `github` property is used to store GitHub context.
    github?: GithubContext;
  }

  export interface Adapter {
    createUser: (user: Omit<AdapterUser, 'id'>) => Awaitable<AdapterUser>;
    getUser: (id: string) => Awaitable<AdapterUser | null>;
    getUserByEmail: (email: string) => Awaitable<AdapterUser | null>;
    getUserByAccount: (
      providerAccountId: Pick<Account, 'provider' | 'providerAccountId'>
    ) => Awaitable<AdapterUser | null>;
    linkAccount: (
      account: Account
    ) => Promise<void> | Awaitable<Account | null | undefined>;
  }
}

declare module 'next-auth/jwt' {
  export { JWT };
}

declare module 'next-auth' {
  export interface AdapterUser extends User {
    id: string;
    // The `duo` property is used to store Duo context.
    duo?: DuoContext;
    // The `github` property is used to store GitHub context.
    github?: GithubContext;
  }

  export interface Adapter {
    createUser: (user: Omit<AdapterUser, 'id'>) => Awaitable<AdapterUser>;
    getUser: (id: string) => Awaitable<AdapterUser | null>;
    getUserByEmail: (email: string) => Awaitable<AdapterUser | null>;
    getUserByAccount: (
      providerAccountId: Pick<Account, 'provider' | 'providerAccountId'>
    ) => Awaitable<AdapterUser | null>;
    linkAccount: (
      account: Account
    ) => Promise<void> | Awaitable<Account | null | undefined>;
  }
}

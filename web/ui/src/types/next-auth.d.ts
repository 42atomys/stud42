import { DuoContext, GithubContext } from '@lib/GraphqlAdapter';
import { DefaultSession, Profile, User } from 'next-auth';

interface DuoProfile extends Profile {
  campus_users: {
    is_primary: boolean;
    campus_id: number;
  }[];
}

interface JWT {
  aud: [string];
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  sub: string;
  [key: string]: any;
}

declare module 'next-auth' {
  import {
    Account as DefaultAccount,
    Profile as DefaultProfile,
  } from 'next-auth';
  export interface Profile extends Record<string, any>, DefaultProfile {}

  export interface Account extends Record<string, any>, DefaultAccount {
    _profile?: Profile & {
      login: string;
    };
  }

  export interface Session extends Omit<DefaultSession, 'user'> {
    token: JWT;
  }
  export interface AdapterUser extends AdapterUser {
    id: string;
    // The `duo` property is used to store Duo context.
    duo?: DuoContext;
    // The `github` property is used to store GitHub context.
    github?: GithubContext;
  }
}

declare module 'next-auth/adapters' {
  export interface AdapterAccount extends Account {
    _profile?: Profile & {
      login: string;
    };
  }
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
      providerAccountId: Pick<AdapterAccount, 'provider' | 'providerAccountId'>,
    ) => Awaitable<AdapterUser | null>;

    linkAccount: (
      account: AdapterAccount,
    ) => Promise<void> | Awaitable<AdapterAccount | null | undefined>;
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
      providerAccountId: Pick<Account, 'provider' | 'providerAccountId'>,
    ) => Awaitable<AdapterUser | null>;
    linkAccount: (
      account: Account,
    ) => Promise<void> | Awaitable<Account | null | undefined>;
  }
}

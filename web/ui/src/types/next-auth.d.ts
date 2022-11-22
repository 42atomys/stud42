import { DuoContext, GithubContext } from '@lib/GraphqlAdapter';
import { JwtPayload } from 'jsonwebtoken';
import {
  DefaultAccount,
  DefaultProfile,
  DefaultSession,
  DefaultUser,
} from 'next-auth';

interface Session extends Omit<DefaultSession, 'user'> {
  token: JWT;
}

interface User extends Record<string, unknown>, DefaultUser {}

interface Profile extends Record<string, unknown>, DefaultProfile {}

interface DuoProfile extends Profile {
  campus_users: {
    is_primary: boolean;
    campus_id: number;
  }[];
}

interface Account extends Record<string, unknown>, DefaultAccount {
  _profile?: Profile & {
    login: string;
  };
}

interface JWT extends JwtPayload {
  aud: [string];
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  sub: string;
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

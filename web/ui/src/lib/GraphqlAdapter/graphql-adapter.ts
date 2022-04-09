import request from 'graphql-request';
import { Account } from 'next-auth';
import type { AdapterUser } from 'next-auth/adapters';
import type { DuoContext, S42Adapter, S42AdapterUser } from './types';
import {
  internalGetUserQuery,
  internalGetUserByEmailQuery,
  internalGetUserByAccountQuery,
  internalLinkAccountMutation,
  internalCreateUserMutation,
} from '@gql/definitions.gql';

const url = 'http://localhost:4000/query';

const providerMap: Record<string, string> = {
  github: 'GITHUB',
  '42-school': 'DUO',
};

/**
 * for Adapter workflows please see the README file of the current folder
 * @see https://github.com/42Atomys/stud42/blob/main/web/ui/src/lib/GraphqlAdapter/README.md
 * @returns {Promise<S42Adapter>}
 */
export const GraphQLAdapter = (): S42Adapter => {
  return {
    /**
     * createUser is called when a user as successfully authenticated and is
     * about to be created because no user with the given email address was found.
     * @param user sended by the `next-auth` library
     */
    createUser: async (user: Omit<AdapterUser, 'id'>): Promise<AdapterUser> => {
      if (!user.duo) {
        throw new Error('User must have a DuoContext');
      }

      try {
        const typedUser = user as S42AdapterUser & { duo: DuoContext };
        const data: { createUser: string } = await request(
          url,
          internalCreateUserMutation,
          {
            email: typedUser.email,
            duoID: typedUser.duo.id,
            duoLogin: typedUser.duo.login,
            firstName: typedUser.duo.firstName,
            usualFirstName: typedUser.duo.usualFirstName,
            lastName: typedUser.duo.lastName,
            poolYear: typedUser.duo.poolYear,
            poolMonth: typedUser.duo.poolMonth,
            phone: typedUser.duo.phone,
          }
        );
        return {
          id: data.createUser as string,
          emailVerified: null,
          ...user,
        };
      } catch (error) {
        return { ...user, id: '', emailVerified: null };
      }
    },

    /**
     * getUser is called when a user is already authenticated and is about to be
     * retrieved from the database before continueing the authentication process.
     */
    getUser: async (id: string): Promise<AdapterUser | null> => {
      try {
        const { user }: { user: (AdapterUser & DuoContext) | {} } =
          await request(url, internalGetUserQuery, { id });
        return user as AdapterUser & DuoContext;
      } catch (error) {
        return null;
      }
    },

    /**
     * getUserByEmail is called when a user is about to be retrieved from the
     * database by email address when no account is founded for the given
     * provider. Its used to link accounts from different providers.
     */
    getUserByEmail: async (email: string): Promise<AdapterUser | null> => {
      try {
        const { user }: { user: (AdapterUser & DuoContext) | {} } =
          await request(url, internalGetUserByEmailQuery, { email });
        return user as AdapterUser & DuoContext;
      } catch (error) {
        return null;
      }
    },

    /**
     * getUserByAccount is called when a user is about to be retrieved from the
     * database by her provider account.
     */
    getUserByAccount: async ({
      providerAccountId,
      provider,
    }: Pick<
      Account,
      'provider' | 'providerAccountId'
    >): Promise<AdapterUser | null> => {
      try {
        const { user }: { user: (AdapterUser & DuoContext) | {} } =
          await request(url, internalGetUserByAccountQuery, {
            provider: providerMap[provider],
            providerAccountId,
          });
        return user as AdapterUser & DuoContext;
      } catch (error) {
        return null;
      }
    },

    /**
     * linkAccount is called when an account needs to be linked to an existing
     * user. This is used when a user is already authenticated or not and is
     * about to be linked to an account from a different provider.
     */
    linkAccount: async (
      account: Account
    ): Promise<Account | null | undefined> => {
      try {
        const { provider, ...accountData } = account;
        const { linkAccount }: { linkAccount: any | {} } = await request(
          url,
          internalLinkAccountMutation,
          {
            provider: providerMap[account.provider],
            ...accountData,
          }
        );

        return {
          provider: linkAccount.provider,
          providerAccountId: linkAccount.providerAccountId,
          type: linkAccount.type,
          userId: linkAccount.user.id,
        };
      } catch (error) {
        return null;
      }
    },
  };
};

export default GraphQLAdapter;

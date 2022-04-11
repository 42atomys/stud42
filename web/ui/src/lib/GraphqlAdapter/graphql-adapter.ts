import request from 'graphql-request';
import { Account } from 'next-auth';
import type { AdapterUser } from 'next-auth/adapters';
import type {
  DuoContext,
  EmailVerifiedOverride,
  S42Adapter,
  S42AdapterUser,
} from './types';
import {
  InternalCreateUserDocument,
  InternalCreateUserMutation,
  InternalCreateUserMutationVariables,
  InternalGetUserByAccountDocument,
  InternalGetUserByAccountQuery,
  InternalGetUserByAccountQueryVariables,
  InternalGetUserByEmailDocument,
  InternalGetUserByEmailQuery,
  InternalGetUserByEmailQueryVariables,
  InternalGetUserDocument,
  InternalGetUserQuery,
  InternalGetUserQueryVariables,
  InternalLinkAccountDocument,
  InternalLinkAccountMutation,
  InternalLinkAccountMutationVariables,
  Provider,
} from '@graphql.d';
import { ProviderType } from 'next-auth/providers';
import { captureException } from '@sentry/nextjs';

const url = 'http://localhost:4000/graphql';

const providerMap: Record<string, Provider> = {
  github: Provider.GITHUB,
  '42-school': Provider.DUO,
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

        const { internalCreateUser: uuid } = await request<
          InternalCreateUserMutation,
          InternalCreateUserMutationVariables
        >(url, InternalCreateUserDocument, {
          email: typedUser.email as string,
          duoID: typedUser.duo.id,
          duoLogin: typedUser.duo.login,
          firstName: typedUser.duo.firstName,
          usualFirstName: typedUser.duo.usualFirstName,
          lastName: typedUser.duo.lastName,
          poolYear: typedUser.duo.poolYear,
          poolMonth: typedUser.duo.poolMonth,
          phone: typedUser.duo.phone,
        });

        return {
          id: uuid,
          emailVerified: null,
          ...user,
        };
      } catch (error: any) {
        captureException(error)
        throw error
        return { ...user, id: '', emailVerified: null };
      }
    },

    /**
     * getUser is called when a user is already authenticated and is about to be
     * retrieved from the database before continueing the authentication process.
     */
    getUser: async (id: string): Promise<AdapterUser | null> => {
      try {
        const { user } = await request<
          InternalGetUserQuery & EmailVerifiedOverride,
          InternalGetUserQueryVariables
        >(url, InternalGetUserDocument, { id });

        return user;
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
        const { user } = await request<
          InternalGetUserByEmailQuery & EmailVerifiedOverride,
          InternalGetUserByEmailQueryVariables
        >(url, InternalGetUserByEmailDocument, { email });
        return user;
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
        const { user } = await request<
          InternalGetUserByAccountQuery & EmailVerifiedOverride,
          InternalGetUserByAccountQueryVariables
        >(url, InternalGetUserByAccountDocument, {
          provider: providerMap[provider],
          providerAccountId,
        });
        return user;
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
        const { internalLinkAccount: acc } = await request<
          InternalLinkAccountMutation,
          InternalLinkAccountMutationVariables
        >(url, InternalLinkAccountDocument, {
          provider: providerMap[account.provider],
          providerAccountId: account.providerAccountId,
          access_token: account.access_token || "",
          refresh_token: account.refresh_token,
          scope: account.scope || "",
          token_type: account.token_type || "",
          userId: account.userId,
          expire_at: account.expires_at,
        });

        return {
          provider: acc.provider,
          providerAccountId: acc.providerAccountId,
          type: acc.type as ProviderType,
          userId: acc.user.id,
        };
      } catch (error) {
        captureException(error)
        return null;
      }
    },
  };
};

export default GraphQLAdapter;

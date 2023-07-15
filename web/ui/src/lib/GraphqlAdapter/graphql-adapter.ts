import {
  AccountProvider,
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
} from '@graphql.d';
import { getServiceToken } from '@lib/config';
import { captureException } from '@sentry/nextjs';
import request from 'graphql-request';
import { AdapterAccount, AdapterUser } from 'next-auth/adapters';
import { ProviderType } from 'next-auth/providers';
import type { DuoContext, S42Adapter } from './types';

const manualproviderMap = {
  '42-school': AccountProvider.DUO,
} as { [key: string]: AccountProvider };

const providerMap = (name: string): AccountProvider => {
  const provider = Object.keys(AccountProvider).find(
    (key) => key.toUpperCase() === name.toUpperCase(),
  );
  if (provider) {
    return AccountProvider[provider as keyof typeof AccountProvider];
  }

  if (!manualproviderMap[name]) {
    throw new Error(`Unknown provider ${name}`);
  }

  return manualproviderMap[name];
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
        const typedUser = user as Omit<AdapterUser, 'id'> & { duo: DuoContext };

        const { internalCreateUser: uuid } = await request<
          InternalCreateUserMutation,
          InternalCreateUserMutationVariables
        >(
          process.env.NEXT_PUBLIC_GRAPHQL_API!,
          InternalCreateUserDocument,
          {
            email: typedUser.email as string,
            duoID: typedUser.duo.id,
            duoLogin: typedUser.duo.login,
            firstName: typedUser.duo.firstName,
            usualFirstName: typedUser.duo.usualFirstName,
            lastName: typedUser.duo.lastName,
            duoAvatarURL: typedUser.duo.imageUrl,
            duoAvatarSmallURL: typedUser.duo.imageSmallUrl,
            poolYear: typedUser.duo.poolYear,
            poolMonth: typedUser.duo.poolMonth,
            phone: typedUser.duo.phone,
            isStaff: typedUser.duo.isStaff,
            currentDuoCampusID: typedUser.duo.currentCampusID,
          },
          { Authorization: `ServiceToken ${getServiceToken()}` },
        );

        return {
          id: uuid,
          ...user,
          emailVerified: null,
        };
      } catch (error: any) {
        captureException(error);
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
          InternalGetUserQuery & { user: AdapterUser },
          InternalGetUserQueryVariables
        >(
          process.env.NEXT_PUBLIC_GRAPHQL_API!,
          InternalGetUserDocument,
          { id },
          { Authorization: `ServiceToken ${getServiceToken()}` },
        );

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
          InternalGetUserByEmailQuery & { user: AdapterUser },
          InternalGetUserByEmailQueryVariables
        >(
          process.env.NEXT_PUBLIC_GRAPHQL_API!,
          InternalGetUserByEmailDocument,
          { email },
          { Authorization: `ServiceToken ${getServiceToken()}` },
        );
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
      AdapterAccount,
      'provider' | 'providerAccountId'
    >): Promise<AdapterUser | null> => {
      try {
        const { user } = await request<
          InternalGetUserByAccountQuery & { user: AdapterUser },
          InternalGetUserByAccountQueryVariables
        >(
          process.env.NEXT_PUBLIC_GRAPHQL_API!,
          InternalGetUserByAccountDocument,
          {
            provider: providerMap(provider),
            providerAccountId,
          },
          { Authorization: `ServiceToken ${getServiceToken()}` },
        );
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
      account: AdapterAccount,
    ): Promise<AdapterAccount | null | undefined> => {
      try {
        if (!account._profile?.login) {
          const err = new Error('Account must have a login');
          captureException(err);
          throw err;
        }

        const { internalLinkAccount: acc } = await request<
          InternalLinkAccountMutation,
          InternalLinkAccountMutationVariables
        >(
          process.env.NEXT_PUBLIC_GRAPHQL_API!,
          InternalLinkAccountDocument,
          {
            provider: providerMap(account.provider),
            providerAccountId: account.providerAccountId,
            username: account._profile.login,
            access_token: account.access_token || '',
            refresh_token: account.refresh_token,
            scope: account.scope || '',
            token_type: account.token_type?.toLocaleLowerCase() || 'bearer',
            userId: account.userId,
            expire_at: account.expires_at,
          },
          { Authorization: `ServiceToken ${getServiceToken()}` },
        );

        return {
          provider: acc.provider,
          providerAccountId: acc.providerAccountId,
          username: acc.username,
          type: acc.type.toLowerCase() as ProviderType,
          userId: acc.user.id,
        };
      } catch (error) {
        captureException(error);
        return null;
      }
    },
  };
};

export default GraphQLAdapter;

import { ApolloQueryResult } from '@apollo/client';
import { ConditionalWrapper } from '@components/ConditionalWrapper';
import {
  MeQuery,
  SettingsInput,
  Theme,
  User,
  useMeLazyQuery,
  useUpdateSettingsMutation,
} from '@graphql.d';
import { useSession } from 'next-auth/react';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNotification } from './notifications';
import type { MeContextValue, MeProviderProps } from './types';

const MeContext = createContext<MeContextValue>({
  me: { settings: {} } as MeQuery['me'],
  myFollowings: {} as MeQuery['myFollowings'],
  refetchMe: () => Promise.resolve({} as ApolloQueryResult<MeQuery>),
  updateSettings: () => Promise.resolve(),
  isMe: () => false,
  isFollowed: () => false,
});

/**
 * MeProvider is a provider for the current user context. It takes a session
 * prop provided by nextAuth. If the apolloClient is not provided, the
 * MeProvider will takes care of the Provided by the AppolloProvider.
 */
export const MeProvider: React.FC<MeProviderProps> = ({
  children,
  apolloClient,
}) => {
  const { addNotification } = useNotification();
  const { status } = useSession();
  const [me, setMe] = useState<MeQuery>({
    me: { settings: {} } as MeQuery['me'],
    myFollowings: [],
  });

  const [getMe, { refetch: refetchMe }] = useMeLazyQuery({
    client: apolloClient ? apolloClient : undefined,
    initialFetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    refetchWritePolicy: 'overwrite',
    onCompleted: (d) => setMe(d),
  });

  useEffect(() => {
    getMe({
      fetchPolicy: 'network-only',
    });
  }, [getMe]);

  /**
   * Returns true if the given entity is the currently authenticated user.
   *
   * @param entity The entity to check.
   */
  const isMe = useCallback(
    (entity: Pick<User, 'id'> | string) => {
      const id = typeof entity === 'string' ? entity : entity.id;

      return me?.me?.id === id;
    },
    [me]
  );

  /**
   * Returns whether the given user is being followed by the current user.
   *
   * @param entity The user to check.
   * @returns Whether the given user is being followed by the current user.
   */
  const isFollowed = useCallback(
    (entity: Pick<User, 'id'> | string) => {
      const id = typeof entity === 'string' ? entity : entity.id;

      return me?.myFollowings.some((user) => user.id === id) || false;
    },
    [me]
  );

  const [updateSettingsMutation] = useUpdateSettingsMutation({
    client: apolloClient ? apolloClient : undefined,
    refetchQueries: ['me'],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      if (!data) return;

      addNotification({
        title: 'Settings updated',
        message: 'Your settings have been updated.',
        type: 'success',
        duration: 5000,
      });
    },
  });

  /**
   * Function that takes the new settings and updates the current user settings
   * in the database and refetches the current user.
   */
  const updateSettings = useCallback(
    async (settings: Partial<SettingsInput>) => {
      await updateSettingsMutation({
        variables: {
          input: {
            ...me.me.settings,
            ...settings,
          },
        },
        onCompleted: () => {
          // Update the local storage with the new theme settings
          // to avoid a flash of the default theme on page load when
          // the user is not logged in.
          localStorage.setItem('theme', settings.theme || Theme.AUTO);
        },
      });
    },
    [me, updateSettingsMutation]
  );

  // Apply the theme settings directly on the document element
  // to avoid a flash of the default theme on page load
  // Move it to this hook to prevent duplicated provider with same behaviour.
  useEffect(() => {
    if (me.me.settings.theme) {
      localStorage.setItem('theme', me.me.settings.theme);
    }

    if (
      localStorage.getItem('theme') === Theme.DARK ||
      me.me.settings.theme === Theme.DARK
    ) {
      document.documentElement.classList.add('dark', 'bg-slate-900');
      return;
    } else if (
      me.me.settings.theme === Theme.AUTO &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.documentElement.classList.add('dark', 'bg-slate-900');
    } else {
      document.documentElement.classList.remove('dark', 'bg-slate-900');
    }
  }, [me]);

  // Remove __typename from me object to avoid errors when using the spread
  // operator
  delete me?.__typename;

  const value = {
    ...(me as Omit<MeQuery, '__typename'>),
    refetchMe,
    updateSettings,
    isMe,
    isFollowed,
  } satisfies MeContextValue;

  return (
    <ConditionalWrapper
      condition={status === 'authenticated'}
      trueWrapper={(c) => (
        <MeContext.Provider value={value}>{c}</MeContext.Provider>
      )}
    >
      <>{children}</>
    </ConditionalWrapper>
  );
};

/**
 * useMe is a hook that returns the context of the current user and a function
 *  to refetch the current user with somes useful functions.
 *
 * This hook must be used within a `MeProvider`.
 */
export const useMe: () => MeContextValue = () => {
  const context = useContext(MeContext);
  if (!context) {
    throw new Error('useMe must be used within a MeProvider');
  }

  return context;
};

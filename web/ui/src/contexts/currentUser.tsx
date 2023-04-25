import { ApolloQueryResult } from '@apollo/client';
import { ConditionalWrapper } from '@components/ConditionalWrapper';
import { MeQuery, User, useMeLazyQuery } from '@graphql.d';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { MeContextValue, MeProviderProps } from './types';

const MeContext = createContext<MeContextValue>({
  me: {} as MeQuery['me'],
  myFollowings: {} as MeQuery['myFollowings'],
  refetchMe: () => Promise.resolve({} as ApolloQueryResult<MeQuery>),
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
  session,
}) => {
  const [me, setMe] = useState<MeQuery>({
    me: {} as MeQuery['me'],
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

  // Remove __typename from me object to avoid errors when using the spread
  // operator
  delete me?.__typename;

  const value = {
    ...(me as Omit<MeQuery, '__typename'>),
    refetchMe,
    isMe,
    isFollowed,
  };

  return (
    <ConditionalWrapper
      condition={!!session}
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

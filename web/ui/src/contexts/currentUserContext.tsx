import { ApolloClient, ApolloQueryResult } from '@apollo/client';
import { ConditionalWrapper } from '@components/ConditionalWrapper';
import { MeQuery, User, useMeLazyQuery } from '@graphql.d';
import { Session } from 'next-auth';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface MeContextValue extends Omit<MeQuery, '__typename'> {
  // Function to update the current user in the session storage
  refetchMe: () => Promise<ApolloQueryResult<MeQuery>>;
  // Function that takes an entity object or string
  // and returns true or false depending on whether the entity is the current
  // user or not.
  isMe: (entity: Pick<User, 'id'> | string) => boolean;
  // Function that takes an entity object or
  // string and returns true or false depending on whether the entity is followed
  // by the current user or not.
  isFollowed: (entity: Pick<User, 'id'> | string) => boolean;
}

type MeProviderProps = React.PropsWithChildren<{
  apolloClient?: ApolloClient<any>;
  session?: Session | null;
}>;

const MeContext = createContext<MeContextValue>({
  me: {} as MeQuery['me'],
  myFollowings: {} as MeQuery['myFollowings'],
  refetchMe: () => Promise.resolve({} as ApolloQueryResult<MeQuery>),
  isMe: () => false,
  isFollowed: () => false,
});

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

export const useMe: () => MeContextValue = () => {
  const context = useContext(MeContext);
  if (!context) {
    throw new Error('useMe must be used within a MeProvider');
  }

  return context;
};

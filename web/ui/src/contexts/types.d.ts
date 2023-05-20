import { MeQuery } from '@graphql.d';

export interface MeContextValue extends Omit<MeQuery, '__typename'> {
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
  session: Session | null;
}>;

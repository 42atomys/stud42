import { NotificationProps } from '@components/Notification/types';
import { MeQuery, SettingsInput } from '@graphql.d';

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
  // Function that takes the new settings and updates the current user settings
  // in the database and refetches the current user.
  updateSettings: (settings: Partial<SettingsInput>) => Promise<void>;
}

type MeProviderProps = React.PropsWithChildren<{
  apolloClient?: ApolloClient<any>;
  session: Session | null;
}>;

export interface NotificationContextValue {
  notificationsCount: number;
  addNotification: (notification: Omit<NotificationProps, 'id'>) => void;
  removeNotification: (notification: NotificationProps) => void;
}

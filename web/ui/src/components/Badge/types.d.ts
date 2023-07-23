import { Account, AccountProvider, UserFlag } from '@graphql.d';
import { PropsWithClassName } from 'types/globals';
import { ClickableLink } from 'types/utils';

/**
 * Represents the properties used to style a badge component.
 */
export type BadgeProps = {
  color: BadgeColor;
  text?: string;
};

export type BadgeColor =
  | 'purple'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'red'
  | 'orange'
  | 'gray'
  | 'white'
  | 'black'
  | 'transparent';

/**
 * Represents the properties used to render the ThridPartyBadge component.
 */
export interface ThridPartySortable
  extends Pick<Account, 'provider' | 'providerAccountId' | 'username'> {}

/**
 * A type used to describe an object with name, description, and link properties.
 * It extends the ClickableLink type, which means it also can have a link property.
 * This is used to describe the data used to render the flag badges and the third
 * party badges.
 */
type ObjectMapData<T> = PropsWithClassName<
  ClickableLink<T> & {
    name: string;
    description?: string;
  }
>;

/**
 * Represents an object that maps each UserFlag to an ObjectMapData
 * object. It is used to provide data for the FlagBadge component.
 */
export type FlagDataMap = {
  [key in UserFlag]: ObjectMapData<null>;
};

/**
 * Represents an object that maps each AccountProvider
 * (and a custom SLACK provider) o an ObjectMapData object.
 * It is used to provide data for the ThridPartyBadge component.
 */
export type ThridPartyAccountDataMap = {
  [key in AccountProvider | 'SLACK']: ObjectMapData<{
    username: string;
    providerAccountId: string;
  }>;
};

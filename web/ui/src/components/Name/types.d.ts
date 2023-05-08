import { User } from '@graphql.d';
import { Maybe } from 'types/globals';

export type NameProps = {
  hasNickname?: boolean = false;
  displayLogin?: boolean = false;
  displayNickname?: boolean = false;
  tooltipClassName?: string;
  tooltip?: boolean = true;
  user: Pick<
    User,
    'firstName' | 'usualFirstName' | 'lastName' | 'duoLogin' | 'nickname'
  >;
};

export interface NameFormatable {
  nickname?: Maybe<string>;
  usualFirstName?: Maybe<string>;
  firstName?: Maybe<string>;
  duoLogin?: Maybe<string>;
  lastName?: Maybe<string>;
}

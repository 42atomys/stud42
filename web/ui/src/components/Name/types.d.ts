import { User } from '@graphql.d';

export type NameProps = {
  firstName: string;
  lastName: string;
  usualFirstName?: string;
  login: string;
  hasNickname?: boolean = false;
  nickname?: string;
  displayLogin?: boolean = false;
};

export type NameUserProps = {
  user: Pick<User, 'firstName' | 'usualFirstName' | 'lastName' | 'duoLogin'>;
};

import { User } from '@graphql.d';

export type NameProps = {
  hasNickname?: boolean = false;
  displayLogin?: boolean = false;
  user: Pick<
    User,
    'firstName' | 'usualFirstName' | 'lastName' | 'duoLogin' | 'nickname'
  >;
};

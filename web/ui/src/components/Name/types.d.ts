import { User } from '@graphql.d';
import { ClassNameProps } from 'types/globals';

export type NameProps = {
  hasNickname?: boolean = false;
  displayLogin?: boolean = false;
  displayNickname?: boolean = false;
  tooltipClassName?: string;
  user: Pick<
    User,
    'firstName' | 'usualFirstName' | 'lastName' | 'duoLogin' | 'nickname'
  >;
};

type NameComponent = (props: NameProps & ClassNameProps) => JSX.Element;

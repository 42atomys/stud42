import { Location, User } from '@graphql.d';
import { ClassNameProps } from 'types/globals';

type UserCardProps = {
  user: User;
  location?: Location
};

type UserCardComponent = (props: UserCardProps & ClassNameProps) => JSX.Element | null

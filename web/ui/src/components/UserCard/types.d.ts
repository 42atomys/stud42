import { InternalRefetchQueriesInclude } from '@apollo/client';
import { Location, User } from '@graphql.d';
import { ClassNameProps } from 'types/globals';

type UserCardProps = {
  user: User;
  location?: Partial<Location>;
};

type UserCardComponent = (
  props: UserCardProps &
    Pick<DropdownMenuProps, 'buttonAlwaysShow' | 'refetchQueries'> &
    ClassNameProps
) => JSX.Element | null;

type DropdownMenuProps = {
  userID: User['id'];
  isFriend: bool = false;
  buttonAlwaysShow?: boolean = false;
  refetchQueries?: InternalRefetchQueriesInclude;
};

type DropdownMenuComponent = (
  props: DropdownMenuProps & ClassNameProps
) => JSX.Element | null;

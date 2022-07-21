import { InternalRefetchQueriesInclude } from '@apollo/client';
import { Location, User } from '@graphql.d';
import { ClassNameProps } from 'types/globals';
import { NestedPartial } from 'types/utils';

type UserCardProps = {
  user: User;
  location?: NestedPartial<Location> | null;
};

type UserCardComponent = (
  props: UserCardProps &
    Pick<DropdownMenuProps, 'buttonAlwaysShow' | 'refetchQueries'> &
    ClassNameProps
) => JSX.Element | null;

type DropdownMenuProps = {
  user: Pick<User, 'id', 'login'>;
  isFriend: bool = false;
  buttonAlwaysShow?: boolean = false;
  refetchQueries?: InternalRefetchQueriesInclude;
};

type DropdownMenuComponent = (
  props: DropdownMenuProps & ClassNameProps
) => JSX.Element | null;

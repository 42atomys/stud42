import { Location, User } from '@graphql.d';
import { NestedPartial } from 'types/utils';

type UserCardProps = Pick<DropdownMenuProps, 'buttonAlwaysShow'> & {
  user: User;
  location?: NestedPartial<Location> | null;
};

type DropdownMenuProps = {
  user: Pick<User, 'id', 'duoLogin'>;
  buttonAlwaysShow?: boolean = false;
};

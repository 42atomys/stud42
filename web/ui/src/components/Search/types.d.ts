import { SearchUserQueryVariables, User } from '@graphql.d';

export type SearchComponent = React.ComponentType<SearchProps>;

export type SearchProps = {
  action: (user: User) => Promise<any>;
  placeholder: string;
  searchVariables?: Partial<SearchUserQueryVariables>;
  icon: string;
};

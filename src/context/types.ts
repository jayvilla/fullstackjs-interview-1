import { User } from '@src/components/users/types';

export type UsersProviderContext = {
  users: User[];
  searchColumns: string[];
  filteredUsers: User[];
  setUsers(users: User[]): void;
  setSearchColumns(checked: boolean, column: string): void;
  setFilteredUsers(users: User[]): void;
};

export type UsersProviderValues = {
  children: React.ReactElement;
  initialState?: UsersProviderContext;
};

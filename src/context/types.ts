import { User } from '@src/components/users/types';

export type UsersProviderContext = {
  users: User[];
  currentUsers: User[];
  loading: boolean;
  currentPage: number;
  usersPerPage: number;
  columnToSort: string;
  sortDirection: string;
  searchColumns: string[];
  filteredUsers: User[];
  setUsers(users: User[]): void;
  setLoading(loading: boolean): void;
  setCurrentPage(page: number): void;
  setUsersPerPage(usersPerPage: number): void;
  setColumnToSort(columnToSort: string): any;
  setSortDirection(sortDirection: string): void;
  setSearchColumns(checked: boolean, column: string): void;
  setFilteredUsers(users: User[]): void;
};

export type UsersProviderValues = {
  children: React.ReactElement;
  initialState?: UsersProviderContext;
};

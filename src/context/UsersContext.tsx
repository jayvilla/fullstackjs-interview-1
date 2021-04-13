import { User } from '@src/components/users/types';
import React from 'react';

export type Users = {
  searchValue: string;
  setSearchValue?(value: string): any;
  searchColumns: string[];
  setSearchColumns(any): any;
  handleSort?(columnName: string): any;
  columnToSort: string;
  sortDirection: string;
  fetchUsers(): any;
  currentUsers: User[];
  currentPage: number;
  paginate(pageNumber: number): void;
  loading: boolean;
  totalPages: number;
  users: User[];
  search(users: User[]): any;
};

export const UsersContext = React.createContext<Partial<Users>>(null);

// const defaultValue: UsersProviderContext = {
//   users: null,
//   loading: false,
//   currentPage: 1,
//   usersPerPage: 13,
//   columnToSort: '',
//   sortDirection: 'desc',
//   searchColumns: ['firstName', 'lastName'],
//   filteredUsers: null,
//   setUsers: (users: User[]) => {},
//   setLoading: (loading: boolean) => {},
//   setCurrentPage: (page: number) => {},
//   setUsersPerPage: (usersPerPage: number) => {},
//   setColumnToSort: (columnToSort: string) => {},
//   setSortDirection: (sortDirection: string) => {},
//   setSearchColumns: (searchColumns: string[]) => {},
//   setFilteredUsers: (users: User[]) => {},
//   paginate: (pageNumber: number) => {},
// };

// type UsersProviderValues = {
//   children: React.ReactElement[];
//   initialState?: UsersProviderContext;
// };

// export const UsersContext = React.createContext(defaultValue);

// export const UsersProvider = ({ children, initialState }: UsersProviderValues) => {
//   const [state, setState] = React.useState<UsersProviderContext>({
//     users: initialState?.users,
//     loading: initialState?.loading,
//     currentPage: initialState?.currentPage,
//     usersPerPage: initialState?.usersPerPage,
//     columnToSort: initialState?.columnToSort,
//     sortDirection: initialState?.sortDirection,
//     searchColumns: initialState?.searchColumns,
//     filteredUsers: initialState?.filteredUsers,

//     setUsers: (users: User[]) => setState((prevState) => ({ ...prevState, users })),

//     setLoading: (loading: boolean) => setState((prevState) => ({ ...prevState, loading })),

//     setCurrentPage: (page: number) =>
//       setState((prevState) => ({ ...prevState, currentPage: page })),

//     setUsersPerPage: (usersPerPage: number) =>
//       setState((prevState) => ({ ...prevState, usersPerPage })),

//     setColumnToSort: (columnToSort: string) =>
//       setState((prevState) => ({ ...prevState, columnToSort })),

//     setSortDirection: (sortDirection: string) =>
//       setState((prevState) => ({ ...prevState, sortDirection })),

//     setSearchColumns: (searchColumns: string[]) =>
//       setState((prevState) => ({ ...prevState, searchColumns })),

//     setFilteredUsers: (users: User[]) =>
//       setState((prevState) => ({ ...prevState, filteredUsers: users })),

//     paginate: (pageNumber: number) => {},
//   });
// };

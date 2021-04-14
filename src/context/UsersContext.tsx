import { User } from '@src/components/users/types';
import React from 'react';
import { UsersProviderContext, UsersProviderValues } from './types';

export const initialUsersState: UsersProviderContext = {
  users: null,
  currentUsers: null,
  loading: false,
  currentPage: 1,
  usersPerPage: 13,
  columnToSort: '',
  sortDirection: 'desc',
  searchColumns: ['firstName', 'lastName'],
  filteredUsers: null,
  setUsers: (users: User[]) => {},
  setLoading: (loading: boolean) => {},
  setCurrentPage: (page: number) => {},
  setUsersPerPage: (usersPerPage: number) => {},
  setColumnToSort: (columnToSort: string) => {},
  setSortDirection: (sortDirection: string) => {},
  setSearchColumns: (checked: boolean, column: string) => {},
  setFilteredUsers: (users: User[]) => {},
};

export const UsersContext = React.createContext<Partial<UsersProviderContext>>(
  initialUsersState,
);

export const UsersProvider = ({ children, initialState }: UsersProviderValues) => {
  const [state, setState] = React.useState({
    users: initialState?.users,
    currentUsers: initialState?.currentUsers,
    loading: initialState?.loading,
    currentPage: initialState?.currentPage,
    usersPerPage: initialState?.usersPerPage,
    columnToSort: initialState?.columnToSort,
    sortDirection: initialState?.sortDirection,
    searchColumns: initialState?.searchColumns,
    filteredUsers: initialState?.filteredUsers,

    setUsers: (users: User[]) => setState((prevState) => ({ ...prevState, users })),
    setLoading: (loading: boolean) => setState((prevState) => ({ ...prevState, loading })),
    setCurrentPage: (page: number) =>
      setState((prevState) => ({ ...prevState, currentPage: page })),
    setUsersPerPage: (usersPerPage: number) =>
      setState((prevState) => ({ ...prevState, usersPerPage })),
    setColumnToSort: (columnToSort: string) =>
      setState((prevState) => ({ ...prevState, columnToSort })),
    setSortDirection: (sortDirection: string) =>
      setState((prevState) => ({ ...prevState, sortDirection })),
    setSearchColumns: (checked: boolean, column: string) => {
      setState((prevState) => ({
        ...prevState,
        searchColumns: checked
          ? prevState.searchColumns.filter((searchColumn) => searchColumn !== column)
          : [...prevState.searchColumns, column],
      }));
    },
    setFilteredUsers: (users: User[]) =>
      setState((prevState) => ({ ...prevState, filteredUsers: users })),
  });

  return <UsersContext.Provider value={state}>{children}</UsersContext.Provider>;
};

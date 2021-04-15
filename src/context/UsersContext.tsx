import { User } from '@src/components/users/types';
import React from 'react';
import { UsersProviderContext, UsersProviderValues } from './types';

export const initialUsersState: UsersProviderContext = {
  users: null,
  searchColumns: ['firstName', 'lastName'],
  filteredUsers: null,
  setUsers: (users: User[]) => {},
  setSearchColumns: (checked: boolean, column: string) => {},
  setFilteredUsers: (users: User[]) => {},
};

export const UsersContext = React.createContext<Partial<UsersProviderContext>>(
  initialUsersState,
);

export const UsersProvider = ({ children, initialState }: UsersProviderValues) => {
  const [state, setState] = React.useState({
    users: initialState?.users,
    searchColumns: initialState?.searchColumns,
    filteredUsers: initialState?.filteredUsers,
    setUsers: (users: User[]) => setState((prevState) => ({ ...prevState, users })),
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

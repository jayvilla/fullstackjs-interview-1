import { User } from '@src/components/users/types';
import React from 'react';
import { UsersProviderContext, UsersProviderValues } from './types';

export const initialUsersState: UsersProviderContext = {
  users: null,
  setUsers: (users: User[]) => {},
};

export const UsersContext = React.createContext<Partial<UsersProviderContext>>(
  initialUsersState,
);

export const UsersProvider = ({ children, initialState }: UsersProviderValues) => {
  const [state, setState] = React.useState({
    users: initialState?.users,
    setUsers: (users: User[]) => setState((prevState) => ({ ...prevState, users })),
  });

  return <UsersContext.Provider value={state}>{children}</UsersContext.Provider>;
};

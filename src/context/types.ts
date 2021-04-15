import { User } from '@src/components/users/types';

export type UsersProviderContext = {
  users: User[];
  setUsers(users: User[]): void;
};

export type UsersProviderValues = {
  children: React.ReactElement;
  initialState?: UsersProviderContext;
};

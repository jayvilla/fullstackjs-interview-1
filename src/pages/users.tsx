import { Users } from '@src/components/users';
import { initialUsersState, UsersProvider } from '@src/context';
import React from 'react';

const UsersPage = () => {
  return (
    <div>
      <UsersProvider initialState={initialUsersState}>
        <Users />
      </UsersProvider>
    </div>
  );
};

export default UsersPage;

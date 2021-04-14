import { Users } from '@src/components/users';
import { initialState, UsersProvider } from '@src/context';
import React from 'react';

const UsersPage = () => {
  return (
    <div>
      <UsersProvider initialState={initialState}>
        <Users />
      </UsersProvider>
    </div>
  );
};

export default UsersPage;

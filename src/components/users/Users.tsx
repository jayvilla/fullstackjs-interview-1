import { User } from '@src/components/users/types';
import { UsersContext } from '@src/context';
import React from 'react';
import { Search } from './search';
import { UsersTable } from './users-table';

export const Users = () => {
  const { users, setUsers } = React.useContext(UsersContext);
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>();
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!users) {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:9001/users`, {
      method: 'GET',
    });
    const users = await response.json();
    setUsers(users);
    setLoading(false);
  };

  if (loading || !users) return <h1>Loading user data...</h1>;

  const filtered = filteredUsers || users;

  return (
    <div>
      {/* Fix search */}
      {/* Search through all tables*/}
      <Search
        users={users}
        filteredUsers={filteredUsers}
        setFilteredUsers={setFilteredUsers}
      />
      {/* Make table more modular */}
      {/* 
        Render 2 tables
          A-M table 1
          M-Z table 2

        All updates must show up
      */}
      <UsersTable users={filtered} lower={'a'} upper={'m'} />
      <UsersTable users={filtered} lower={'m'} upper={'z'} />
      {/* Put into users table */}
    </div>
  );
};

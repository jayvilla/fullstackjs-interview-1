import { UsersContext } from '@src/context';
import React from 'react';
import { Pagination } from './pagination';
import { Search } from './search';
import { UsersTable } from './users-table';

export const Users = () => {
  const { users, loading, setUsers, setLoading } = React.useContext(UsersContext);

  React.useEffect(() => {
    if (!users) {
      fetchUsers();
    }
  }, [users]);

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

  return (
    <div>
      <Search />
      <UsersTable />
      <Pagination />
    </div>
  );
};

import { User } from '@src/components/users/types';
import React from 'react';
import { UsersTablePagination } from './pagination';
import { UsersTable } from './users-table';

export const Users = () => {
  const [users, setUsers] = React.useState<User[]>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [usersPerPage] = React.useState<number>(15);

  React.useEffect(() => {
    if (!users) {
      const fetchUsers = async () => {
        setLoading(true);
        const response = await fetch(`http://localhost:9001/users`, {
          method: 'GET',
        });
        const users = await response.json();
        setUsers(users);
        setLoading(false);
      };
      fetchUsers();
    }
  }, []);

  let indexOfLastUser, indexOfFirstUser, currentUsers;
  if (users) {
    indexOfLastUser = currentPage * usersPerPage;
    indexOfFirstUser = indexOfLastUser - usersPerPage;
    currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* INSERT CODE HERE */}
      {users && <UsersTable users={currentUsers} loading={loading} />}
      {users && (
        <UsersTablePagination
          currentPage={currentPage}
          usersPerPage={usersPerPage}
          totalUsers={users.length}
          paginate={paginate}
        />
      )}
    </div>
  );
};

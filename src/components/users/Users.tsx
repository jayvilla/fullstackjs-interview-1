import { User } from '@src/components/users/types';
import { orderBy } from 'lodash';
import React from 'react';
import { Pagination } from './pagination';
import { UsersTable } from './users-table';

export const Users = () => {
  const [users, setUsers] = React.useState<User[]>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [usersPerPage] = React.useState<number>(15);
  const [columnToSort, setColumnToSort] = React.useState<string>('firstName');
  const [sortDirection, setSortDirection] = React.useState<string>('asc');

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

  const handleSort = (columnName: string) => (e: React.MouseEvent<HTMLDivElement>) => {
    const invertDirection = {
      asc: 'desc',
      desc: 'asc',
    };
    setColumnToSort(columnName);
    setSortDirection(columnToSort === columnName ? invertDirection[sortDirection] : 'asc');
    setUsers(orderBy(users, columnToSort, sortDirection));
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  let indexOfLastUser, indexOfFirstUser, currentUsers, totalPages;

  if (users) {
    indexOfLastUser = currentPage * usersPerPage;
    indexOfFirstUser = indexOfLastUser - usersPerPage;
    currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    totalPages = Math.ceil(users.length / usersPerPage);
  }

  if (loading || !users) return <h1>Loading user data...</h1>;

  return (
    <div>
      <UsersTable
        handleSort={handleSort}
        columnToSort={columnToSort}
        sortDirection={sortDirection}
        fetchUsers={fetchUsers}
        users={currentUsers}
        loading={loading}
      />
      <Pagination
        current={currentPage}
        onChange={paginate}
        hasNext={currentPage < totalPages}
        disabled={loading}
      />
    </div>
  );
};

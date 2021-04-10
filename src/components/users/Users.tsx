import { User } from '@src/components/users/types';
import { orderBy } from 'lodash';
import React from 'react';
import { Pagination } from './pagination';
import { Search } from './search';
import { UsersTable } from './users-table';

export const Users = () => {
  const [users, setUsers] = React.useState<User[]>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [usersPerPage] = React.useState<number>(13);
  const [columnToSort, setColumnToSort] = React.useState<string>('');
  const [sortDirection, setSortDirection] = React.useState<string>('desc');
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [searchColumns, setSearchColumns] = React.useState<string[]>([
    'firstName',
    'lastName',
  ]);

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
    setUsers(orderBy(users, [(user) => user[columnName].toLowerCase()], sortDirection));
  };

  const search = (users: User[]) => {
    if (!searchColumns.length) return users;

    return users.filter((user) =>
      searchColumns.some(
        (column) =>
          user[column].toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1,
      ),
    );
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading || !users) return <h1>Loading user data...</h1>;

  const filteredUsers = search(users);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div>
      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchColumns={searchColumns}
        setSearchColumns={setSearchColumns}
      />
      <UsersTable
        handleSort={handleSort}
        columnToSort={columnToSort}
        sortDirection={sortDirection}
        fetchUsers={fetchUsers}
        users={currentUsers}
      />
      <Pagination
        current={currentPage}
        onChange={paginate}
        hasNext={currentPage < totalPages}
        disabled={loading}
        totalPages={totalPages}
      />
    </div>
  );
};

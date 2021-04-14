import DownArrow from '@material-ui/icons/ArrowDropDown';
import UpArrow from '@material-ui/icons/ArrowDropUp';
import { UsersContext } from '@src/context';
import React from 'react';
import { SmartRow } from '../smartrow';
import styles from './UsersTable.module.scss';
// import orderBy from 'lodash/orderBy';

export const UsersTable = () => {
  const {
    columnToSort,
    currentPage,
    filteredUsers,
    sortDirection,
    setColumnToSort,
    setSortDirection,
    setUsers,
    setLoading,
    users,
    usersPerPage,
  } = React.useContext(UsersContext);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:9001/users`, {
      method: 'GET',
    });
    const users = await response.json();
    setUsers(users);
    setLoading(false);
  };

  const handleSort = (columnToSort: string) => (e: React.MouseEvent<HTMLDivElement>) => {
    const invertDirection = {
      asc: 'desc',
      desc: 'asc',
    };

    setColumnToSort(columnToSort);
    setSortDirection(columnToSort === columnToSort ? invertDirection[sortDirection] : 'asc');
    // setUsers(orderBy(users, [(user) => user[columnToSort].toLowerCase()], sortDirection));
    setUsers(sortUsers(users, columnToSort, sortDirection));
  };

  const sortUsers = (users, columnToSort, sortDirection) => {
    if (sortDirection === 'asc') {
      return users.sort((a, b) =>
        a[columnToSort].toLowerCase() > b[columnToSort].toLowerCase() ? 1 : -1,
      );
    }
    if (sortDirection === 'desc') {
      return users.sort((a, b) =>
        a[columnToSort].toLowerCase() < b[columnToSort].toLowerCase() ? 1 : -1,
      );
    }
  };

  const columnHeaders = [
    ['First Name', 'firstName'],
    ['Last Name', 'lastName'],
    ['Email', 'email'],
    ['Phone Number', 'phoneNumber'],
  ];

  const filtered = filteredUsers || users;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            {columnHeaders.map((header, i) => (
              <th key={i}>
                <div className={styles.columnHeader} onClick={handleSort(header[1])}>
                  <span className={styles.header}>{header[0]}</span>
                  {columnToSort === header[1] ? (
                    sortDirection === 'asc' ? (
                      <UpArrow />
                    ) : (
                      <DownArrow />
                    )
                  ) : null}
                </div>
              </th>
            ))}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {!currentUsers.length && (
            <tr>
              <td>
                <h1 style={{ textAlign: 'center', margin: '0 auto' }}>No users found...</h1>
              </td>
            </tr>
          )}
          {currentUsers &&
            currentUsers.map((user) => (
              <SmartRow
                key={user.phoneNumber}
                rowType={'userRow'}
                id={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                phoneNumber={user.phoneNumber}
              />
            ))}
          <SmartRow rowType={'addUser'} />
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

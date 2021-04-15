import DownArrow from '@material-ui/icons/ArrowDropDown';
import UpArrow from '@material-ui/icons/ArrowDropUp';
import { User } from '@src/components/users/types';
import React from 'react';
import { Pagination } from '../pagination';
import { SmartRow } from '../smartrow';
import styles from './UsersTable.module.scss';

type UsersTableProps = {
  users?: User[];
  lower?: string;
  upper?: string;
};

export const UsersTable = (props: UsersTableProps) => {
  const [usersForTable, setUsersForTable] = React.useState<User[]>();
  const [columnToSort, setColumnToSort] = React.useState<string>('');
  const [sortDirection, setSortDirection] = React.useState<string>('desc');
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [usersPerPage] = React.useState<number>(13);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (props && props.users) {
      setUsersForTable(props.users);
      if (props.lower && props.upper) {
        setUsersForTable(filterUsersTable(props.users, props.lower, props.upper));
      }
    }
  }, [props.users]);

  React.useEffect(() => {
    if (!props.users && !usersForTable) {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:9001/users`, {
      method: 'GET',
    });
    let usersForTable = await response.json();

    if (props.lower && props.upper) {
      usersForTable = filterUsersTable(usersForTable, props.lower, props.upper);
    }

    setUsersForTable(usersForTable);
    setLoading(false);
  };

  const handleSort = (columnToSort: string) => (e: React.MouseEvent<HTMLDivElement>) => {
    const invertDirection = {
      asc: 'desc',
      desc: 'asc',
    };

    setColumnToSort(columnToSort);
    setSortDirection(columnToSort === columnToSort ? invertDirection[sortDirection] : 'asc');
    setUsersForTable(sortUsers(usersForTable, columnToSort, sortDirection));
  };

  const sortUsers = (usersForTable, columnToSort, sortDirection) => {
    if (sortDirection === 'asc') {
      return usersForTable.sort((a, b) =>
        a[columnToSort].toLowerCase() > b[columnToSort].toLowerCase() ? 1 : -1,
      );
    }
    if (sortDirection === 'desc') {
      return usersForTable.sort((a, b) =>
        a[columnToSort].toLowerCase() < b[columnToSort].toLowerCase() ? 1 : -1,
      );
    }
  };

  const filterUsersTable = (users: User[], lower: string, upper: string) => {
    let regexpStr = `[${lower}-${upper}]`;
    let regexp = new RegExp(regexpStr, 'gi');
    return users.filter((user) => !!user.firstName[0].match(regexp));
  };

  const columnHeaders = [
    ['First Name', 'firstName'],
    ['Last Name', 'lastName'],
    ['Email', 'email'],
    ['Phone Number', 'phoneNumber'],
  ];

  if (loading || !usersForTable) return <h1>Loading user data...</h1>;

  if (usersForTable) {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = usersForTable.slice(indexOfFirstUser, indexOfLastUser);

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
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          usersPerPage={usersPerPage}
          userLength={usersForTable.length}
        />
      </div>
    );
  }
};

export default UsersTable;

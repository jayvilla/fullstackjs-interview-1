import DownArrow from '@material-ui/icons/ArrowDropDown';
import UpArrow from '@material-ui/icons/ArrowDropUp';
import { UsersContext } from '@src/context';
import React from 'react';
import { SmartRow } from '../smartrow';
import styles from './UsersTable.module.scss';

export const UsersTable = () => {
  const {
    handleSort,
    columnToSort,
    sortDirection,
    fetchUsers,
    currentUsers,
  } = React.useContext(UsersContext);

  const headers = [
    ['First Name', 'firstName'],
    ['Last Name', 'lastName'],
    ['Email', 'email'],
    ['Phone Number', 'phoneNumber'],
  ];

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            {headers.map((header, i) => (
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

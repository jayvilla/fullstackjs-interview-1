import DownArrow from '@material-ui/icons/ArrowDropDown';
import UpArrow from '@material-ui/icons/ArrowDropUp';
import React from 'react';
import { SmartRow } from '../smartrow';
import { User } from '../types';
import styles from './UsersTable.module.scss';

interface UsersTableProps {
  users: User[];
  columnToSort: string;
  sortDirection: string;
  handleSort?(columnName: string): any;
  fetchUsers(): void;
}

export const UsersTable = (props: UsersTableProps) => {
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
                <div className={styles.columnHeader} onClick={props.handleSort(header[1])}>
                  <span className={styles.header}>{header[0]}</span>
                  {props.columnToSort === header[1] ? (
                    props.sortDirection === 'asc' ? (
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
          {props.users.map((user) => (
            <SmartRow
              key={user.phoneNumber}
              rowType={'userRow'}
              id={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              phoneNumber={user.phoneNumber}
              fetchUsers={props.fetchUsers}
            />
          ))}
          <SmartRow rowType={'addUser'} fetchUsers={props.fetchUsers} />
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

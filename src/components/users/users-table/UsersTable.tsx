import classNames from 'classnames';
import React from 'react';
import { SmartRow } from '../smartrow';
import { User } from '../types';
import styles from './UsersTable.module.scss';

export interface UsersTableProps {
  users: User[];
  loading: boolean;
  columnToSort: string;
  sortDirection: string;
  handleSort?(columnName: string): any;
  fetchUsers(): void;
}

export const UsersTable = (props: UsersTableProps) => {
  if (props.loading) {
    return <h1>Loading...</h1>;
  }

  const firstNameArrowClass = classNames(
    props.columnToSort === 'firstName' && props.sortDirection === 'asc'
      ? styles.asc
      : styles.desc,
  );

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>
              <div onClick={props.handleSort('firstName')}>First Name</div>
            </th>
            <th>
              <div onClick={props.handleSort('lastName')}>Last Name</div>
            </th>
            <th>
              <div onClick={props.handleSort('email')}>Email</div>
            </th>
            <th>
              <div onClick={props.handleSort('phoneNumber')}>Phone Number</div>
            </th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {props.loading && <h1>Fetching users...</h1>}
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
            // <tr key={user.phoneNumber}>
            //   <td>{user.firstName}</td>
            //   <td>{user.lastName}</td>
            //   <td>{user.email}</td>
            //   <td>{user.phoneNumber}</td>
            //   <td>Edit</td>
            // </tr>
          ))}
          <SmartRow rowType={'addUser'} fetchUsers={props.fetchUsers} />
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

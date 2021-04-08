import React from 'react';
import { SmartRow } from '../smartrow';
import { User } from '../types';
import styles from './UsersTable.module.scss';

export interface UsersTableProps {
  users: User[];
  loading: boolean;
}

export const UsersTable = (props: UsersTableProps) => {
  if (props.loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {props.loading && <h1>Fetching users...</h1>}
          {props.users.map((user) => (
            <tr key={user.phoneNumber}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>Edit</td>
            </tr>
          ))}
          <SmartRow />
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

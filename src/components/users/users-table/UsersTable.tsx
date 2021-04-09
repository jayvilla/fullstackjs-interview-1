import React from 'react';
import { SmartRow } from '../smartrow';
import { User } from '../types';
import styles from './UsersTable.module.scss';

export interface UsersTableProps {
  users: User[];
  loading: boolean;
  fetchUsers(): void;
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

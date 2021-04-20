import { UsersContext } from '@src/context';
import React from 'react';
import { AddUserModal } from '../modals/';
import { Signup } from '../signup';
import { Search } from './search';
import { UsersTable } from './users-table';
import styles from './Users.module.scss';

export const Users = () => {
  const { users, setUsers } = React.useContext(UsersContext);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!users) {
      fetchUsers();
    }
  }, [users]);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:9001/users`, {
      method: 'GET',
    });
    const users = await response.json();
    setUsers(users);
    setLoading(false);
  };

  const handleModalClick = () => {
    setShowModal(!showModal);
  };

  const handleOnSubmit = () => {
    setShowModal(false);
  };

  if (loading || !users) return <h1>Loading user data...</h1>;

  return (
    <div className={styles.container}>
      {/* 
      REQUIREMENTS SEARCH:
        [x] Fix search
        [x] Search through all tables
        [x] Use SearchAPI
        [x] Make table more modular 
        [x] Put into users table 
        [x] Make table more modular
        [x] Render 2 tables
        [x] A-M table 1
        [x] M-Z table 2
        [x] All updates must show up
        [x] Add new button next to search (Add New User) and create modal to add user using signup
        [x] Create modal for signup
        [x] Make modal dismissable click outside

        REQUIREMENTS BUTTON:
        (Tailwind css styles frame of reference);
        (Keep mobile in mind);
        [] Create a generic button to reuse
        [] Create a generic text/input field
        [] Create a generic select drop down
        [] Create a generic radio buttons
        [] Create a generic tooltip
        [] Create a generic date picker
        [] Create a generic drawer
      */}

      <AddUserModal onClick={handleModalClick} isVisible={showModal}>
        <Signup
          handleOnSubmit={handleOnSubmit}
          titleText={'Add New User'}
          buttonText={'Add'}
        />
      </AddUserModal>
      <div className={styles.buttonContainer}>
        <button onClick={handleModalClick}>Add User +</button>
      </div>
      <Search fetchUsers={fetchUsers} />
      <UsersTable users={users} lower={'a'} upper={'m'} />
      <UsersTable users={users} lower={'m'} upper={'z'} />
    </div>
  );
};

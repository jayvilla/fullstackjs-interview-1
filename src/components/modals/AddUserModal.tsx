import React from 'react';
import { Signup } from '../signup';
import styles from './AddUserModal.module.scss';

type AddUserModalProps = {
  setShowUserModal?(bool: boolean): void;
};

export const AddUserModal = (props: AddUserModalProps) => {
  const handleCloseModalClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    props.setShowUserModal(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeModalButton} onClick={handleCloseModalClick}>
        X
      </button>
      <Signup setShowUserModal={props.setShowUserModal} isModal={true} />
    </div>
  );
};

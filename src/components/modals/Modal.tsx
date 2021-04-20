import React from 'react';
import styles from './Modal.module.scss';

type AddUserModalProps = {
  children?: any;
  component?: React.ReactElement;
  isVisible?: boolean;
  onClick?(): void;
};

export const AddUserModal = (props: AddUserModalProps) => {
  // event bubbling (keyword)
  const [isVisible, setIsVisible] = React.useState<boolean>(props.isVisible || false);

  React.useEffect(() => {
    if (props.isVisible) {
      setIsVisible(props.isVisible);
    }
  }, [props.isVisible]);

  const closeModal = (e) => {
    setIsVisible(false);
  };

  const openModal = (e) => {
    setIsVisible(true);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.container} onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modalContainer}>
        {props.children}
      </div>
    </div>
  );
};

import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import { PaginationContext, UsersContext } from '@src/context';
import React from 'react';
import styles from './Pagination.module.scss';

export const PaginationHasNext = () => {
  const { currentPage } = React.useContext(UsersContext);
  const { increment, setPage } = React.useContext(PaginationContext);

  const value = currentPage + 1;

  return (
    <>
      <div className={styles.paginationButton} onClick={setPage(currentPage + 1)}>
        <span>{value}</span>
      </div>
      <div className={styles.ellipsis}>...</div>
      <div className={styles.paginationButton} onClick={increment}>
        <ChevronRightRoundedIcon />
      </div>
    </>
  );
};

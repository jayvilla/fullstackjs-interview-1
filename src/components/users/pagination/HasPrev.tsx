import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import { PaginationContext, UsersContext } from '@src/context';
import React from 'react';
import styles from './Pagination.module.scss';

export const PaginationHasPrev = () => {
  const { currentPage } = React.useContext(UsersContext);
  const { decrement, setPage } = React.useContext(PaginationContext);

  const value = currentPage - 1;

  return (
    <>
      <div className={styles.paginationButton} onClick={decrement}>
        <ChevronLeftRoundedIcon />
      </div>
      {value >= 2 && <div className={styles.ellipsis}>...</div>}
      <div className={styles.paginationButton} onClick={setPage(currentPage - 1)}>
        <span>{value}</span>
      </div>
    </>
  );
};

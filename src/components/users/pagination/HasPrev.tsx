import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import React from 'react';
import styles from './Pagination.module.scss';

type PaginationHasPrevProps = {
  currentPage: number;
  decrement(): void;
  setPage(num: number): () => void;
};

export const PaginationHasPrev = (props: PaginationHasPrevProps) => {
  const value = props.currentPage - 1;

  return (
    <>
      <div className={styles.paginationButton} onClick={props.decrement}>
        <ChevronLeftRoundedIcon />
      </div>
      {value >= 2 && <div className={styles.ellipsis}>...</div>}
      <div className={styles.paginationButton} onClick={props.setPage(props.currentPage - 1)}>
        <span>{value}</span>
      </div>
    </>
  );
};

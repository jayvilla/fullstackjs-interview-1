import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import React from 'react';
import styles from './Pagination.module.scss';

type PaginationHasNextProps = {
  currentPage: number;
  increment(): void;
  setPage(num: number): () => void;
};

export const PaginationHasNext = (props: PaginationHasNextProps) => {
  const value = props.currentPage + 1;

  return (
    <>
      <div className={styles.paginationButton} onClick={props.setPage(props.currentPage + 1)}>
        <span>{value}</span>
      </div>
      <div className={styles.ellipsis}>...</div>
      <div className={styles.paginationButton} onClick={props.increment}>
        <ChevronRightRoundedIcon />
      </div>
    </>
  );
};

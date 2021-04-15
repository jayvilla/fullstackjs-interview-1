import classNames from 'classnames';
import React from 'react';
import { PaginationHasNext } from './HasNext';
import { PaginationHasPrev } from './HasPrev';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  usersPerPage: number;
  userLength: number;
  setCurrentPage(num: number): void;
};

export const Pagination = (props: PaginationProps) => {
  const increment = () => props.setCurrentPage(props.currentPage + 1);
  const decrement = () => props.setCurrentPage(props.currentPage - 1);
  const setPage = (num: number) => () => props.setCurrentPage(num);

  const activeClass = classNames(styles.paginationButton, styles.active);
  const totalPages = Math.ceil(props.userLength / props.usersPerPage);
  const hasNext = props.currentPage < totalPages;

  return (
    <div className={styles.container}>
      <div className={styles.paginationButton}>
        <span onClick={setPage(1)}>First</span>
      </div>

      <div className={styles.pageNumbers}>
        {props.currentPage > 1 && (
          <PaginationHasPrev
            currentPage={props.currentPage}
            decrement={decrement}
            setPage={setPage}
          />
        )}
        <div className={activeClass}>
          <span>{props.currentPage}</span>
        </div>
        {hasNext && (
          <PaginationHasNext
            currentPage={props.currentPage}
            increment={increment}
            setPage={setPage}
          />
        )}
      </div>

      <div className={styles.paginationButton}>
        <span onClick={setPage(totalPages)}>Last</span>
      </div>
    </div>
  );
};

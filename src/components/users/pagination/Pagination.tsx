import { PaginationContext, UsersContext } from '@src/context';
import classNames from 'classnames';
import React from 'react';
import { PaginationHasNext } from './HasNext';
import { PaginationHasPrev } from './HasPrev';
import styles from './Pagination.module.scss';

export const Pagination = () => {
  const { currentPage, filteredUsers, setCurrentPage, users, usersPerPage } = React.useContext(
    UsersContext,
  );

  const increment = () => setCurrentPage(currentPage + 1);
  const decrement = () => setCurrentPage(currentPage - 1);
  const setPage = (num: number) => () => setCurrentPage(num);

  const activeClass = classNames(styles.paginationButton, styles.active);
  const filtered = filteredUsers || users;
  const totalPages = Math.ceil(filtered.length / usersPerPage);
  const hasNext = currentPage < totalPages;

  return (
    <div className={styles.container}>
      <div className={styles.paginationButton}>
        <span onClick={setPage(1)}>First</span>
      </div>

      <PaginationContext.Provider value={{ increment, decrement, setPage }}>
        <div className={styles.pageNumbers}>
          {currentPage > 1 && <PaginationHasPrev />}
          <div className={activeClass}>
            <span>{currentPage}</span>
          </div>
          {hasNext && <PaginationHasNext />}
        </div>
      </PaginationContext.Provider>

      <div className={styles.paginationButton}>
        <span onClick={setPage(totalPages)}>Last</span>
      </div>
    </div>
  );
};

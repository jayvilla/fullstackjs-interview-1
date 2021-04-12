import { PaginationContext, UsersContext } from '@src/context';
import classNames from 'classnames';
import React from 'react';
import { PaginationHasNext } from './HasNext';
import { PaginationHasPrev } from './HasPrev';
import styles from './Pagination.module.scss';

export const Pagination = () => {
  const { paginate, currentPage, loading, totalPages } = React.useContext(UsersContext);
  const increment = () => paginate(currentPage + 1);
  const decrement = () => paginate(currentPage - 1);
  const setPage = (num: number) => () => paginate(num);

  const activeClass = classNames(styles.paginationButton, styles.active);

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

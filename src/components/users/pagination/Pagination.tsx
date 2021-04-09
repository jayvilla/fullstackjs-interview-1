import classNames from 'classnames';
import React from 'react';
import { PaginationHasNext } from './HasNext';
import { PaginationHasPrev } from './HasPrev';
import styles from './Pagination.module.scss';

interface PaginationProps {
  current: number;
  totalPages: number;
  hasNext: boolean;
  disabled: boolean;
  onChange(page: number): void;
}

export const Pagination = (props: PaginationProps) => {
  const increment = () => props.onChange(props.current + 1);
  const decrement = () => props.onChange(props.current - 1);
  const setPage = (num: number) => () => props.onChange(num);

  const activeClass = classNames(styles.paginationButton, styles.active);

  return (
    <div className={styles.container}>
      <div className={styles.paginationButton}>
        <span onClick={setPage(1)}>First</span>
      </div>

      <div className={styles.pageNumbers}>
        {props.current > 1 && (
          <PaginationHasPrev
            value={props.current - 1}
            onDecrement={decrement}
            onSet={setPage(props.current - 1)}
          />
        )}
        <div className={activeClass}>
          <span>{props.current}</span>
        </div>
        {props.hasNext && (
          <PaginationHasNext
            value={props.current + 1}
            onIncrement={increment}
            onSet={setPage(props.current + 1)}
          />
        )}
      </div>

      <div className={styles.paginationButton}>
        <span onClick={setPage(props.totalPages)}>Last</span>
      </div>
    </div>
  );
};

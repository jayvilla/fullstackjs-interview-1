import classNames from 'classnames';
import React from 'react';
import styles from './Pagination.module.scss';

export interface UsersTablePaginationProps {
  currentPage: number;
  usersPerPage: number;
  totalUsers: number;
  paginate(number: number): void;
}

export const UsersTablePagination = (props: UsersTablePaginationProps) => {
  const [pageNumbers, setPageNumbers] = React.useState<number[]>([1]);
  const [currentPageView, setCurrentPageView] = React.useState<number[]>([1, 2, 3, 4, 5]);

  React.useEffect(() => {
    let pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalUsers / props.usersPerPage); i++) {
      pageNumbers.push(i);
    }
    setPageNumbers(pageNumbers);
  }, []);

  React.useEffect(() => {
    let left = props.currentPage - 1;
    let middle = props.currentPage;
    let right = props.currentPage + 1;
    if (props.currentPage === 1) {
      left = 1;
      middle = 2;
      right = 3;
    }
    if (props.currentPage === pageNumbers.length - 1) {
      left = pageNumbers.length - 3;
      middle = pageNumbers.length - 2;
      right = pageNumbers.length - 1;
    }
    console.log(left, middle, right);
    setCurrentPageView([left, middle, right]);
  }, [props.currentPage]);

  const paginate = (number: number) => (
    e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>,
  ) => {
    props.paginate(number);
  };

  const canBePrev = props.currentPage !== 1;
  const canBeNext = props.currentPage !== pageNumbers.length - 1;

  return (
    <div className={styles.container}>
      <ul>
        <li>
          <button disabled={!canBePrev} onClick={paginate(props.currentPage - 1)}>
            Prev
          </button>
        </li>
        <li>
          <button disabled={props.currentPage === 1} onClick={paginate(1)}>
            First
          </button>
        </li>
        {currentPageView.map((number) => {
          const pageNumberClassName = classNames(
            styles.pageNumber,
            props.currentPage === number ? styles.active : '',
          );

          return (
            <li className={pageNumberClassName} key={number}>
              <a onClick={paginate(number)} href='#'>
                {number}
              </a>
            </li>
          );
        })}
        <li>
          <button
            disabled={props.currentPage === pageNumbers.length - 1}
            onClick={paginate(pageNumbers.length - 1)}
          >
            Last
          </button>
        </li>
        <li>
          <button disabled={!canBeNext} onClick={paginate(props.currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
      <p className={styles.subtext}>
        Page {props.currentPage} of {pageNumbers.length - 1}
      </p>
    </div>
  );
};

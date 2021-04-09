import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import styles from './Pagination.module.scss';

export interface PaginationHasNextProps {
  value: number;
  onSet(): void;
  onIncrement(): void;
}

export const PaginationHasNext = (props: PaginationHasNextProps) => {
  return (
    <>
      <div className={styles.paginationButton} onClick={props.onSet}>
        <span>{props.value}</span>
      </div>
      <div className={styles.ellipsis}>...</div>
      <div className={styles.paginationButton} onClick={props.onIncrement}>
        <ChevronRightRoundedIcon />
      </div>
    </>
  );
};

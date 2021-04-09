import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import styles from './Pagination.module.scss';

interface PaginationHasPrevProps {
  value: number;
  onSet(): void;
  onDecrement(): void;
}

export const PaginationHasPrev = (props: PaginationHasPrevProps) => {
  return (
    <>
      <div className={styles.paginationButton} onClick={props.onDecrement}>
        <ChevronLeftRoundedIcon />
      </div>
      {props.value >= 2 && <div className={styles.ellipsis}>...</div>}
      <div className={styles.paginationButton} onClick={props.onSet}>
        <span>{props.value}</span>
      </div>
    </>
  );
};

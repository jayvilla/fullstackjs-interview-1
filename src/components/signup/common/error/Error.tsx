import styles from './Error.module.scss';

export type ErrorProps = {
  message: string;
};

export const Error = (props: ErrorProps) => {
  return (
    <div className={styles.error} data-cy='signup-error'>
      {props.message}
    </div>
  );
};

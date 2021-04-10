import styles from './Search.module.scss';

export interface SearchProps {
  searchValue: string;
  searchColumns: string[];
  setSearchColumns(any): any;
  setSearchValue?(value: string): void;
}

export const Search = (props: SearchProps) => {
  const columns = ['firstName', 'lastName', 'email', 'phoneNumber'];

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          name='search'
          type='text'
          value={props.searchValue}
          placeholder='Search...'
          onChange={(e) => props.setSearchValue(e.target.value)}
        />
        <div className={styles.checkboxGroup}>
          {columns &&
            columns.map((column, i) => (
              <div key={i} className={styles.checkbox}>
                <label>
                  <input
                    type='checkbox'
                    checked={props.searchColumns.includes(column)}
                    onChange={(e) => {
                      const checked = props.searchColumns.includes(column);
                      props.setSearchColumns((prevState) =>
                        checked
                          ? prevState.filter((searchColumn) => searchColumn !== column)
                          : [...prevState, column],
                      );
                    }}
                  />
                  {column}
                </label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

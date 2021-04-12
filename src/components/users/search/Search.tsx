import { UsersContext } from '@src/context';
import React from 'react';
import styles from './Search.module.scss';

export const Search = () => {
  const columns = ['firstName', 'lastName', 'email', 'phoneNumber'];
  const {
    fetchUsers,
    setSearchValue,
    searchValue,
    searchColumns,
    setSearchColumns,
    search,
    users,
  } = React.useContext(UsersContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUsers();
    search(users);
  };

  const handleChange = (column: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = searchColumns.includes(column);
    setSearchColumns((prevState) =>
      checked
        ? prevState.filter((searchColumn) => searchColumn !== column)
        : [...prevState, column],
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formControl}>
            <input
              name='search'
              type='text'
              value={searchValue}
              placeholder='Search...'
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <input type='submit' value='Search' />
          </div>
          <div className={styles.checkboxGroup}>
            {columns &&
              columns.map((column, i) => (
                <div key={i} className={styles.checkbox}>
                  <label>
                    <input
                      type='checkbox'
                      checked={searchColumns.includes(column)}
                      onChange={handleChange(column)}
                    />
                    {column}
                  </label>
                </div>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};

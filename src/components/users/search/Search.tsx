import { User } from '@src/components/users/types';
import { UsersContext } from '@src/context';
import React from 'react';
import styles from './Search.module.scss';

type SearchProps = {
  searchValue?: string;
};

export const Search = (props: SearchProps) => {
  const [searchValue, setSearchValue] = React.useState('');

  const {
    searchColumns,
    setSearchColumns,
    setFilteredUsers,
    users,
    setLoading,
    setUsers,
  } = React.useContext(UsersContext);

  React.useEffect(() => {
    if (props && props.searchValue) {
      setSearchValue(props.searchValue);
    }
  });

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:9001/users`, {
      method: 'GET',
    });
    const users = await response.json();
    setUsers(users);
    setLoading(false);
  };

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUsers();
    search(users);
  };

  const handleCheckboxChange = (column: string) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = searchColumns.includes(column);
    setSearchColumns(checked, column);
  };

  const search = (users: User[]) => {
    if (!searchColumns.length) return users;

    const filteredUsers = users.filter((user) =>
      searchColumns.some(
        (column) =>
          user[column].toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1,
      ),
    );

    setFilteredUsers(filteredUsers);
  };

  const columnFilters = ['firstName', 'lastName', 'email', 'phoneNumber'];

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
              onChange={handleOnSearchChange}
            />
            <input type='submit' value='Search' />
          </div>
          <div className={styles.checkboxGroup}>
            {columnFilters &&
              columnFilters.map((column, i) => (
                <div key={i} className={styles.checkbox}>
                  <label>
                    <input
                      type='checkbox'
                      checked={searchColumns.includes(column)}
                      onChange={handleCheckboxChange(column)}
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

import { User } from '@src/components/users/types';
import { UsersContext } from '@src/context';
import React from 'react';
import styles from './Search.module.scss';

type SearchProps = {
  searchValue?: string;
  fetchUsers?(): void;
};

export const Search = (props: SearchProps) => {
  const [searchValue, setSearchValue] = React.useState(props.searchValue || '');
  const [searchFilter, setsearchFilter] = React.useState('firstName');
  const [error, setError] = React.useState<boolean>(false);

  const { users, setUsers } = React.useContext(UsersContext);

  React.useEffect(() => {
    if (props.searchValue) {
      setSearchValue(props.searchValue);
    }
  }, [props.searchValue]);

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search(users);
  };

  const handleCheckboxChange = (filter: string) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (filter === searchFilter) {
      filter = '';
    }
    setsearchFilter(filter);
  };

  const search = async (users: User[]) => {
    if (!searchValue || !searchFilter) {
      props.fetchUsers();
      return;
    }

    try {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const body = {};
      body[searchFilter] = searchValue;

      const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      };

      const response = await fetch('http://localhost:9001/users/search', requestOptions);
      const filteredUsers = await response.json();

      if (response.ok) {
        setUsers(filteredUsers);
      }
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const columnFilters = ['firstName', 'lastName', 'email', 'phoneNumber'];

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <form onSubmit={handleOnSubmit}>
          <div className={styles.formControl}>
            <input
              name='search'
              type='text'
              value={searchValue}
              placeholder='Search...'
              onChange={handleOnInputChange}
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
                      checked={searchFilter === column}
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

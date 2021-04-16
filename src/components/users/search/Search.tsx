import { User } from '@src/components/users/types';
import { UsersContext } from '@src/context';
import React from 'react';
import styles from './Search.module.scss';

type SearchProps = {
  users?: User[];
  searchValue?: string;
  filteredUsers?: User[];
  setFilteredUsers?(users: User[]): void;
};

export const Search = (props: SearchProps) => {
  const [searchValue, setSearchValue] = React.useState('');
  const [searchFilter, setsearchFilter] = React.useState('firstName');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const { setUsers } = React.useContext(UsersContext);

  React.useEffect(() => {
    if (props && props.searchValue) {
      setSearchValue(props.searchValue);
    }
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:9001/users`, {
        method: 'GET',
      });
      const users = await response.json();
      setUsers(users);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const handleOnSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchUsers();
    search(props.users);
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
    if (!searchFilter || !searchValue) return props.setFilteredUsers(null);

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
        props.setFilteredUsers(filteredUsers);
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

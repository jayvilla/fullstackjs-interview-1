import React from 'react';

export interface User {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
}

export const defaultUser = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
};

export const useUser = (id) => {
  const [user, setUser] = React.useState<User>(defaultUser);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:9001/users/${id}`, {
        method: 'GET',
      });
      const user = await response.json();
      setUser((prevState) => ({
        ...user,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  return user;
};

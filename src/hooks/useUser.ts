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

export const useUser = (id: string): { user: User | null; error: string } => {
  const [user, setUser] = React.useState<User>();
  const [error, setError] = React.useState();

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:9001/users/${id}`, {
        method: 'GET',
      });
      const user = await response.json();
      setUser(user);
    } catch (e) {
      console.log(e);
      setUser(null);
      setError(e.message);
    }
  };

  return { user, error };
};

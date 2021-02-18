import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';

export type LogoutBtnProps = {
  children?: string;
};

export const LogoutBtn = (props: LogoutBtnProps) => {
  const router = useRouter();
  const [error, setError] = React.useState<string>();

  const handleLogout = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setError(null);
    try {
      const response = await fetch('/api/logout');
      if (!response.ok) {
        throw new Error(`Couldn't log out`);
      }
      router.push('/login');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <Button onClick={handleLogout} variant='contained' color='secondary'>
        {props.children}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

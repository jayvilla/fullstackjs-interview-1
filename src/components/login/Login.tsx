import { Button, FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { DefaultFormValues } from './constants';
import styles from './Login.module.scss';
import { FormValues } from './types';

export const Login = () => {
  const router = useRouter();
  const [error, setError] = React.useState<string>();
  const [formValues, setFormValues] = React.useState<FormValues>(DefaultFormValues);

  const handleChangeFormValues = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [key]: e.target.value,
    });
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  const handleLogin = async (e?: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e?.preventDefault();
    setError(null);
    try {
      const response = await fetch(`/api/authenticate`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(json));
      }
      router.push('/dashboard');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.formContainer}>
        <h1>Login</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <FormControl className={styles.formControl}>
              <InputLabel htmlFor='input-with-icon-adornment'>Email</InputLabel>
              <Input
                id='input-with-icon-adornment'
                onChange={handleChangeFormValues('email')}
                value={formValues.email}
                fullWidth
                startAdornment={
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                }
                data-cy='login-input-email'
              />
            </FormControl>
          </div>
          <div className={styles.inputGroup}>
            <FormControl className={styles.formControl}>
              <InputLabel htmlFor='input-with-icon-adornment'>Password</InputLabel>
              <Input
                id='input-with-icon-adornment'
                type='password'
                onChange={handleChangeFormValues('password')}
                value={formValues.password}
                fullWidth
                startAdornment={
                  <InputAdornment position='start'>
                    <Lock />
                  </InputAdornment>
                }
                data-cy='login-input-password'
              />
            </FormControl>
          </div>
          <div className={styles.btnGroup}>
            <Button variant='contained' onClick={handleSignUp}>
              Sign Up
            </Button>
            <Button type='submit' variant='contained' onClick={handleLogin} color='primary'>
              Login
            </Button>
          </div>
          <div>{error && <p style={{ color: 'red' }}>{error}</p>}</div>
        </form>
      </div>
    </div>
  );
};

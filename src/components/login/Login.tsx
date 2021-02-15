import { FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';
import React from 'react';
import styles from './Login.module.scss';

export const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles.formContainer}>
        <h1>Login</h1>
        <form>
          <div className={styles.formControl}>
            <FormControl>
              <InputLabel htmlFor='input-with-icon-adornment'>Email</InputLabel>
              <Input
                id='input-with-icon-adornment'
                startAdornment={
                  <InputAdornment position='start'>
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className={styles.formControl}>
            <FormControl>
              <InputLabel htmlFor='input-with-icon-adornment'>Password</InputLabel>
              <Input
                id='input-with-icon-adornment'
                type='password'
                startAdornment={
                  <InputAdornment position='start'>
                    <Lock />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </form>
      </div>
    </div>
  );
};

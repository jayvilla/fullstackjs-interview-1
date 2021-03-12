import React from 'react';
import { defaultSignUpFormValues } from './constants';
import styles from './Signup.module.scss';
import { SignUpFormValues } from './types';

export const Signup = () => {
  const [formValues, setFormValues] = React.useState<SignUpFormValues>(
    defaultSignUpFormValues,
  );

  const handleFormChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [key]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            name='firstName'
            type='text'
            placeholder='First name'
            value={formValues.firstName}
            onChange={handleFormChange('firstName')}
            className={styles.formControl}
            data-cy='input-firstName'
          />
        </div>

        <div className={styles.formGroup}>
          <input
            name='lastName'
            type='text'
            placeholder='Last name'
            value={formValues.lastName}
            onChange={handleFormChange('lastName')}
            className={styles.formControl}
            data-cy='input-lastName'
          />
        </div>

        <div className={styles.formGroup}>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={formValues.email}
            onChange={handleFormChange('email')}
            className={styles.formControl}
            data-cy='input-email'
          />
        </div>

        <div className={styles.formGroup}>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={formValues.password}
            onChange={handleFormChange('password')}
            className={styles.formControl}
            data-cy='input-password'
          />
        </div>

        <div className={styles.formGroup}>
          <input
            disabled={formValues.password.length < 8}
            name='confirmPassword'
            type='password'
            placeholder='Confirm Password'
            value={formValues.confirmPassword}
            onChange={handleFormChange('confirmPassword')}
            className={styles.formControl}
            data-cy='input-confirmPassword'
          />
        </div>

        <div className={styles.formGroup}>
          <input
            name='phoneNumber'
            type='text'
            placeholder='Phone Number'
            value={formValues.phoneNumber}
            onChange={handleFormChange('phoneNumber')}
            className={styles.formControl}
            data-cy='input-phoneNumber'
          />
        </div>

        <div className={styles.formGroup}>
          <input type='submit' className={styles.formControl} />
        </div>
      </form>
    </div>
  );
};

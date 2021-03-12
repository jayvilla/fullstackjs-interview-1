import { Error } from '@src/components/signup/common/error';
import React from 'react';
import { defaultSignUpFormErrors, defaultSignUpFormValues, errorMessages } from './constants';
import { UserAPI } from './lib';
import styles from './Signup.module.scss';
import { SignUpFormErrors, SignUpFormValues } from './types';
import { VALIDATION_REGEX } from './utils';

export const Signup = () => {
  const [formValues, setFormValues] = React.useState<SignUpFormValues>(
    defaultSignUpFormValues,
  );

  const [formErrors, setFormErrors] = React.useState<SignUpFormErrors>(
    defaultSignUpFormErrors,
  );

  const handleFormChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [key]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validForm = validateForm();

    if (!validForm) return;

    const response = await UserAPI.createUser(formValues);
    const json = await response.json();
    console.log(json);
  };

  const validateForm = () => {
    const firstNameValid = formValues.firstName.match(VALIDATION_REGEX['notEmpty'])
      ? true
      : false;
    const lastNameValid = formValues.lastName.match(VALIDATION_REGEX['notEmpty'])
      ? true
      : false;
    const emailValid = formValues.email.match(VALIDATION_REGEX['email']) ? true : false;
    const passwordValid = formValues.password.match(VALIDATION_REGEX['password'])
      ? true
      : false;
    const confirmPasswordValid = formValues.password === formValues.confirmPassword;
    const phoneNumberValid = formValues.phoneNumber.match(VALIDATION_REGEX['phoneNumber'])
      ? true
      : false;

    setFormErrors((prevState) => ({
      ...prevState,
      firstName: {
        error: !firstNameValid,
        message: !firstNameValid ? errorMessages.firstName : '',
      },
      lastName: {
        error: !lastNameValid,
        message: !lastNameValid ? errorMessages.lastName : '',
      },
      email: {
        error: !emailValid,
        message: !emailValid ? errorMessages.email : '',
      },
      password: {
        error: !passwordValid,
        message: !passwordValid ? errorMessages.password : '',
      },
      confirmPassword: {
        error: !confirmPasswordValid,
        message: !confirmPasswordValid ? errorMessages.confirmPassword : '',
      },
      phoneNumber: {
        error: !phoneNumberValid,
        message: !phoneNumberValid ? errorMessages.phoneNumber : '',
      },
    }));

    console.log('firstName valid: ', firstNameValid);
    console.log('lastName valid: ', lastNameValid);
    console.log('email valid: ', emailValid);
    console.log('password valid: ', passwordValid);
    console.log('confirmPassword valid: ', confirmPasswordValid);
    console.log('phoneNumber valid: ', firstNameValid);

    return (
      firstNameValid &&
      lastNameValid &&
      emailValid &&
      passwordValid &&
      confirmPasswordValid &&
      phoneNumberValid
    );
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
          {formErrors.firstName.error && formErrors.firstName.message && (
            <Error message={formErrors.firstName.message} />
          )}
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
          {formErrors.lastName.error && formErrors.lastName.message && (
            <Error message={formErrors.lastName.message} />
          )}
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
          {formErrors.email.error && formErrors.email.message && (
            <Error message={formErrors.email.message} />
          )}
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
          {formErrors.password.error && formErrors.password.message && (
            <Error message={formErrors.password.message} />
          )}
        </div>

        <div className={styles.formGroup}>
          <input
            name='confirmPassword'
            type='password'
            placeholder='Confirm Password'
            value={formValues.confirmPassword}
            onChange={handleFormChange('confirmPassword')}
            className={styles.formControl}
            data-cy='input-confirmPassword'
          />
          {formErrors.confirmPassword.error && formErrors.confirmPassword.message && (
            <Error message={formErrors.confirmPassword.message} />
          )}
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
          {formErrors.phoneNumber.error && formErrors.phoneNumber.message && (
            <Error message={formErrors.phoneNumber.message} />
          )}
        </div>

        <div className={styles.formGroup}>
          <input type='submit' className={styles.formControl} />
        </div>
      </form>
    </div>
  );
};

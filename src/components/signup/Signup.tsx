import { Error } from '@src/components/signup/common/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import {
  defaultFormMessage,
  defaultSignUpFormErrors,
  defaultSignUpFormValues,
  errorMessages,
} from './constants';
import { AuthAPI, UserAPI } from './lib';
import styles from './Signup.module.scss';
import { FormMessage, SignUpFormErrors, SignUpFormValues, User } from './types';
import { VALIDATION_REGEX } from './utils';

export const Signup = () => {
  const router = useRouter();

  const [formValues, setFormValues] = React.useState<SignUpFormValues>(
    defaultSignUpFormValues,
  );

  const [formErrors, setFormErrors] = React.useState<SignUpFormErrors>(
    defaultSignUpFormErrors,
  );

  const [formMessage, setFormMessage] = React.useState<FormMessage>(defaultFormMessage);

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

    try {
      const response = await UserAPI.createUser(formValues);
      const user = await response.json();
      if (!response.ok) {
        console.log(response);
        console.log(user);
        const key = Object.keys(user.keyValue)[0];
        const value = user.keyValue[key];
        setFormMessage((prevState) => ({
          ...prevState,
          error: true,
          message: `${user.message} ${key}: ${value} already in use.`,
        }));
        return;
      }
      setFormValues(defaultSignUpFormValues);
      setFormMessage((prevState) => ({
        ...prevState,
        error: false,
        message: 'User successfully created.',
      }));
      login(user);
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (user: User) => {
    try {
      const response = await AuthAPI.login({ email: user.email, password: user.password });
      const json = await response.json();

      if (!response.ok) {
        console.log(json.message);
        return;
      }

      router.push('/dashboard');
    } catch (e) {
      console.log(e.message);
    }
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
    console.log(formValues.password);
    console.log(formValues.confirmPassword);
    const confirmPasswordValid =
      formValues.password === formValues.confirmPassword ? true : false;
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
    <Container className={styles.container}>
      <Row>
        <Col xs={0} sm={4}></Col>
        <Col xs={12} sm={8} className={styles.formContainer}>
          <h1>Create Account</h1>
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
              <button type='submit'>Sign Up</button>
            </div>

            <div className={styles.formGroup}>
              {formMessage.message && (
                <div
                  className={[
                    styles.formMessage,
                    formMessage.error ? styles.error : styles.success,
                  ].join(' ')}
                  data-cy='form-message'
                >
                  {formMessage.message}
                </div>
              )}
            </div>

            <div className={[styles.formGroup, styles.signIn].join(' ')}>
              <p>
                Already have an account?{'  '}
                <span>
                  <Link href='/login'>Sign in</Link>
                </span>
              </p>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

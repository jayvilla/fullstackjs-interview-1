import { Error } from '@src/components/signup/common/error';
import { UsersContext } from '@src/context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { AuthAPI, UserAPI } from '../../lib/lib';
import { VALIDATION_REGEX } from '../../utils/utils';
import {
  defaultFormMessage,
  defaultSignUpFormErrors,
  defaultSignUpFormValues,
  errorMessages,
} from './constants';
import styles from './Signup.module.scss';
import { FormMessage, SignUpFormErrors, SignUpFormValues, User } from './types';

type SignupProps = {
  buttonText?: string;
  titleText?: string;
  handleOnSubmit?(): void;
};

export const Signup = (props: SignupProps) => {
  const router = useRouter();
  const { setUsers } = React.useContext(UsersContext);

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

      if (props.handleOnSubmit) {
        fetchUsers();
        props.handleOnSubmit();
        return;
      }

      login(user);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:9001/users`, {
        method: 'GET',
      });
      const users = await response.json();
      setUsers(users);
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
    let isFirstNameValid,
      isLastNameValid,
      isEmailValid,
      isPasswordValid,
      isConfirmPasswordValid,
      isPhoneNumberValid;
    for (let field in formValues) {
      switch (field) {
        case 'firstName': {
          isFirstNameValid = !!formValues.firstName.match(VALIDATION_REGEX['notEmpty']);
        }
        case 'lastName': {
          isLastNameValid = !!formValues.lastName.match(VALIDATION_REGEX['notEmpty']);
        }
        case 'email': {
          isEmailValid = !!formValues.email.match(VALIDATION_REGEX['email']);
        }
        case 'password': {
          isPasswordValid = !!formValues.password.match(VALIDATION_REGEX['password']);
        }
        case 'confirmPassword': {
          isConfirmPasswordValid = formValues.password === formValues.confirmPassword;
        }
        case 'phoneNumber': {
          isPhoneNumberValid = !!formValues.phoneNumber.match(VALIDATION_REGEX['phoneNumber']);
        }
      }
    }

    setFormErrors((prevState) => ({
      ...prevState,
      firstName: {
        error: !isFirstNameValid,
        message: !isFirstNameValid ? errorMessages.firstName : '',
      },
      lastName: {
        error: !isLastNameValid,
        message: !isLastNameValid ? errorMessages.lastName : '',
      },
      email: {
        error: !isEmailValid,
        message: !isEmailValid ? errorMessages.email : '',
      },
      password: {
        error: !isPasswordValid,
        message: !isPasswordValid ? errorMessages.password : '',
      },
      confirmPassword: {
        error: !isConfirmPasswordValid,
        message: !isConfirmPasswordValid ? errorMessages.confirmPassword : '',
      },
      phoneNumber: {
        error: !isPhoneNumberValid,
        message: !isPhoneNumberValid ? errorMessages.phoneNumber : '',
      },
    }));

    return (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      isPhoneNumberValid
    );
  };

  const titleText = props.titleText || 'Create Account';
  const buttonText = props.buttonText || 'Sign Up';

  return (
    <Container className={styles.container}>
      <Row>
        <Col xs={0} sm={4} className={styles.block}></Col>
        <Col xs={12} sm={8} className={styles.formContainer}>
          <h1>{titleText}</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                name='firstName'
                type='text'
                value={formValues.firstName}
                onChange={handleFormChange('firstName')}
                className={styles.formControl}
                data-cy='input-firstName'
                required
              />
              <label htmlFor='firstName'>First name</label>
              {formErrors.firstName.error && formErrors.firstName.message && (
                <Error message={formErrors.firstName.message} />
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                name='lastName'
                type='text'
                value={formValues.lastName}
                onChange={handleFormChange('lastName')}
                className={styles.formControl}
                data-cy='input-lastName'
                required
              />
              <label htmlFor='lastName'>Last name</label>
              {formErrors.lastName.error && formErrors.lastName.message && (
                <Error message={formErrors.lastName.message} />
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                name='email'
                type='text'
                value={formValues.email}
                onChange={handleFormChange('email')}
                className={styles.formControl}
                data-cy='input-email'
                required
              />
              <label htmlFor='email'>Email</label>
              {formErrors.email.error && formErrors.email.message && (
                <Error message={formErrors.email.message} />
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                name='password'
                type='password'
                value={formValues.password}
                onChange={handleFormChange('password')}
                className={styles.formControl}
                data-cy='input-password'
                required
              />
              <label htmlFor='password'>Password</label>
              {formErrors.password.error && formErrors.password.message && (
                <Error message={formErrors.password.message} />
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                name='confirmPassword'
                type='password'
                value={formValues.confirmPassword}
                onChange={handleFormChange('confirmPassword')}
                className={styles.formControl}
                data-cy='input-confirmPassword'
                required
              />
              <label htmlFor='confirmPassword'>Confirm password</label>
              {formErrors.confirmPassword.error && formErrors.confirmPassword.message && (
                <Error message={formErrors.confirmPassword.message} />
              )}
            </div>

            <div className={styles.formGroup}>
              <input
                name='phoneNumber'
                type='text'
                value={formValues.phoneNumber}
                onChange={handleFormChange('phoneNumber')}
                className={styles.formControl}
                data-cy='input-phoneNumber'
                required
              />
              <label htmlFor='phoneNumber'>Phone</label>
              {formErrors.phoneNumber.error && formErrors.phoneNumber.message && (
                <Error message={formErrors.phoneNumber.message} />
              )}
            </div>

            <div className={styles.formGroup}>
              <button type='submit'>{buttonText}</button>
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
              {(!props.titleText || !props.buttonText) && (
                <p>
                  Already have an account?{'  '}
                  <span>
                    <Link href='/login'>Sign in</Link>
                  </span>
                </p>
              )}
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

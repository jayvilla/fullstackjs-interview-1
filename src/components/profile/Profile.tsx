import { UserAPI } from '@src/lib/lib';
import { VALIDATION_REGEX } from '@src/utils/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Col, Row } from 'react-grid-system';
import { Error } from './common';
import {
  defaultFormErrors,
  defaultFormMessage,
  defaultFormValues,
  errorMessages,
} from './constants';
import styles from './Profile.module.scss';
import { FormErrors, FormMessage, FormValues, ProfileProps } from './types';

export const Profile = (props: ProfileProps) => {
  const router = useRouter();
  const [formValues, setFormValues] = React.useState<FormValues>(defaultFormValues);
  const [formErrors, setFormErrors] = React.useState<FormErrors>(defaultFormErrors);
  const [formMessage, setFormMessage] = React.useState<FormMessage>(defaultFormMessage);
  const [loading, setLoading] = React.useState<Boolean>(false);

  React.useEffect(() => {
    setFormValues({
      ...formValues,
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      phoneNumber: props.user.phoneNumber,
      email: props.user.email,
    });
  }, []);

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
      const response = await UserAPI.updateUser(formValues, props.user.id);
      console.log(response);
      const json = await response.json();

      if (response.ok) {
        setFormMessage({
          error: false,
          message: 'Profile successfully updated.',
        });
        router.reload();
      }

      if (!response.ok) {
        setFormMessage({
          error: true,
          message: `Error: Profile not updated - ${json.message[0]}`,
        });
      }
      console.log(json);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/logout');
      if (!response.ok) {
        throw new Error('Could not log out');
      }
      router.push('/login');
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
      phoneNumber: {
        error: !phoneNumberValid,
        message: !phoneNumberValid ? errorMessages.phoneNumber : '',
      },
    }));

    return firstNameValid && lastNameValid && emailValid && phoneNumberValid;
  };

  return (
    <div className={styles.container}>
      <header>
        <Row>
          <Col className={styles.headerLeft} md={6}>
            <ul>
              <li>
                <Link href='/dashboard'>
                  <span>Dashboard</span>
                </Link>
              </li>
            </ul>
          </Col>
          <Col className={styles.headerRight} md={6}>
            <ul>
              <li>{props.user.firstName}'s Profile</li>
              <li>
                <span onClick={handleLogout}>Logout</span>
              </li>
            </ul>
          </Col>
        </Row>
      </header>

      <h1>Edit Profile</h1>

      {loading && <div>Loading</div>}

      {!loading && (
        <form onSubmit={handleSubmit}>
          <div className={styles.formControl}>
            <label htmlFor='firstName'>First Name</label>
            <input
              name='firstName'
              type='text'
              value={formValues.firstName}
              onChange={handleFormChange('firstName')}
              data-cy='profile-firstName'
            />
            {formErrors.firstName.error && formErrors.firstName.message && (
              <Error message={formErrors.firstName.message} />
            )}
          </div>

          <div className={styles.formControl}>
            <label htmlFor='lastName'>Last Name</label>
            <input
              name='lastName'
              type='text'
              value={formValues.lastName}
              onChange={handleFormChange('lastName')}
              data-cy='profile-lastName'
            />
            {formErrors.lastName.error && formErrors.lastName.message && (
              <Error message={formErrors.lastName.message} />
            )}
          </div>

          <div className={styles.formControl}>
            <label htmlFor='phoneNumber'>Phone Number</label>
            <input
              name='phoneNumber'
              type='text'
              value={formValues.phoneNumber}
              onChange={handleFormChange('phoneNumber')}
              data-cy='profile-phoneNumber'
            />
            {formErrors.phoneNumber.error && formErrors.phoneNumber.message && (
              <Error message={formErrors.phoneNumber.message} />
            )}
          </div>

          <div className={styles.formControl}>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              value={formValues.email}
              onChange={handleFormChange('email')}
              data-cy='profile-email'
            />
            {formErrors.email.error && formErrors.email.message && (
              <Error message={formErrors.email.message} />
            )}
          </div>

          <div className={styles.formControl}>
            <button type='submit'>Save Profile</button>
          </div>

          {!formMessage.error && formMessage.message && (
            <div
              data-cy='form-message'
              className={styles.formMessage}
              style={{ color: 'green' }}
            >
              {formMessage.message}
            </div>
          )}
          {formMessage.error && formMessage.message && (
            <div
              data-cy='form-message'
              className={styles.formMessage}
              style={{ color: 'red' }}
            >
              {formMessage.message}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

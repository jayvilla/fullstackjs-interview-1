import { UserAPI } from '@src/lib/lib';
import { VALIDATION_REGEX } from '@src/utils/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Col, Row } from 'react-grid-system';
import { Error } from './common';
import { defaultFormErrors, defaultFormValues, errorMessages } from './constants';
import styles from './Profile.module.scss';
import { FormErrors, FormValues, ProfileProps } from './types';

export interface FormMessage {
  error: boolean;
  message: string;
}

export const defaultFormMessage = {
  error: false,
  message: '',
};

export const Profile = (props: ProfileProps) => {
  const router = useRouter();
  const [formValues, setFormValues] = React.useState<FormValues>(defaultFormValues);
  const [formErrors, setFormErrors] = React.useState<FormErrors>(defaultFormErrors);
  const [formMessage, setFormMessage] = React.useState<FormMessage>(defaultFormMessage);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await UserAPI.findUserByID(props.user.id);
    const user = await response.json();

    setFormValues({
      ...formValues,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    });
  };

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
        throw new Error(`Couldn't log out`);
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
              <li>Profile</li>
              <li>
                <span onClick={handleLogout}>Logout</span>
              </li>
            </ul>
          </Col>
        </Row>
      </header>

      <h1>Edit Profile</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.formControl}>
          <label htmlFor='firstName'>First Name</label>
          <input
            name='firstName'
            type='text'
            value={formValues.firstName}
            onChange={handleFormChange('firstName')}
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
          />
          {formErrors.email.error && formErrors.email.message && (
            <Error message={formErrors.email.message} />
          )}
        </div>

        <div className={styles.formControl}>
          <button type='submit'>Save Profile</button>
        </div>

        {!formMessage.error && formMessage.message && (
          <div style={{ fontSize: '12px', color: 'green' }}>{formMessage.message}</div>
        )}
        {formMessage.error && formMessage.message && (
          <div style={{ fontSize: '12px', color: 'red' }}>{formMessage.message}</div>
        )}
      </form>
    </div>
  );
};

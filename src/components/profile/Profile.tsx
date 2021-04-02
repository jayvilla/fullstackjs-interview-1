import { UserAPI } from '@src/lib/lib';
import { VALIDATION_REGEX } from '@src/utils/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Col, Row } from 'react-grid-system';
import { useUser } from '../../hooks';
import { Error } from './common';
import {
  defaultProfileErrors,
  defaultProfileMessage,
  defaultUserProfile,
  errorMessages,
} from './constants';
import styles from './Profile.module.scss';
import { ProfileErrors, ProfileMessage, ProfileProps, UserProfile } from './types';

export const Profile = (props: ProfileProps) => {
  const router = useRouter();
  const [userProfile, setUserProfile] = React.useState<UserProfile>(defaultUserProfile);
  const [profileErrors, setProfileErrors] = React.useState<ProfileErrors>(
    defaultProfileErrors,
  );
  const [profileMessage, setProfileMessage] = React.useState<ProfileMessage>(
    defaultProfileMessage,
  );
  const [loading, setLoading] = React.useState<Boolean>(false);

  const user = useUser(props.user.id);

  React.useEffect(() => {
    setUserProfile({
      ...userProfile,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    });
  }, [user]);

  const handleFormChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfile({
      ...userProfile,
      [key]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validForm = validateForm();

    if (!validForm) return;

    try {
      const response = await UserAPI.updateUser(userProfile, props.user.id);
      const json = await response.json();

      if (response.ok) {
        setProfileMessage({
          error: false,
          message: 'Profile successfully updated.',
        });
      }
    } catch (e) {
      setProfileMessage({
        error: true,
        message: `Error: Profile not updated - ${e.message}`,
      });
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/logout');
      if (response.ok) {
        router.push('/login');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const validateForm = () => {
    let isFirstNameValid, isLastNameValid, isEmailValid, isPhoneNumberValid;
    for (let profileField in userProfile) {
      switch (profileField) {
        case 'firstName': {
          isFirstNameValid = !!userProfile.firstName.match(VALIDATION_REGEX['notEmpty']);
        }
        case 'lastName': {
          isLastNameValid = !!userProfile.lastName.match(VALIDATION_REGEX['notEmpty']);
        }
        case 'email': {
          isEmailValid = !!userProfile.email.match(VALIDATION_REGEX['email']);
        }
        case 'phoneNumber': {
          isPhoneNumberValid = !!userProfile.phoneNumber.match(
            VALIDATION_REGEX['phoneNumber'],
          );
        }
      }
    }

    setProfileErrors((prevState) => ({
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
      phoneNumber: {
        error: !isPhoneNumberValid,
        message: !isPhoneNumberValid ? errorMessages.phoneNumber : '',
      },
    }));

    return isFirstNameValid && isLastNameValid && isEmailValid && isPhoneNumberValid;
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

      {loading && <div>Loading</div>}

      {!loading && (
        <form onSubmit={handleSubmit}>
          <div className={styles.formControl}>
            <label htmlFor='firstName'>First Name</label>
            <input
              name='firstName'
              type='text'
              value={userProfile.firstName}
              onChange={handleFormChange('firstName')}
              data-cy='profile-firstName'
            />
            {profileErrors.firstName.error && profileErrors.firstName.message && (
              <Error message={profileErrors.firstName.message} />
            )}
          </div>

          <div className={styles.formControl}>
            <label htmlFor='lastName'>Last Name</label>
            <input
              name='lastName'
              type='text'
              value={userProfile.lastName}
              onChange={handleFormChange('lastName')}
              data-cy='profile-lastName'
            />
            {profileErrors.lastName.error && profileErrors.lastName.message && (
              <Error message={profileErrors.lastName.message} />
            )}
          </div>

          <div className={styles.formControl}>
            <label htmlFor='phoneNumber'>Phone Number</label>
            <input
              name='phoneNumber'
              type='text'
              value={userProfile.phoneNumber}
              onChange={handleFormChange('phoneNumber')}
              data-cy='profile-phoneNumber'
            />
            {profileErrors.phoneNumber.error && profileErrors.phoneNumber.message && (
              <Error message={profileErrors.phoneNumber.message} />
            )}
          </div>

          <div className={styles.formControl}>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              value={userProfile.email}
              onChange={handleFormChange('email')}
              data-cy='profile-email'
            />
            {profileErrors.email.error && profileErrors.email.message && (
              <Error message={profileErrors.email.message} />
            )}
          </div>

          <div className={styles.formControl}>
            <button type='submit'>Save Profile</button>
          </div>

          {!profileMessage.error && profileMessage.message && (
            <div
              data-cy='form-message'
              className={styles.formMessage}
              style={{ color: 'green' }}
            >
              {profileMessage.message}
            </div>
          )}
          {profileMessage.error && profileMessage.message && (
            <div
              data-cy='form-message'
              className={styles.formMessage}
              style={{ color: 'red' }}
            >
              {profileMessage.message}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

import { ErrorMessages, ProfileErrors, ProfileMessage, UserProfile } from './types';

export const defaultUserProfile: UserProfile = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
};

export const errorMessages: ErrorMessages = {
  firstName: 'First name cannot be blank.',
  lastName: 'Last name cannot be blank.',
  email: 'Please enter valid email address (e.g. bob@builder.com)',
  phoneNumber: 'Please enter valid phone number (e.g. +12223334444)',
};

export const defaultProfileErrors: ProfileErrors = {
  firstName: {
    error: false,
    message: '',
  },
  lastName: {
    error: false,
    message: '',
  },
  email: {
    error: false,
    message: '',
  },
  phoneNumber: {
    error: false,
    message: '',
  },
};

export const defaultProfileMessage: ProfileMessage = {
  error: false,
  message: '',
};

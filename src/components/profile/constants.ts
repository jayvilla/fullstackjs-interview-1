import { ErrorMessages, FormErrors, FormValues } from './types';

export const defaultFormValues: FormValues = {
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

export const defaultFormErrors: FormErrors = {
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

export const defaultFormMessage = {
  error: false,
  message: '',
};

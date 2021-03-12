import { ErrorMessages, FormMessage, SignUpFormErrors, SignUpFormValues } from './types';

export const defaultSignUpFormValues: SignUpFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
};

export const defaultSignUpFormErrors: SignUpFormErrors = {
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
  password: {
    error: false,
    message: '',
  },
  confirmPassword: {
    error: false,
    message: '',
  },
  phoneNumber: {
    error: false,
    message: '',
  },
};

export const errorMessages: ErrorMessages = {
  firstName: 'First name cannot be blank.',
  lastName: 'Last name cannot be blank.',
  email: 'Please enter valid email address (e.g. bob@builder.com)',
  password: 'Must be at least 8 characters. 1 Upper. 1 Lower. 1 Special.',
  confirmPassword: 'Passwords do not match.',
  phoneNumber: 'Please enter valid phone number (e.g. +12223334444)',
};

export const defaultFormMessage: FormMessage = {
  error: false,
  message: '',
};

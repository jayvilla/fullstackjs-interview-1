export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ProfileProps = {
  user: User;
};

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface ErrorMessages {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export type ProfileErrors = {
  firstName: ProfileFieldError;
  lastName: ProfileFieldError;
  email: ProfileFieldError;
  phoneNumber: ProfileFieldError;
};

export type ProfileFieldError = {
  error: boolean;
  message: string;
};

export interface ProfileMessage {
  error: boolean;
  message: string;
}

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export type ProfileProps = {
  user: User;
};

export interface FormValues {
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

export type FormErrors = {
  firstName: FormFieldError;
  lastName: FormFieldError;
  email: FormFieldError;
  phoneNumber: FormFieldError;
};

export type FormFieldError = {
  error: boolean;
  message: string;
};

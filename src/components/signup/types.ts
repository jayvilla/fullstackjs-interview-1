export type SignUpFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
};

export type SignUpFormErrors = {
  firstName: SignUpFormFieldError;
  lastName: SignUpFormFieldError;
  email: SignUpFormFieldError;
  password: SignUpFormFieldError;
  confirmPassword: SignUpFormFieldError;
  phoneNumber: SignUpFormFieldError;
};

export type SignUpFormFieldError = {
  error: boolean;
  message: string;
};

export type ErrorMessages = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
};

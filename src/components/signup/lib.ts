import fetch, { Response } from 'node-fetch';
import { LoginParams, SignUpFormValues } from './types';

export const UserAPI = {
  createUser: async (formValues: SignUpFormValues): Promise<Response> => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      phoneNumber: formValues.phoneNumber,
    });

    const requestOptions = {
      method: 'POST',
      headers,
      body,
    };
    return fetch('http://localhost:9001/users', requestOptions);
  },
};

export const AuthAPI = {
  login: async (loginParams: LoginParams): Promise<Response> => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify(loginParams);

    const requestOptions = {
      method: 'POST',
      headers,
      body,
    };
    return fetch(`/api/authenticate`, requestOptions);
  },
};

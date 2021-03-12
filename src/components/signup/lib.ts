import fetch, { Response } from 'node-fetch';
import { SignUpFormValues } from './types';

export const UserAPI = {
  createUser: async (formValues: SignUpFormValues): Promise<Response> => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    delete formValues.confirmPassword;

    const body = JSON.stringify(formValues);
    const requestOptions = {
      method: 'POST',
      headers,
      body,
    };
    return fetch('http://localhost:9001/users', requestOptions);
  },
};

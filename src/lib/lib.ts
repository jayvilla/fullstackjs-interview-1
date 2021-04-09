import { User } from '@src/components/profile/types';
import fetch, { Response } from 'node-fetch';
import { LoginParams, SignUpFormValues } from '../components/signup/types';

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
  updateUser: async (updatedUser: User, id: string): Promise<Response> => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
    });

    const requestOptions = {
      method: 'POST',
      headers,
      body,
    };

    const requestURL = `http://localhost:9001/users/${id}`;

    return fetch(requestURL, requestOptions);
  },
  findUserByID: async (id: string): Promise<Response> => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'GET',
      headers,
    };

    const requestURL = `http://localhost:9001/users/${id}`;

    return fetch(requestURL, requestOptions);
  },
  deleteUserById: async (id: string): Promise<Response> => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'DELETE',
      headers,
    };

    const requestURL = `http://localhost:9001/users/${id}`;

    return fetch(requestURL, requestOptions);
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

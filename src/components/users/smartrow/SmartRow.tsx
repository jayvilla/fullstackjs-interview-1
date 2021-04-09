import React from 'react';
import { UserAPI } from '../../../lib/lib';
import styles from './SmartRow.module.scss';

export const defaultUserFieldValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: '',
};

export const SmartRow = (props) => {
  const [userFields, setUserFields] = React.useState(defaultUserFieldValues);
  const [error, setError] = React.useState();

  const handleUserFieldChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFields({
      ...userFields,
      [key]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let newUser = { ...userFields, password: '!Test1234', confirmPassword: '!Test1234' };
    try {
      const response = await UserAPI.createUser(newUser);
      const json = await response.json();
      await props.fetchUsers();
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  return (
    <tr key='smartRow' className={styles.smartRow}>
      <td>
        <input
          name='firstName'
          placeholder='First Name'
          type='text'
          value={userFields.firstName}
          onChange={handleUserFieldChange('firstName')}
        />
      </td>
      <td>
        <input
          name='lastName'
          placeholder='Last Name'
          type='text'
          value={userFields.lastName}
          onChange={handleUserFieldChange('lastName')}
        />
      </td>
      <td>
        <input
          name='email'
          placeholder='Email'
          type='text'
          value={userFields.email}
          onChange={handleUserFieldChange('email')}
        />
      </td>
      <td>
        <input
          name='phoneNumber'
          placeholder='Phone Number'
          type='text'
          value={userFields.phoneNumber}
          onChange={handleUserFieldChange('phoneNumber')}
        />
      </td>
      <td>
        <button onClick={handleSubmit}>Add User</button>
      </td>
    </tr>
  );
};

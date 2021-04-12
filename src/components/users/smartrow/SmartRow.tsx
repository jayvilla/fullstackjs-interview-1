import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { UsersContext } from '@src/context';
import classNames from 'classnames';
import React from 'react';
import { UserAPI } from '../../../lib/lib';
import styles from './SmartRow.module.scss';

export const defaultUserFieldValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
};

export interface SmartRowProps {
  rowType: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export const SmartRow = (props: SmartRowProps) => {
  const [userFields, setUserFields] = React.useState(defaultUserFieldValues);
  const [error, setError] = React.useState();
  const [editable, setEditable] = React.useState<boolean>(false);

  const { fetchUsers } = React.useContext(UsersContext);

  React.useEffect(() => {
    setUserFields({
      firstName: props.firstName || '',
      lastName: props.lastName || '',
      email: props.email || '',
      phoneNumber: props.phoneNumber || '',
    });
  }, []);

  React.useEffect(() => {
    setEditable(props.rowType === 'addUser');
  }, []);

  const handleUserFieldChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFields({
      ...userFields,
      [key]: e.target.value,
    });
  };

  const handleEdit = (e: React.MouseEvent<HTMLDivElement>) => {
    setEditable(!editable);
  };

  const handleAddUser = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    let newUser = { ...userFields, password: '!Test1234', confirmPassword: '!Test1234' };
    try {
      const response = await UserAPI.createUser(newUser);
      const json = await response.json();
      await fetchUsers();
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const handleUpdateUser = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    let updatedUser = { ...userFields, password: '!Test1234', confirmPassword: '!Test1234' };
    try {
      const response = await UserAPI.updateUser(updatedUser, props.id);
      const json = await response.json();
      setEditable(false);
      await fetchUsers();
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const handleDeleteUser = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      await UserAPI.deleteUserById(props.id);
      await fetchUsers();
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
  };

  const editClass = classNames(styles.edit, editable ? styles.active : '');

  return (
    <tr key={props.phoneNumber} className={styles.smartRow}>
      <td>
        <input
          disabled={!editable}
          name='firstName'
          placeholder='First Name'
          type='text'
          value={userFields.firstName}
          onChange={handleUserFieldChange('firstName')}
        />
      </td>
      <td>
        <input
          disabled={!editable}
          name='lastName'
          placeholder='Last Name'
          type='text'
          value={userFields.lastName}
          onChange={handleUserFieldChange('lastName')}
        />
      </td>
      <td>
        <input
          disabled={!editable}
          name='email'
          placeholder='Email'
          type='text'
          value={userFields.email}
          onChange={handleUserFieldChange('email')}
        />
      </td>
      <td>
        <input
          disabled={!editable}
          name='phoneNumber'
          placeholder='Phone Number'
          type='text'
          value={userFields.phoneNumber}
          onChange={handleUserFieldChange('phoneNumber')}
        />
      </td>
      <td>
        <div className={styles.buttonGroup}>
          {props.rowType === 'addUser' && (
            <div className={styles.add} onClick={handleAddUser}>
              <AddCircleIcon />
            </div>
          )}
          {props.rowType === 'userRow' && editable && (
            <div className={styles.update} onClick={handleUpdateUser}>
              <SaveIcon />
            </div>
          )}
          {props.rowType === 'userRow' && editable && (
            <div className={styles.delete} onClick={handleDeleteUser}>
              <DeleteForeverIcon />
            </div>
          )}
          {props.rowType === 'userRow' && (
            <div className={editClass} onClick={handleEdit}>
              <EditIcon />
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

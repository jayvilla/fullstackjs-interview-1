import styles from './SmartRow.module.scss';

export const SmartRow = () => {
  return (
    <tr key='smartRow' className={styles.smartRow}>
      <td>
        <input name='firstName' placeholder='First Name' type='text' />
      </td>
      <td>
        <input name='lastName' placeholder='Last Name' type='text' />
      </td>
      <td>
        <input name='email' placeholder='Email' type='text' />
      </td>
      <td>
        <input name='phoneNumber' placeholder='Phone Number' type='text' />
      </td>
      <td>
        <button>Add User</button>
      </td>
    </tr>
  );
};

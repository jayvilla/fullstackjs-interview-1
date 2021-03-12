import styles from './Signup.module.scss';

export const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            name='firstName'
            type='text'
            placeholder='First name'
            className={styles.formControl}
          />
        </div>

        <div className={styles.formGroup}>
          <input
            name='lastName'
            type='text'
            placeholder='Last name'
            className={styles.formControl}
          />
        </div>

        <div className={styles.formGroup}>
          <input name='email' type='text' placeholder='Email' className={styles.formControl} />
        </div>

        <div className={styles.formGroup}>
          <input
            name='password'
            type='password'
            placeholder='Password'
            className={styles.formControl}
          />
        </div>

        <div className={styles.formGroup}>
          <input
            name='password'
            type='password'
            placeholder='Confirm Password'
            className={styles.formControl}
          />
        </div>

        <div className={styles.formGroup}>
          <input
            name='phoneNumber'
            type='text'
            placeholder='Phone Number'
            className={styles.formControl}
          />
        </div>

        <div className={styles.formGroup}>
          <input type='submit' className={styles.formControl} />
        </div>
      </form>
    </div>
  );
};

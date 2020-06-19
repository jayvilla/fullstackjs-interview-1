// optional: configure or set up a testing framework before each test
// if you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// used for __tests__/testing-library.js
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

/**
 * publicRuntimeConfig undefined in staging environment
 * @see https://github.com/zeit/next.js/issues/4024
 */
import { setConfig } from 'next/config';
import { publicRuntimeConfig } from '../../next.config';

// Make sure you can use "publicRuntimeConfig" within tests.
setConfig({ publicRuntimeConfig });

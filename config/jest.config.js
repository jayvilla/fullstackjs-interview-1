module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    'ts-jest': {
      tsConfig: './config/tsconfig.jest.json',
    },
  },
  /**
   * Full Next.js + Jest Example
   * @see https://github.com/zeit/next.js/tree/canary/examples/with-jest
   */
  collectCoverageFrom: [
    // 'src/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '@test-utils': '<rootDir>/config/test-utils',
    '@src/(.*)': ['<rootDir>/src/$1'],
  },
  rootDir: '../',
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/amplify/',
    '/config/',
    '/docker/',
    '/kube',
    '/public/',
    '/sass/',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    // '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
};

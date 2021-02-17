const merge = require('lodash.merge');

const CONFIG_ENV = process.env.CONFIG_ENV;
CONFIG_ENV !== 'test' && console.log('CONFIG_ENV', CONFIG_ENV);

/**
 * Default or shared configuration should go here
 */
let defaultConfig = {
  env: {
    SECRET_COOKIE_PASSWORD: 'MXsFaEe5YO76opTRTuMcDHzMy5H7d68TS0V2XLeQKKv8bukHwZAkSv2nm0sY7s7t',
  },
  publicRuntimeConfig: {
    BUILD_VERSION: process.env.BUILD_VERSION,
    STATIC_CDN_URL: '',
  },
};

switch (CONFIG_ENV) {
  case 'dev':
    config = require('./config/next/dev');
    break;
  case 'prod':
    config = require('./config/next/prod');
    break;

  default:
    config = require('./config/next/localhost');
    break;
}

module.exports = merge(defaultConfig, config);

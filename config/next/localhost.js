/**
 * Config for localhost
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  serverRuntimeConfig: {
    BASE_API_URL: `http://nestjs:3000`,
  },
  publicRuntimeConfig: {},
});

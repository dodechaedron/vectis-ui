/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  reactStrictMode: false,
  transpilePackages: ['@vectis/components']
};

module.exports = moduleExports;

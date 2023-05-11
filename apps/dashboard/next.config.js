const { withSentryConfig } = require("@sentry/nextjs");

const withBundleAnalyzer = require("@next/bundle-analyzer")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['@vectis/components'],
};

module.exports = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);

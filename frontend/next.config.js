const withPlugins = require('next-compose-plugins');
const withRemoveImports = require('next-remove-imports');
const withTM = require('next-transpile-modules')(['echarts', 'zrender']);

/** @type {import('next').NextConfig} */
const customConfig  = {
  reactStrictMode: false,
  devIndicators: { autoPrerender: false },
  poweredByHeader: false,
  optimizeFonts: false,
  swcMinify: true,
};

module.exports = withPlugins([
  withTM,
  [withRemoveImports()],
], customConfig);

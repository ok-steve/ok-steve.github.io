/* eslint-disable import/no-extraneous-dependencies */
const postcssClean = require('postcss-clean');
const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const tailwind = require('tailwindcss');

module.exports = {
  plugins: [
    postcssImport,
    tailwind,
    postcssPresetEnv,
    ...(process.env.NODE_ENV === 'production' ? [postcssClean] : []),
  ],
};

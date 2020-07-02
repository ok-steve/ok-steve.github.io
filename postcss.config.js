module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-normalize')(),
    require('tailwindcss'),
    require('postcss-preset-env'),
  ],
};

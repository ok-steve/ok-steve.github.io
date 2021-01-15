/* eslint-disable import/no-extraneous-dependencies */
const pluginTypography = require('@tailwindcss/typography');

module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: {
    layers: ['utilities'],
    content: ['src/**/*.{html,njk}'],
  },
  theme: {
    typography: {
      default: {
        css: {
          pre: {
            backgroundColor: false,
            color: false,
          },
        },
      },
    },
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
    },
  },
  plugins: [pluginTypography],
};

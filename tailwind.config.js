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
      colors: {
        rss: '#ff8300',
        github: '#4183c4',
      },
      spacing: {
        '9/16': '56.25%',
      },
    },
  },
  plugins: [pluginTypography],
};

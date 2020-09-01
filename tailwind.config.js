module.exports = {
  purge: ['src/**/*.{html,njk}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: 'white',
      default: '#212529',
      muted: '#f1f3f5',
      primary: '#2b8a3e',
      accent: '#c92a2a',
      rss: '#ff8300',
      codepen: '#0ebeff',
      github: '#4183c4',
    },
    fontSize: {
      xs: '0.694rem',
      sm: '0.833rem',
      base: '1rem',
      lg: '1.2rem',
      xl: '1.44rem',
      '2xl': '1.728rem',
    },
    extend: {
      spacing: {
        '9/16': '56.25%',
      },
    },
  },
};

'use strict';

// Automatically inject Bower components into the HTML file
module.exports = {
  app: {
    ignorePath: /^<%= config.app %>\/|(\.\.\/){1,2}/,
    src: ['<%= config.app %>/layouts/default.hbs']
  },
  sass: {
    src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
    ignorePath: /(\.\.\/){1,2}bower_components\//
  }
};

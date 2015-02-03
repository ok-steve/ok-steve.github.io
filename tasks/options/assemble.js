'use strict';

// Generate static site
module.exports = {
  options: {
    flatten: true,
    layout: 'default.hbs',
    layoutdir: '<%= config.app %>/layouts',
    data: '<%= config.app %>/data/*.{json,yml}',
    partials: ['<%= config.app %>/partials/*.hbs']
  },
  dist: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>/pages',
      src: '{,*/}*.hbs',
      dest: '.tmp'
    }]
  }
};

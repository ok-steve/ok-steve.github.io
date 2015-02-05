'use strict';

// Compiles Sass to CSS and generates necessary files if requested
module.exports = {
  options: {
    loadPath: 'bower_components'
  },
  dist: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>/styles',
      src: ['*.{scss,sass}'],
      dest: '.tmp/styles',
      ext: '.css'
    }]
  },
  server: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>/styles',
      src: ['*.{scss,sass}'],
      dest: '.tmp/styles',
      ext: '.css'
    }]
  }
};

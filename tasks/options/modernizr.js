'use strict';

// Generates a custom Modernizr build that includes only the tests you
// reference in your app
module.exports = {
  dist: {
    devFile: 'bower_components/modernizr/modernizr.js',
    outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
    files: {
      src: [
        '<%= config.dist %>/scripts/{,*/}*.js',
        '<%= config.dist %>/styles/{,*/}*.css',
        '!<%= config.dist %>/scripts/vendor/*'
      ]
    },
    uglify: true
  }
};

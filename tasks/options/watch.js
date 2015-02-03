'use strict';

// Watches files for changes and runs tasks based on the changed files
module.exports = {
  bower: {
    files: ['bower.json'],
    tasks: ['wiredep']
  },
  js: {
    files: ['<%= config.app %>/scripts/{,*/}*.js'],
    tasks: ['jshint'],
    options: {
      livereload: true
    }
  },
  jstest: {
    files: ['test/spec/{,*/}*.js'],
    tasks: ['test:watch']
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  sass: {
    files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
    tasks: ['sass:server', 'autoprefixer']
  },
  styles: {
    files: ['<%= config.app %>/styles/{,*/}*.css'],
    tasks: ['newer:copy:styles', 'autoprefixer']
  },
  livereload: {
    options: {
      livereload: '<%= connect.options.livereload %>'
    },
    files: [
      '<%= config.app %>/{,*/}*.html',
      '.tmp/styles/{,*/}*.css',
      '<%= config.app %>/images/{,*/}*',
      '.tmp/*.html'
    ]
  },
  assemble: {
    files: ['<%= config.app %>/{layouts,pages,partials,data}/{,*/}*.hbs'],
    tasks: ['assemble']
  }
};

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

var loadConfig = function (path) {
  var glob = require('glob'),
    object = {},
    key;

  glob.sync('*', { cwd: path }).forEach(function (option) {
    key = option.replace(/\.js$/,'');
    object[key] = require(path + option);
  });

  return object;
};

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt, { pattern: ['grunt-*', 'assemble'] });
  grunt.loadTasks('tasks');

  // Configurable paths for the application
  var appConfig = {
    config: {
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },
    pkg: grunt.file.readJSON('package.json')
  };

  grunt.util._.extend(appConfig, loadConfig('./tasks/options/'));

  // Define the configuration for all the tasks
  grunt.initConfig(appConfig);
};

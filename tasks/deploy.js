'use strict';

module.exports = function (grunt) {
  grunt.registerTask('deploy', [
    'build',
    'buildcontrol'
  ]);
}

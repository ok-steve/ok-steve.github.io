'use strict';

module.exports = function (grunt) {
  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'concurrent:dist',
    'useminPrepare',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'modernizr',
    'rev',
    'usemin',
    'htmlmin'
  ]);
}

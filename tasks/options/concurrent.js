'use strict';

// Run some tasks in parallel to speed up build process
module.exports = {
  server: [
    'sass:server',
    'copy:styles',
    'assemble'
  ],
  test: [
    'copy:styles'
  ],
  dist: [
    'sass',
    'assemble',
    'copy:styles',
    'imagemin',
    'svgmin'
  ]
};

'use strict';

// The following *-min tasks produce minified files in the dist folder
module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>/images',
      src: '{,*/}*.svg',
      dest: '<%= config.dist %>/images'
    }]
  }
};

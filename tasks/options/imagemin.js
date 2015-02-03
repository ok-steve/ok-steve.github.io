'use strict';

// The following *-min tasks produce minified files in the dist folder
module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>/images',
      src: '{,*/}*.{gif,jpeg,jpg,png}',
      dest: '<%= config.dist %>/images'
    }]
  }
};

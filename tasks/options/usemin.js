'use strict';

// Performs rewrites based on rev and the useminPrepare configuration
module.exports = {
  options: {
    assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
  },
  html: ['.tmp/{,*/}*.html'],
  css: ['<%= config.dist %>/styles/{,*/}*.css']
};

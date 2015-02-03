'use strict';

// Push dist files to a separate Git branch
module.exports = {
  options: {
    dir: '<%= config.dist %>',
    commit: true,
    push: true
  },
  dist: {
    options: {
      remote: '<%= pkg.repository.url %>',
      branch: 'master',
      tag: '<%= pkg.version %>+<%= grunt.template.today("yyyymmdd") %>'
    }
  }
};

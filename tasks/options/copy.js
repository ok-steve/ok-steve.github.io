'use strict';

// Copies remaining files to places other tasks can use
module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.app %>',
      dest: '<%= config.dist %>',
      src: [
        '*.{ico,png,txt,xml}',
        'CNAME',
        'images/{,*/}*.webp',
        '{,*/}*.html',
        'styles/fonts/{,*/}*.*'
      ]
    }, {
      src: 'node_modules/apache-server-configs/dist/.htaccess',
      dest: '<%= config.dist %>/.htaccess'
    }]
  },
  styles: {
    expand: true,
    dot: true,
    cwd: '<%= config.app %>/styles',
    dest: '.tmp/styles/',
    src: '{,*/}*.css'
  }
};

var require = {
  paths: {
    jquery: '../bower_components/jquery/dist/jquery.min',

    webfontloader: '../bower_components/webfontloader/webfontloader'
  },
  shim: {
    jquery: {
      exports: '$'
    },

    webfontloader: {
      exports: 'WebFont'
    }
  }
};

requirejs({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery.min',

    webfontloader: '../bower_components/webfontloader/webfontloader',
    smoothstate: '../bower_components/smoothState/jquery.smoothState.min'
  },
  shim: {
    jquery: {
      exports: '$'
    },

    webfontloader: {
      exports: 'WebFont'
    },
    smoothstate: {
      deps: ['jquery']
    }
  },
  deps: ['main']
});

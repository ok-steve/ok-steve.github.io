requirejs({
  paths: {
    jquery: 'http://localhost/cdn/jquery/jquery.min',
    webfontloader: 'http://localhost/cdn/webfont/webfontloader',
    modernizr: 'http://localhost/cdn/modernizr/modernizr.min',

    smoothstate: 'http://localhost/cdn/smoothstate/jquery.smoothState.min'
  },
  shim: {
    jquery: {
      exports: '$'
    },

    smoothstate: {
      deps: ['jquery']
    }
  },
  deps: ['main']
});

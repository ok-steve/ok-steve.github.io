requirejs({
  paths: {
    jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min',

    webfontloader: 'https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.10/webfontloader',
    smoothstate: 'https://cdnjs.cloudflare.com/ajax/libs/smoothState.js/0.7.2/jquery.smoothState.min'
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

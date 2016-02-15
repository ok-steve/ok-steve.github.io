var require = {
  paths: {
    jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min',

    webfontloader: 'https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.10/webfontloader'
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

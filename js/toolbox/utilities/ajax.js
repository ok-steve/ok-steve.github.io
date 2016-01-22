define([
  'jquery',
  'webfontloader'
], function ($, WebFont) {
  'use strict';

  // https://css-tricks.com/loading-web-fonts-with-the-web-font-loader

  if (sessionStorage.fonts) {
    $('html').addClass('wf-active');
  }

  var Ajax = {
    loadFonts: function (fonts) {
      var events,
        config;

      events = {
        active: function () {
          sessionStorage.fonts = 'true';
        }
      };

      config = $.extend(fonts, events);

      WebFont.load(config);
    }
  };

  return Ajax;
});

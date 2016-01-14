define([
  'jquery',
  'webfontloader'
], function ($, w) {
  'use strict';

  // https://css-tricks.com/loading-web-fonts-with-the-web-font-loader
  w.WebFontConfig = {
    google: {
      families: ['Source Sans Pro:400,400italic,700']
    },
    active: function () {
      sessionStorage.fonts = true;
    }
  };

  if (sessionStorage.fonts) {
    $('html').addClass('wf-active');
  }
});

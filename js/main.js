define([
  'jquery',
  'utilities/ajax'
], function ($, Ajax) {
  'use strict';

  Ajax.loadFonts({
    google: {
      families: [
        'Merriweather:400,400italic,700,700italic',
        'Open+Sans:400'
      ]
    }
  });

  $('[data-trigger="print"]').on('click', function (e) {
    window.print();
  });
});

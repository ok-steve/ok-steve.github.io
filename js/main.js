define([
  'toolbox/utilities/ajax'
  'shame'
], function (Ajax) {
  'use strict';

  Ajax.loadFonts({
    google: {
      families: [
        'Merriweather:400,400italic,700,700italic',
        'Open+Sans:400'
      ]
    }
  });
});

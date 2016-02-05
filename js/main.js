define([
  'toolbox/utilities/ajax',
  'toolbox/components/smooth-state',
  'shame'
], function (Ajax, smoothState) {
  'use strict';

  Ajax.loadFonts({
    google: {
      families: [
        'Merriweather:400,400italic,700,700italic',
        'Open+Sans:700'
      ]
    }
  });

  Ajax.loadFonts({
    google: {
      families: [
        'Playfair Display:700'
      ],
      text: '&'
    }
  });

  smoothState('#page');
});

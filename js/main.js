define([
  'toolbox/utilities/ajax',
  'toolbox/components/smooth-state'
], function (Ajax, smoothState) {
  'use strict';

  Ajax.loadFonts({
    google: {
      families: ['Source Sans Pro:400,400italic,700']
    }
  });

  smoothState('#page');
});

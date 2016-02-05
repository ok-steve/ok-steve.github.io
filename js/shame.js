define([
  'jquery'
], function ($) {
  'use strict';

  $('.js-printPage').on('click', function (e) {
    window.print();
  });
});

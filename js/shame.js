define([
  'jquery',
  'webfontloader',
  'smoothstate'
], function ($, w) {
  'use strict';

  var smoothState,
    $body = $('html, body'),
    $main = $('#page'),
    options = {
      debug: true,
      prefetch: true,
      pageCacheSize: 2,
      onStart: {
        duration: 250, // Duration of our animation
        render: function ($container) {
          $body.animate({
            scrollTop: 0
          });

          // Add your CSS animation reversing class
          $container.addClass('is-exiting');
          // Restart your animation
          smoothState.restartCSSAnimations();
        }
      },
      onReady: {
        duration: 0,
        render: function ($container, $content) {
          // Remove your CSS animation reversing class
          $container.removeClass('is-exiting');
          // Inject the new content
          $container.html($content);

          $body.css('cursor', 'auto');
          $body.find('a').css('cursor', 'auto');
        }
      }
    };

  smoothState = $main.smoothState(options).data('smoothState');

  // FIXME doesn't download
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

define([
  'jquery',
  'smoothstate'
], function ($) {
  'use strict';

  // TODO make more flexible configuration

  function SmoothState(selector) {
    var smoothState,
      $body = $('html, body'),
      $main = $(selector),
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
  }

  return SmoothState;
});

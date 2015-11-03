(function ($) {
  WebFont.load({
    google: {
      families: ['Source Sans Pro:400,400italic,700']
    }
  });

  $(document).ready(function () {
    $('table').wrap('<div class="u-scrollY"></div>');
    $('iframe').wrap('<div class="FlexEmbed"></div>');
  });
})(jQuery);

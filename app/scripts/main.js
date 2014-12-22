'use strict';

(function ($) {
  $('[rel="external"]').click(function (e)  {
    e.preventDefault();
    e.stopPropagation();
    window.open(this.href, '_blank');
  });
})(jQuery);

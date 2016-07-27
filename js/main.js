(function (WebFont) {
  'use strict';


  var html = document.querySelector('html'),
    title = document.querySelector('title'),
    body = document.querySelector('#page'),
    WebFontConfig = {
      google: {
        families: [
          'Merriweather:400,400italic,700',
          'Source Sans Pro:400'
        ]
      },
      active: function () {
        sessionStorage.fonts = true;
      }
    };


  /**
   * Load fonts
   */

  // https://css-tricks.com/loading-web-fonts-with-the-web-font-loader
  // https://fonts.googleapis.com/css?family=Merriweather:400,400italic,700|Source+Sans+Pro:400
  if (sessionStorage.fonts) {
    html.className += ' wf-active';
  }

  WebFont.load(WebFontConfig);


  /**
   * Add page transitions
   */

  function pageTransition(el){
    if (!window.history.pushState) {
      return;
    } else if (window.location.pathname === el.href) {
      return;
    }

    window.history.pushState(null, null, el.href);

    changePage();
  }

  function changePage() {
    var url = window.location.href,
      request = new XMLHttpRequest();

    request.open('GET', url);

    request.responseType = 'document';

    request.onreadystatechange = function () {
      var title = document.querySelector('title');

      if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        title.textContent = request.response.querySelector('title').textContent;
        body.innerHTML = request.response.querySelector('#page').innerHTML;
        body.className = body.className.replace(new RegExp('(^|\\b)' + 'is-exiting' + '(\\b|$)', 'gi'), ' ');
      }
    };

    body.className += ' is-exiting';

    request.send();
  }


  /**
   * Globally listen for events
   */

  window.addEventListener('popstate', changePage);

  document.addEventListener('click', function (e) {
    var el = e.target;

    // Print page
    if (el.getAttribute('data-trigger') === 'print') {
      window.print();

      return;
    }

    // Search for links
    while (el && !el.href) {
      el = el.parentNode;
    }

    if (el) {
      e.preventDefault();

      pageTransition(el);

      return;
    }
  });
}(WebFont));

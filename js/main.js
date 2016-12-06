(function( FontFaceObserver ) {
  'use strict';


  /**
   * XMLHttpRequest utility function
   */

  function get( href, onSuccess ) {
    var request = new XMLHttpRequest();

    request.open( 'GET', href );

    request.responseType = 'document';

    request.onreadystatechange = function() {
      if ( request.readyState === XMLHttpRequest.DONE && request.status === 200 ) {
        onSuccess( request.response );
      }
    };

    request.send();
  }


  /**
   * Load fonts
   */

  function webfont() {
    var html = document.querySelector('html'),
      defaultFont = new FontFaceObserver('Merriweather', {
        weight: 400
      }),
      displayFont = new FontFaceObserver('Source Sans Pro', {
        weight: 400
      });

    if ( sessionStorage.fonts ) {
      html.classList.add('.Webfont-default');
      html.classList.add('Webfont-display');
      html.classList.add('is-active');
    }

    defaultFont.load().then(function () {
      html.classList.add('Webfont-default');
    });

    displayFont.load().then(function () {
      html.classList.add('Webfont-display');
    });

    Promise.all([
      defaultFont,
      displayFont
    ]).then(function () {
      html.classList.add('is-active');
      sessionStorage.fonts = 'true';
    });
  }


  /**
   * Override page loading
   */

  function render( e ) {
    var body = document.querySelector('body'),
      request = new XMLHttpRequest();

    body.classList.add('is-loading');

    window.history.pushState( null, null, e.target.href );

    get( e.target.href, function( response ) {
      var title = document.querySelector('title');

      title.textContent = response.querySelector('title').textContent;
      body.innerHTML = response.querySelector('body').innerHTML;
      body.classList.remove('is-loading');
    });
  }

  function router( e ) {
    if ( !window.history.pushState ) {
      return;
    }

    if ( window.location.pathname === e.target.href ) {
      return;
    }

    render( e );

    e.preventDefault();
  }


  /**
   * Alter HTML class if Javascript is present
   */

  function hasJs() {
    var html = document.querySelector('html');

    html.classList.remove('no-js');
    html.classList.add('js');
  }


  /**
   * Events
   */

  function onLoad( e ) {
    hasJs();
    webfont();
  }

  function onClick( e ) {
    var target = e.target;

    if ( target.getAttribute('data-trigger') === 'print' ) {
      window.print();

      return;
    }

    while ( target && !target.href ) {
      target = target.parentNode;
    }

    if ( target ) {
      router( e );
    }
  }

  document.addEventListener( 'DOMContentLoaded', onLoad );
  document.addEventListener( 'click', onClick );
  window.addEventListener( 'popstate', render );
}( FontFaceObserver ));

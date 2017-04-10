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

  function webfont( config ) {
    var html = document.querySelector('html'),
      keys = Object.keys( config ),
      fonts = keys.map(function ( key ) {
        var font = config[key];

        return new FontFaceObserver( font.family, font.options ).load().then(function () {
          html.classList.add('t-webfont--' + key);
        });
      });

    if ( sessionStorage.fonts ) {
      html.classList.add('is-active');

      keys.forEach(function ( key ) {
        html.classList.add('t-webfont--' + key);
      });

      return;
    }

    Promise.all( fonts ).then(function () {
      html.classList.add('is-active');
      sessionStorage.fonts = 'true';
    });
  }


  /**
   * Router
   */

  function render( pathname ) {
    var body = document.querySelector('body');
    var title = document.querySelector('title');

    body.classList.add('is-loading');

    window.history.pushState( null, null, pathname );

    get( pathname, function( response ) {
      title.textContent = response.querySelector('title').textContent;
      body.innerHTML = response.querySelector('body').innerHTML;

      body.classList.remove('is-loading');
    });
  }

  function onRouteChange( loc ) {
    var pathname = loc.pathname,
      conditions = {
        noPushState: !window.history.pushState,
        samePath: pathname === window.location.pathname,
        differentOrigin: loc.href.search( window.location.origin ) === -1,
        isAsset: pathname.search(/\.(xml|css|js|png|jpg|svg)/) !== -1
      },
      any = Object.keys( conditions ).map(function( key ) {
        return conditions[key];
      }).reduce(function( prev, curr ) {
        return (prev || curr);
      });

    if ( any ) {
      return;
    }

    render( pathname );
  }


  /**
   * Events
   */

  function onLoad( e ) {
    webfont({
      default: {
        family: 'Merriweather',
        options: {
          weight: 400
        }
      },
      display: {
        family: 'Source Sans Pro',
        options: {
          weight: 400
        }
      }
    });
  }

  function onClick( e ) {
    var target = e.target;

    if ( target.getAttribute('data-trigger') === 'print' ) {
      window.print();

      return;
    }

    while ( target.tagName && target.tagName.toLowerCase() !== 'a' ) {
      target = target.parentNode;
    }

    if ( !target.tagName ) {
      return;
    }

    e.preventDefault();
    onRouteChange( target );
  }

  function onPopstate( e ) {
    onRouteChange( window.location );
  }

  document.addEventListener( 'DOMContentLoaded', onLoad );
  document.addEventListener( 'click', onClick );
  window.addEventListener( 'popstate', onPopstate );
}( FontFaceObserver ));


/**
 * References
 *
 * https://www.filamentgroup.com/lab/font-events.html
 * http://meowni.ca/posts/web-fonts/
 */

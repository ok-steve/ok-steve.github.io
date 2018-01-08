(function() {
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

  function onRouteChange( e, target ) {
    var pathname = target.pathname,
      conditions = {
        noPushState: !window.history.pushState,
        //samePath: pathname === window.location.pathname,
        differentOrigin: target.origin !== window.location.origin,
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

    window.history.pushState( null, null, pathname );

    render( pathname );

    e.preventDefault();
  }

  /**
   * Events
   */

  function onClick( e ) {
    var target = e.target;

    if ( target.getAttribute('data-trigger') === 'print' ) {
      window.print();

      return;
    }

    while ( target.tagName && target.tagName.toLowerCase() !== 'a' ) {
      target = target.parentNode;
    }

    if ( target !== document ) {
      onRouteChange( e, target );
    }
  }

  function onPopstate( e ) {
    onRouteChange( e, e.target.location );
  }

  document.addEventListener( 'click', onClick );
  window.addEventListener( 'popstate', onPopstate );
}( FontFaceObserver ));

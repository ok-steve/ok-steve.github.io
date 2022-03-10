(function () {
  /**
   * XMLHttpRequest utility function
   */

  function get(href, onSuccess) {
    const request = new XMLHttpRequest();

    request.open('GET', href);

    request.responseType = 'document';

    request.onreadystatechange = function readyState() {
      if (
        request.readyState === XMLHttpRequest.DONE &&
        request.status === 200
      ) {
        onSuccess(request.response);
      }
    };

    request.send();
  }

  /**
   * Router
   */

  function render(pathname) {
    const routerRoot = document.querySelector('.router');
    const title = document.querySelector('title');
    const description = document.querySelector('meta[name=description]');
    const canonical = document.querySelector('link[rel=canonical]');

    routerRoot.classList.add('is-loading');

    get(pathname, (response) => {
      title.textContent = response.querySelector('title').textContent;

      description.textContent = response.querySelector(
        'meta[name=description]'
      ).textContent;

      canonical.setAttribute(
        'href',
        response.querySelector('link[rel=canonical]').getAttribute('href')
      );

      routerRoot.innerHTML = response.querySelector('.router').innerHTML;
      routerRoot.classList.remove('is-loading');
    });
  }

  function shouldRouteChange(target) {
    return [
      // Target is not a hash
      target.hash === '',
      // Target is not marked as ignored
      !target.hasAttribute('data-router-ignore'),
      // Browser supports push state
      window.history.pushState,
      // Different paths
      target.pathname !== window.location.pathname,
      // Same origin
      target.origin === window.location.origin,
      // Not assets
      target.pathname.search(/\.(xml|css|js|png|jpg|svg)/) === -1,
    ].reduce((prev, curr) => prev && curr);
  }

  /**
   * Events
   */

  let previousUrl = window.location.pathname;

  function onClick(e) {
    const target = e.path.reduce((link, el) => {
      if (link !== null) return link;
      if (el.tagName && el.tagName.toLowerCase() === 'a') return el;
      return null;
    }, null);

    if (target !== null) {
      previousUrl = window.location.pathname;

      if (shouldRouteChange(target)) {
        window.history.pushState(null, null, target.pathname);
        render(target.pathname);
        e.preventDefault();
      }
    }
  }

  function onPopstate(e) {
    if (e.target.location.hash || previousUrl === e.target.location.pathname) {
      return;
    }

    render(e.target.location);
    previousUrl = e.target.location.href;
  }

  document.addEventListener('click', onClick);
  window.addEventListener('popstate', onPopstate);
})();

(function() {
  "use strict";

  /**
   * XMLHttpRequest utility function
   */

  function get(href, onSuccess) {
    var request = new XMLHttpRequest();

    request.open("GET", href);

    request.responseType = "document";

    request.onreadystatechange = function() {
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
    var router = document.querySelector(".o-router"),
      title = document.querySelector("title"),
      description = document.querySelector("meta[name=description]"),
      view = document.querySelector(".o-router__view");

    router.classList.add("is-loading");

    get(pathname, function(response) {
      title.textContent = response.querySelector("title").textContent;
      description.textContent = response.querySelector(
        "meta[name=description]"
      ).textContent;
      view.innerHTML = response.querySelector(".o-router__view").innerHTML;
      router.classList.remove("is-loading");
    });
  }

  function shouldRouteChange(pathname, origin) {
    var conditions = {
        noPushState: !window.history.pushState,
        samePath: pathname === window.location.pathname,
        differentOrigin: origin !== window.location.origin,
        isAsset: pathname.search(/\.(xml|css|js|png|jpg|svg)/) !== -1
      },
      anyConditionsMatch = Object.keys(conditions)
        .map(function(key) {
          return conditions[key];
        })
        .reduce(function(prev, curr) {
          return prev || curr;
        });

    return !anyConditionsMatch;
  }

  /**
   * Events
   */

  function onClick(e) {
    var target = e.target;

    while (target.tagName && target.tagName !== "A") {
      target = target.parentNode;
    }

    if (target !== document) {
      if (shouldRouteChange(target.pathname, target.origin)) {
        window.history.pushState(null, null, target.pathname);
        render(target.pathname);
        e.preventDefault();
      }
    }
  }

  function onPopstate(e) {
    render(e.target.location);
  }

  document.addEventListener("click", onClick);
  window.addEventListener("popstate", onPopstate);
})();

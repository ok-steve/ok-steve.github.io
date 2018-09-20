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
    var router = document.querySelector(".o-router");
    var title = document.querySelector("title");
    var view = document.querySelector(".o-router__view");

    router.classList.add("is-loading");

    window.history.pushState(null, null, pathname);

    get(pathname, function(response) {
      title.textContent = response.querySelector("title").textContent;
      view.innerHTML = response.querySelector(".o-router__view").innerHTML;
      router.classList.remove("is-loading");
    });
  }

  function onRouteChange(e, origin, pathname) {
    console.log("route change", origin, pathname);
    var conditions = {
        noPushState: !window.history.pushState,
        samePath: pathname === window.location.pathname,
        differentOrigin: origin !== window.location.origin,
        isAsset: pathname.search(/\.(xml|css|js|png|jpg|svg)/) !== -1
      },
      any = Object.keys(conditions)
        .map(function(key) {
          return conditions[key];
        })
        .reduce(function(prev, curr) {
          return prev || curr;
        });

    console.log("conditions", conditions);

    if (any) {
      return;
    }

    window.history.pushState(
      { prev: window.location.pathname },
      null,
      pathname
    );

    render(pathname);

    e.preventDefault();
  }

  /**
   * Events
   */

  function onClick(e) {
    var target = e.target;

    if (target.getAttribute("data-trigger") === "print") {
      window.print();

      return;
    }

    while (target.tagName && target.tagName.toLowerCase() !== "a") {
      target = target.parentNode;
    }

    if (target !== document) {
      onRouteChange(e, target.origin, target.pathname);
    }
  }

  function onPopstate(e) {
    e.preventDefault();
    onRouteChange(e.target.location.origin, e.state.prev);
  }

  document.addEventListener("click", onClick);
  window.addEventListener("popstate", onPopstate);
})();

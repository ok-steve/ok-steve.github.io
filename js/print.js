(function() {
  "use strict";

  /**
   * Events
   */

  function onClick(e) {
    var target = e.target;

    while (target.tagName && target.tagName !== "BUTTON") {
      target = target.parentNode;
    }

    if (
      target !== document &&
      target.hasAttribute("data-trigger") &&
      target.getAttribute("data-trigger") === "print"
    ) {
      window.print();
    }
  }

  document.addEventListener("click", onClick);
})();

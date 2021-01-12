---
layout: code.njk
title: Fullscreen toggle
date: 2018-12-21
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <script src="https://unpkg.com/stimulus@1.1.1/dist/stimulus.umd.js"></script>
    <div data-controller="fullscreen">
      <button data-action="click->fullscreen#toggle">&times;</button>
    </div>`
css:
  lang: css
  code: |-
    @import url("/base-styles/style.css");
js:
  lang: javascript
  code: |-
    class FullscreenController extends Stimulus.Controller {
      toggle() {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen(); 
        } else {
          this.element.requestFullscreen();
        }
      }
    }

    const application = Stimulus.Application.start();

    application.register('fullscreen', FullscreenController);
---

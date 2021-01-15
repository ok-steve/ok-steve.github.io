---
layout: code.njk
title: Media objects
date: 2019-06-19
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <div class="media media-start">
      <div class="media-object"><img src="http://placehold.it/64x64" alt="placeholder image"/></div>
      <div class="media-body">
        <p>Lorem lean startup ipsum product market fit customer development acquihire technical cofounder.</p>
      </div>
    </div>
    <div class="media media-end">
      <div class="media-object"><img src="http://placehold.it/64x64" alt="placeholder image"/></div>
      <div class="media-body">
        <p>Lorem lean startup ipsum product market fit customer development acquihire technical cofounder.</p>
      </div>
    </div>
css:
  lang: css
  code: |-
    @import url("/base-styles/style.css");

    :root {
      --media-padding: 1em;
    }

    .media {
      display: flex;
      align-items: flex-start;
    }

    .media > * {
      margin-top: 0;
    }

    .media-body {
      flex: 1;
    }

    .media-start .media-object {
      margin-right: var(--media-padding);
    }

    .media-end .media-object {
      order: 1;
      margin-left: var(--media-padding);
    }

    /**
     * Extra styles
     */

    body {
      padding: 1em;
      background-color: gray;
    }

    .media {
      background-color: white;
      padding: .5em;
    }
js:
  lang: javascript
---
See: https://philipwalton.github.io/solved-by-flexbox/demos/media-object/

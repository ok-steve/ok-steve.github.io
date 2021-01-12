---
layout: code.njk
title: Sticky footer
date: 2019-06-19
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <div class="sticky-footer">
      <header>
        <h1>Header</h1>
      </header>
      <div class="sticky-footer-content">
        <p>Content</p>
      </div>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
css:
  lang: css
  code: |-
    @import url("/base-styles/style.css");

    .sticky-footer {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .sticky-footer-content {
      flex: 1;
    }

    /**
     * Extra styles
     */

    .sticky-footer > * {
      padding: 1em;
    }

    footer {
      background-color: gray;
      color: white;
    }
js:
  lang: javascript
---

https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/

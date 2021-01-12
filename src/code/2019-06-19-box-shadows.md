---
layout: code.njk
title: Box shadows 
date: 2019-06-19
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <div class="shadow">
      <p>Lorem lean startup ipsum product market fit customer development acquihire technical cofounder.</p>
    </div>
css:
  lang: css
  code: |-
    @import url("/base-styles/style.css");

    .shadow,
    .shadow::after {
      transition: 0.2s ease-in-out;
    }

    .shadow {
      position: relative;
      overflow: visible;
      box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.15);
    }

    .shadow::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      box-shadow: 0 5px 15px hsla(0, 0%, 0%, 0.3);
      opacity: 0;
      transition-property: opacity;
      content: "";
    }

    .shadow.is-raised::after {
      opacity: 1;
    }
js:
  lang: javascript
---

http://tobiasahlin.com/blog/how-to-animate-box-shadow

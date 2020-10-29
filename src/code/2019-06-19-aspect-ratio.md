---
layout: code.njk
title: Aspect ratio
date: 2019-06-19
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <div class="aspect-ratio aspect-ratio-16x9">
      <iframe class="aspect-ratio-object" src="https://www.youtube.com/embed/d81N0_zZhEA"></iframe>
    </div>
    <div class="aspect-ratio aspect-ratio-4x3">
      <iframe class="aspect-ratio-object" src="https://www.youtube.com/embed/d81N0_zZhEA"></iframe>
    </div> 
css:
  lang: css
  code: |-
    @import url("/code/2019/06/19/base-styles/style.css");

    .aspect-ratio {
      position: relative;
      height: 0;
    }

    .aspect-ratio-object {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
    }

    .aspect-ratio-16x9 {
      padding-top: calc(100% * 9 / 16);
    }

    .aspect-ratio-4x3 {
      padding-top: calc(100% * 3 / 4);
    }

    /**
     * Extra styles
     */

    body {
      background-color: gray;
      padding: 1em;
      max-width: 50%;
      margin-right: auto;
      margin-left: auto;
    }
js:
  lang: javascript
---

https://css-tricks.com/aspect-ratio-boxes/
https://www.smashingmagazine.com/2014/02/making-embedded-content-work-in-responsive-design/
https://css-tricks.com/aspect-ratio-media-elements-and-intrinsicsize/

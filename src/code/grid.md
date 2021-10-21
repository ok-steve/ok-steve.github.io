---
title: Grid
date: 2019-06-19
published: false
html:
  lang: html
  code: |-
    <div class="grid">
      <div class="grid-cell">
        <p>Cell 0</p>
      </div>
      <div class="grid-cell">
        <p>Cell 1</p>
      </div>
      <div class="grid-cell">
        <p>Cell 2</p>
      </div>
      <div class="grid-cell">
        <p>Cell 3</p>
      </div>
      <div class="grid-cell">
        <p>Cell 4</p>
      </div>
      <div class="grid-cell">
        <p>Cell 5</p>
      </div>
      <div class="grid-cell">
        <p>Cell 6</p>
      </div>
      <div class="grid-cell">
        <p>Cell 7</p>
      </div>
      <div class="grid-cell">
        <p>Cell 8</p>
      </div>
      <div class="grid-cell">
        <p>Cell 9</p>
      </div>
      <div class="grid-cell">
        <p>Cell 10</p>
      </div>
      <div class="grid-cell">
        <p>Cell 11</p>
      </div>
    </div>
css:
  lang: css
  code: |-
    @import url("/base-styles/style.css");

    :root {
      --grid-basis: 20em;
      --grid-gutter: 1.5em; /* line-height in ems */
    }

    .grid {
      display: flex;
      flex-wrap: wrap;
      margin-top: calc(-1 * var(--grid-gutter));
      margin-left: calc(-1 * var(--grid-gutter));
    }

    .grid-cell {
      flex: 1 var(--grid-basis);
      margin-top: var(--grid-gutter);
      margin-left: var(--grid-gutter);
    }

    @supports (display: grid) {
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(var(--grid-basis), 1fr));
        grid-gap: var(--grid-gutter);
        margin-top: 0;
        margin-left: 0;
      }
      
      .grid-cell {
        margin-top: 0;
        margin-left: 0;
      }
    }

    /**
     * Extra styles
     */

    body {
      background-color: gray;
      padding: 1em;
    }

    .grid-cell {
      background-color: white;
      padding: 1em;
    }
js:
  lang: javascript
---
See:
http://www.heydonworks.com/article/on-writing-less-damn-code
http://codepen.io/philipwalton/pen/XJMWem

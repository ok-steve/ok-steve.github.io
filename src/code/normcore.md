---
title: Normcore
date: 2019-06-19
published: false
permalink: normcore/
html:
  lang: html
  code: >-
    <h2>Base</h2>


    <h1>Heading 1</h1>

    <h2>Heading 2</h2>

    <h3>Heading 3</h3>

    <h4>Heading 4</h4>

    <h5>Heading 5</h5>

    <h6>Heading 6</h6>


    <p>Paragraph text</p>


    <ul>
      <li>List item</li>
      <li>List item</li>
    </ul>


    <ol>
      <li>List item</li>
      <li>List item</li>
    </ol>


    <dl>
      <dt>Term</dt>
      <dd>Definition</dd>
      <dt>Term</dt>
      <dd>Definition</dd>
    </dl>


    <blockquote>
      <p>This is a quote.</p>
      <cite>Quote source</cite>
    </blockquote>


    <figure>
      <img src="https://via.placeholder.com/420x270" alt="placeholder image">
      <figcaption>Caption for a placeholder image</figcaption>
    </figure>


    <h2>Composition</h2>


    <h3>Aspect ratio boxes</h3>


    <div class="aspect-ratio" style="--aspect-ratio: calc(100% * 9/ 16);">
      <iframe src="https://www.youtube.com/embed/d81N0_zZhEA"></iframe>
    </div>


    <div class="aspect-ratio" style="--aspect-ratio: calc(100% * 3 / 4);">
      <iframe src="https://www.youtube.com/embed/d81N0_zZhEA"></iframe>
    </div> 


    <h3>Containers</h3>


    <div class="container">
      <p>Lorem lean startup ipsum product market fit customer development acquihire technical cofounder. User engagement A/B testing shrink a market venture capital pitch deck. Social bookmarking group buying crowded market pivot onboarding freemium prototype ping pong. Early stage disruptive ecosystem community outreach dynamic location based strategic investor.</p>
    </div>


    <h2>Blocks</h2>


    <h3>Media objects</h3>


    <div class="media">
      <div class="media-object">
        <img src="http://placehold.it/64x64" alt="placeholder image"/>
      </div>
     
      <div class="media-body">
        <p>Lorem lean startup ipsum product market fit customer development acquihire technical cofounder.</p>
      </div>
    </div>


    <div class="media" data-orientation="reverse">
      <div class="media-object">
        <img src="http://placehold.it/64x64" alt="placeholder image"/>
      </div>
     
      <div class="media-body">
        <p>Lorem lean startup ipsum product market fit customer development acquihire technical cofounder.</p>
      </div>
    </div>
css:
  lang: css
  code: >-
    @charset "utf-8";


    /*------------------------------------*\
      #BASE
    \*------------------------------------*/


    /**
     * 1. Add inherited box sizing in all browsers (opinionated).
     * 2. Backgrounds do not repeat by default (opinionated).
     */

    *,

    ::before,

    ::after {
      box-sizing: border-box; /* 1 */
      background-repeat: no-repeat; /* 2 */
    }


    /**
     * 1. Remove animations when motion is reduced (opinionated).
     * 2. Remove fixed background attachments when motion is reduced (opinionated).
     * 3. Remove timed scrolling behaviors when motion is reduced (opinionated).
     * 4. Remove transitions when motion is reduced (opinionated).
     */

    @media (prefers-reduced-motion: reduce) {
      *,
      ::before,
      ::after {
        animation-delay: -1ms !important; /* 1 */
        animation-duration: 1ms !important; /* 1 */
        animation-iteration-count: 1 !important; /* 1 */
        background-attachment: initial !important; /* 2 */
        scroll-behavior: auto !important; /* 3 */
        transition-delay: 0s !important; /* 4 */
        transition-duration: 0s !important; /* 4 */
      }
    }


    /**
     * 1. Add text decoration inheritance in all browsers (opinionated).
     * 2. Add vertical alignment inheritance in all browsers (opinionated).
     */

    ::before,

    ::after {
      text-decoration: inherit; /* 1 */
      vertical-align: inherit; /* 2 */
    }


    /**
     * Only display focus style for keyboard interactions.
     */

    :focus:not(:focus-visible) {
      outline: none;
    }


    /**
     * Turn on kerning, standard ligatures, and proportional, oldstyle numerals.
     */

    html,

    body {
      /* TODO how does this affect `text-rendering`? */
      font-kerning: normal;
      font-variant-ligatures: normal;
      font-variant-numeric: proportional-nums oldstyle-nums;
    }


    /**
     * 1. Use the default cursor in all browsers (opinionated).
     * 2. Change the line height in all browsers (opinionated).
     * 3. Use a 4-space tab width in all browsers (opinionated).
     * 4. Remove the grey highlight on links in iOS (opinionated).
     * 5. Prevent adjustments of font size after orientation changes in
     *    IE on Windows Phone and in iOS.
     * 6. Breaks words to prevent overflow in all browsers (opinionated).
     * 7. Use the default user interface font in all browsers (opinionated).
     */

    html {
      cursor: default; /* 1 */
      line-height: var(--vertical-rhythm, 1.5); /* 2 */
      -moz-tab-size: 4; /* 3 */
        -o-tab-size: 4; /* 3 */
           tab-size: 4; /* 3 */
      -webkit-tap-highlight-color: transparent /* 4 */;
          -ms-text-size-adjust: 100%; /* 5 */
      -webkit-text-size-adjust: 100%; /* 5 */
      word-break: break-word; /* 6 */
      font-family:
        system-ui,
        /* macOS 10.11-10.12 */ -apple-system,
        /* Windows 6+ */ "Segoe UI",
        /* Android 4+ */ "Roboto",
        /* Ubuntu 10.10+ */ "Ubuntu",
        /* Gnome 3+ */ "Cantarell",
        /* KDE Plasma 5+ */ "Noto Sans",
        /* fallback */ sans-serif,
        /* macOS emoji */ "Apple Color Emoji",
        /* Windows emoji */ "Segoe UI Emoji",
        /* Windows emoji */ "Segoe UI Symbol",
        /* Linux emoji */ "Noto Color Emoji"; /* 7 */
      color: #222;
      color: var(--text-color, #222);
      background-color: white;
      background-color: var(--background-color, white);
    }


    /**
     * Smooth scroll, except for find on page.
     */

    html:focus-within {
      scroll-behavior: smooth;
    }


    /**
     * 1. Remove the margin in all browsers (opinionated).
     * 2. Nicer looking fonts for OS X and iOS
     */

    body {
      margin: 0; /* 1 */
      -webkit-font-smoothing: antialiased; /* 2 */
      min-height: 100vh;
      text-rendering: optimizeSpeed;
    }


    /**
     * Remove the margin in all browsers (opinionated).
     */

    h1,

    h2,

    h3,

    h4,

    h5,

    h6,

    p,

    ul,

    ol,

    dl,

    dd,

    figure,

    blockquote {
      margin: 0;
    }


    /**
     * Turn on discretionary ligatures for larger headings.
     */

    h1,

    h2,

    h3 {
      font-variant-ligatures: common-ligatures contextual discretionary-ligatures;
    }


    /**
     * Use modular scale in all browsers (opinionated).
     */

    h1 {
      font-size: 1.728em;
      font-size: var(--modular-scale-3, 1.728em);
    }


    h2 {
      font-size: 1.44em;
      font-size: var(--modular-scale-2, 1.44em);
    }


    h3 {
      font-size: 1.2em;
      font-size: var(--modular-scale-1, 1.2em);
    }


    h4 {
      font-size: 1em;
      font-size: var(--modular-scale-0, 1em);
    }


    h5 {
      font-size: 0.833em;
      font-size: var(--modular-scale-01, 0.833em);
    }


    h6 {
      font-size: 0.694em;
      font-size: var(--modular-scale-02, 0.694em);
    }


    /**
     * Remove the margin on nested lists in Chrome, Edge, IE, and Safari.
     */

    dl dl,

    dl ol,

    dl ul,

    ol dl,

    ul dl {
      margin: 0;
    }


    /**
     * Remove the margin on nested lists in Edge 18- and IE.
     */

    ol ol,

    ol ul,

    ul ol,

    ul ul {
      margin: 0;
    }


    /**
     * Smartly align text.
     */

    figure {
      text-align: center;
    }


    figcaption {
      display: inline-block;
      text-align: start;
    }


    /**
     * 1. Correct the inheritance of border color in Firefox.
     * 2. Add the correct box sizing in Firefox.
     * 3. Show the overflow in Edge 18- and IE.
     * 4. A better looking default horizontal rule.
     */

    hr {
      color: inherit; /* 1 */
      height: 0; /* 2 */
      overflow: visible; /* 3 */
      border: 0; /* 4 */
      border-top: 1px solid currentColor; /* 4 */
    }


    /**
     * Add the correct display in IE.
     */

    main {
      display: block;
    }


    /**
     * Remove the list style on navigation lists in all browsers (opinionated).
     */

    nav ol,

    nav ul,

    ol[class][role="list"],

    ul[class][role="list"] {
      list-style: none;
      padding: 0;
    }


    /**
     * Prevent VoiceOver from ignoring list semantics in Safari (opinionated).
     */

    nav li::before,

    ol[class] li::before,

    ul[class] li::before {
      content: "\200B";
    }


    /**
     * 1. Use the default monospace user interface font in all browsers (opinionated).
     * 2. Correct the odd `em` font sizing in all browsers.
     * 3. Turn off kerning and ligatures,
     *    turn on lining, tabular numerals, slashed zero.
     */

    code,

    kbd,

    samp,

    pre {
      font-family:
        /* macOS 10.10+ */ "Menlo",
        /* Windows 6+ */ "Consolas",
        /* Android 4+ */ "Roboto Mono",
        /* Ubuntu 10.10+ */ "Ubuntu Monospace",
        /* KDE Plasma 5+ */ "Noto Mono",
        /* KDE Plasma 4+ */ "Oxygen Mono",
        /* Linux/OpenOffice fallback */ "Liberation Mono",
        /* fallback */ monospace,
        /* macOS emoji */ "Apple Color Emoji",
        /* Windows emoji */ "Segoe UI Emoji",
        /* Windows emoji */ "Segoe UI Symbol",
        /* Linux emoji */ "Noto Color Emoji"; /* 1 */
      font-size: 1em; /* 2 */
      /* TODO how is kerning affected by `text-rendering`? */
      font-kerning: none; /* 3 */
      font-variant-ligatures: contextual; /* 3 */
      font-variant-numeric: tabular-nums lining-nums zero; /* 3 */
    }


    /**
     * Prevent overflow of the container in all browsers (opinionated).
     */

    pre {
      overflow: auto;
      -ms-overflow-style: scrollbar;
    }


    /**
     * Remove the gray background on active links in IE 10.
     */

    a {
      background-color: transparent;
    }


    /**
     * Remove gaps in links underline in iOS 8+ and Safari 8+.
     */

    a:not([class]) {
      text-decoration-skip-ink: auto;
    }


    /**
     * 1. Change all letters to uppercase.
     * 2. Turn on small caps for upper and lowercase letters.
     */

    abbr {
      text-transform: uppercase; /* 1 */
      font-variant: all-small-caps; /* 2 */
    }


    /**
     * Add the correct text decoration in Edge 18-, IE, and Safari.
     */

    abbr[title] {
      text-decoration: underline;
      text-decoration: underline dotted;
    }


    /**
     * Add the correct font weight in Chrome, Edge, and Safari.
     */

    b,

    strong {
      font-weight: bolder;
    }


    /**
     * Use modular scale in all browsers (opinionated).
     */

    small {
      font-size: 0.833em;
      font-size: var(--modular-scale-05, 0.833em);
    }


    /**
     * Prevent `sub` and `sup` elements from affecting the line height in
     * all browsers.
     */

    sub,

    sup {
      font-size: 1rem;
      vertical-align: baseline;
    }


    /**
     * Turn on proportional and oldstyle numerals.
     */

    time {
      white-space: nowrap;
      font-variant-numeric: proportional-nums oldstyle-nums;
    }


    /**
     * 1. Inherit style issues with custom selections, per robsterlini.co.uk/journal/opentype-and-selection-dont-mix.
     * 2. Remove text-shadow in selection highlight:
     *    https://twitter.com/miketaylr/status/12228805301
     */

    ::-moz-selection {
      color: inherit; /* 1 */
      text-shadow: none; /* 2 */
      background-color: #b3d4fc; /* 1 */
    }


    ::selection {
      color: inherit; /* 1 */
      text-shadow: none; /* 2 */
      background-color: #b3d4fc; /* 1 */
    }


    /**
     * Change the alignment on media elements in all browsers (opinionated).
     */

    audio,

    canvas,

    iframe,

    img,

    svg,

    video {
      vertical-align: middle;
    }


    /**
     * Restrict sizing to the page width in all browsers (opinionated).
     */

    canvas,

    iframe,

    img,

    svg,

    video {
      height: auto;
      max-width: 100%;
    }


    /**
     * Add the correct display in IE 9-.
     */

    audio,

    video {
      display: inline-block;
    }


    /**
     * Add the correct display in iOS 4-7.
     */

    audio:not([controls]) {
      display: none;
      height: 0;
    }


    /**
     * Remove the border on iframes in all browsers (opinionated).
     */

    iframe {
      border-style: none;
    }


    /**
     * 1. Remove the border on images within links in IE 10-.
     * 2. Better default display for image.
     */

    img {
      border-style: none; /* 1 */
      display: block;
    }


    /**
     * Change the fill color to match the text color in all browsers (opinionated).
     */

    svg:not([fill]) {
      fill: currentColor;
    }


    /**
     * Hide the overflow in IE.
     */

    svg:not(:root) {
      overflow: hidden;
    }


    /**
     * 1. Collapse border spacing in all browsers (opinionated).
     * 2. Correct table border color inheritance in all Chrome, Edge, and Safari.
     * 3. Remove text indentation from table contents in Chrome, Edge, and Safari.
     * 4. Turn on kerning, standard ligatures, and proportional, oldstyle numerals.
     */

    table {
      border-collapse: collapse; /* 1 */
      border-color: inherit; /* 2 */
      text-indent: 0; /* 3 */
      /* TODO are these needed if inherited from `body`? */
      font-kerning: normal; /* 4 */
      font-variant-ligatures: normal; /* 4 */
      font-variant-numeric: proportional-nums oldstyle-nums; /* 4 */
      width: 100%;
    }


    /**
     * Turn on tabular, lining numerals and slashed zero.
     */

    tbody,

    caption {
      font-variant-numeric: tabular-nums lining-num slashed-zero;
    }


    th {
      text-align: start;
    }


    /**
     * 1. Change the inconsistent appearance in all browsers (opinionated).
     * 2. Add typography inheritance in all browsers (opinionated).
     */

    button,

    input,

    select,

    textarea {
      background-color: transparent; /* 1 */
      border: 1px solid WindowFrame; /* 1 */
      color: inherit; /* 1 */
      font: inherit; /* 2 */
      letter-spacing: inherit; /* 2 */
      padding: 0.25em 0.375em; /* 1 */
    }


    /**
     * Restrict sizing to the page width in all browsers (opinionated).
     */

    input,

    select,

    textarea {
      height: auto;
      max-width: 100%;
    }


    /**
     * Remove the margin on controls in Safari.
     */

    button,

    input,

    select {
      margin: 0;
    }


    /**
     * 1. Show the overflow in IE.
     * 2. Remove the inheritance of text transform in Edge 18-, Firefox, and IE.
     */

    button {
      overflow: visible; /* 1 */
      text-transform: none; /* 2 */
    }


    /**
     * Correct the inability to style buttons in iOS and Safari.
     */

    button,

    [type="button"],

    [type="reset"],

    [type="submit"] {
      -webkit-appearance: button;
    }


    /**
     * 1. Change the inconsistent appearance in all browsers (opinionated).
     * 2. Correct the padding in Firefox.
     */

    fieldset {
      border: 1px solid currentColor; /* 1 */
      padding: 0.35em 0.75em 0.625em; /* 2 */
    }


    /**
     * Show the overflow in Edge 18- and IE.
     */

    input {
      overflow: visible;
    }


    /**
     * 1. Correct the text wrapping in Edge 18- and IE.
     * 2. Correct the color inheritance from `fieldset` elements in IE.
     */

    legend {
      color: inherit; /* 2 */
      display: table; /* 1 */
      max-width: 100%; /* 1 */
      white-space: normal; /* 1 */
    }


    /**
     * 1. Add the correct display in Edge 18- and IE.
     * 2. Add the correct vertical alignment in Chrome, Edge, and Firefox.
     */

    progress {
      display: inline-block; /* 1 */
      vertical-align: baseline; /* 2 */
    }


    /**
     * Change the inconsistent appearance in all browsers (opinionated).
     * 1. Remove the inheritance of text transform in Firefox.
     */

    select {
      text-transform: none; /* 1 */
      -webkit-appearance: none;
         -moz-appearance: none;
      background: no-repeat right center / 1em;
      border-radius: 0;
      padding-right: 1em;
    }


    /**
     * Change the inconsistent appearance in all browsers (opinionated).
     */

    select:not([multiple]):not([size]) {
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='4'%3E%3Cpath d='M4 0h6L7 4'/%3E%3C/svg%3E");
    }


    /**
     * 1. Remove the margin in Firefox and Safari.
     * 2. Remove the default vertical scrollbar in IE.
     * 3. Change the resize direction in all browsers (opinionated).
     */

    textarea {
      margin: 0; /* 1 */
      overflow: auto; /* 2 */
      resize: vertical; /* 3 */
      resize: block; /* 3 */
      width: 100%;
    }


    /**
     * Turn on lining, proportional numerals without clarified zeroes.
     */

    [type="color"],

    [type="date"],

    [type="datetime"],

    [type="datetime-local"],

    [type="number"],

    [type="range"],

    [type="tel"],

    [type="week"] {
      /* TODO how is kerning affected by `text-rendering`? */
      font-kerning: none;
      font-variant-numeric: proportional-nums lining-nums;
    }


    /**
     * Remove the padding in IE 10-.
     */

    [type="checkbox"],

    [type="radio"] {
      padding: 0;
    }


    /**
     * Remove the border and padding in all browsers (opinionated).
     */

    [type="color"],

    [type="range"] {
      border-width: 0;
      padding: 0;
    }


    /**
     * 1. Correct the odd appearance in Chrome, Edge, and Safari.
     * 2. Correct the outline style in Safari.
     */

    [type="search"] {
      -webkit-appearance: textfield; /* 1 */
      outline-offset: -2px; /* 2 */
    }


    /**
     * Change the inconsistent appearance in IE (opinionated).
     */

    ::-ms-expand {
      display: none;
    }


    /**
     * Correct the cursor style of increment and decrement buttons in Safari.
     */

    ::-webkit-inner-spin-button,

    ::-webkit-outer-spin-button {
      height: auto;
    }


    /**
     * Correct the inconsistent appearance in IE (opinionated).
     */

    :-ms-input-placeholder {
      color: rgba(0, 0, 0, 0.54);
    }


    /**
     * Correct the text style of placeholders in Chrome, Edge, and Safari.
     */

    ::-webkit-input-placeholder {
      color: inherit;
      opacity: 0.54;
    }


    /**
     * Remove the inner padding in Chrome, Edge, and Safari on macOS.
     */

    ::-webkit-search-decoration {
      -webkit-appearance: none;
    }


    /**
     * 1. Correct the inability to style upload buttons in iOS and Safari.
     * 2. Change font properties to `inherit` in Safari.
     */

    ::-webkit-file-upload-button {
      -webkit-appearance: button; /* 1 */
      font: inherit; /* 2 */
    }


    /**
     * Remove the inner border and padding of focus outlines in Firefox.
     */

    ::-moz-focus-inner {
      border-style: none;
      padding: 0;
    }


    /**
     * Restore the focus outline styles unset by the previous rule in Firefox.
     */

    :-moz-focusring {
      outline: 1px dotted ButtonText;
    }


    /**
     * Remove the additional :invalid styles in Firefox.
     */

    :-moz-ui-invalid {
      box-shadow: none;
    }


    /**
     * Add the correct display in Edge 18- and IE.
     */

    details {
      display: block;
    }


    /**
     * Add the correct styles in Edge 18-, IE, and Safari.
     */

    dialog {
      background-color: white;
      border: solid;
      color: black;
      display: block;
      height: -moz-fit-content;
      height: -webkit-fit-content;
      height: fit-content;
      left: 0;
      margin: auto;
      padding: 1em;
      position: absolute;
      right: 0;
      width: -moz-fit-content;
      width: -webkit-fit-content;
      width: fit-content;
    }


    dialog:not([open]) {
      display: none;
    }


    /**
     * 1. Add the correct display in all browsers.
     * 2. Add the correct cursor.
     */

    summary {
      display: list-item; /* 1 */
      cursor: pointer; /* 2 */
    }


    /**
     * Display nested block elements inline.
     */

    summary > * {
      display: inline;
    }


    meter {

    }


    /**
     * Add the correct display in IE 9-.
     */

    canvas {
      display: inline-block;
    }


    /**
     * Add the correct display in IE 10+.
     */

    template {
      display: none;
    }


    /**
     * 1. Remove the tapping delay in IE 10.
     * 2. Remove the tapping delay on clickable elements
          in all browsers (opinionated).
     */

    a,

    area,

    button,

    input,

    label,

    select,

    summary,

    textarea,

    [tabindex] {
      -ms-touch-action: manipulation; /* 1 */
          touch-action: manipulation; /* 2 */
    }


    /**
     * Add the correct display in IE 10-.
     */

    [hidden] {
      display: none !important;
    }


    /**
     * Change the cursor on busy elements in all browsers (opinionated).
     */

    [aria-busy="true"] {
      cursor: progress;
    }


    /**
     * Change the cursor on control elements in all browsers (opinionated).
     */

    [aria-controls] {
      cursor: pointer;
    }


    /**
     * Change the cursor on disabled, not-editable, or otherwise
     * inoperable elements in all browsers (opinionated).
     */

    [aria-disabled="true"],

    [disabled] {
      cursor: not-allowed;
    }


    /**
     * Change the display on visually hidden accessible elements
     * in all browsers (opinionated).
     * 1. Prevent screen readers from interpreting text as one word.
     */

    [aria-hidden="false"][hidden] {
      display: initial !important;
    }


    [aria-hidden="false"][hidden]:not(:focus) {
      border: 0;
      clip: rect(0, 0, 0, 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      white-space: nowrap; /* 1 */
      width: 1px;
    }


    /* ---------------------------------- *\
      #COMPOSITION
    \* ---------------------------------- */


    /**
     * Aspect ratios for media objects.
     */

    .aspect-ratio {
      height: 0;
      padding-top: 56.25%; /* 16:9 */
      padding-top: var(--aspect-ratio, 56.25%);
      padding-block-start: var(--aspect-ratio, 56.25%);
      position: relative;
    }


    .aspect-ratio > * {
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 100;
    }


    /**
     * Container
     */

    .container {
      max-width: 60em;
      max-width: var(--container-width, 60em);
      margin-right: auto;
      margin-left: auto;
      margin-inline: auto;
    }


    /**
     * Cover
     */

    .cover {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }


    /**
     * Flow
     */

    .flow > * + * {
      margin-top: 1.5rem;
    }


    /* ---------------------------------- *\
      #UTILITIES
    \* ---------------------------------- */


    /**
     * Display
     */

    .block {
      display: block;
    }


    .flex {
      display: flex;
      flex-wrap: wrap;
    }


    /**
     * Flexbox
     */

    .flex-1 {
      flex: 1;
    }


    /**
     * Spacing
     */

    .mis-1 {
      margin-left: 0.75em;
      margin-left: var(--vertical-rhythm * 0.5, 0.75em);
      margin-inline-start: var(--vertical-rhythm * 0.5, 0.75em);
    }


    .mis-2 {
      margin-left: 1.5em;
      margin-left: var(--vertical-rhythm * 1, 1.5em);
      margin-inline-start: var(--vertical-rhythm * 1, 1.5em);
    }



    /**
     * Typography
     */

    .bold {
      font-weight: 700;
    }


    /* ---------------------------------- *\
      #BLOCKS
    \* ---------------------------------- */


    /**
     * Media objects
     */

    .media {
      display: flex;
      align-items: flex-start;
    }


    .media-body {
      flex: 1;
    }


    .media:not([data-orientation]) .media-object {
      margin-right: var(--media-padding, 1em);
    }


    .media[data-orientation="reverse"] .media-object {
      order: 1;
      margin-left: var(--media-padding, 1em);
    }
js:
  lang: javascript
---
My own, highly opinionated, normalize styles and minimal front-end framework.

References

* https://cube.fyi
* https://github.com/necolas/normalize.css
* https://github.com/csstools/sanitize.css
* https://github.com/kennethormandy/normalize-opentype.css
* https://github.com/h5bp/html5-boilerplate
* https://github.com/benfrain/app-reset/blob/master/app-reset.css
* https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/
* https://piccalil.li/blog/a-modern-css-reset/
* https://css-tricks.com/the-focus-visible-trick/
* https://yeun.github.io/open-color
* https://alistapart.com/article/axiomatic-css-and-lobotomized-owls
* http://nocode.in/aligning-text-smartly-in-css
* https://css-tricks.com/time-element
* https://github.com/mrmrs/fluidity
* http://www.smashingmagazine.com/2014/11/28/complete-polyfill-html5-details-element
* https://css-tricks.com/html5-meter-element
* http://juicystudio.com/article/screen-readers-display-none.php
* http://snook.ca/archives/html_and_css/hiding-content-for-accessibility
* https://github.com/aprietof/every-layout
* https://github.com/kennethormandy/dodging-bullets
* https://meowni.ca/hidden.is.a.lie.html
* https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
* https://philipwalton.github.io/solved-by-flexbox

### Aspect ratio boxes 
* https://css-tricks.com/aspect-ratio-boxes/
* https://www.smashingmagazine.com/2014/02/making-embedded-content-work-in-responsive-design/
* https://css-tricks.com/aspect-ratio-media-elements-and-intrinsicsize/

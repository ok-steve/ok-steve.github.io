---
layout: code.njk
title: Container
date: 2020-06-19
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <div class="container">
      <p>Lorem lean startup ipsum product market fit customer development acquihire technical cofounder. User engagement A/B testing shrink a market venture capital pitch deck. Social bookmarking group buying crowded market pivot onboarding freemium prototype ping pong. Early stage disruptive ecosystem community outreach dynamic location based strategic investor.</p>
css:
  lang: css
  code: |-
    @import url("/base-styles/style.css");

    :root {
      --container-width: 60rem;
    }

    .container {
      max-width: var(--container-width);
      margin-right: auto;
      margin-left: auto;
    }

    /**
     * Extra styles
     */

    body {
      background-color: gray;
      padding: 1em;
    }

    .container {
      background-color: white;
      padding: 1em;
    }
js:
  lang: javascript
---

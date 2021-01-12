---
layout: code.njk
title: Text field
date: 2019-06-19
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <div class="text-field">
      <p>Lorem lean startup ipsum product market fit customer development acquihire technical cofounder. User engagement A/B testing shrink a market venture capital pitch deck. Social bookmarking group buying crowded market pivot onboarding freemium prototype ping pong. Early stage disruptive ecosystem community outreach dynamic location based strategic investor.</p>
      <p>Accelerator <a href="https://example.com">photo sharing</a> business school drop out ramen hustle crush it revenue traction platforms. Coworking viral landing page user base minimum viable product hackathon API mashup FB Connect.</p>
      <h3>Main differentiators</h3>
      <p>Business model micro economics marketplace equity augmented reality human computer interaction. Board members super angel preferred stock. Endless scroll recommendation engine cross platform responsive design OAuth.</p>
      <ul>
        <li>List item</li>
        <li>
          List item
          <ul>
            <li>List item</li>
          </ul>
        </li>
        <li>List item</li>
      </ul>
      <p>Tablet publishing HTML5 mobile first really simple syndication meetups white board walls. User experience iterate algorithm gamification semantic web value add market research stealth.</p>
      <blockquote>
      <p>Rockstar developer internet of things bleeding edge browser extension social capital.</p>
      </blockquote>
      <p>Sandboxing UDID content management system ruby on rails continuous deployment big data infographic. Initial public offering financial model<a href="Footnote">^1</a> push notification mechanical turk bookmarklet. Term sheet convertible note colluding bootstrapping. Cloud computing subscription model out of the box proactive solution.</p>
    </div>
css:
  lang: css
  code: |-
    @import url("/base-styles/style.css");

    :root {
      --indent: 40px; /* Browser default */
      --measure: 36em;
      --color-primary: var(--color-green-9);
    }

    .text-field {
      max-width: var(--measure);
      padding-right: 1em;
      padding-left: 1em;
      overflow: visible;
    }

    /* Justify paragraphs */
    @supports (hyphens: auto) {
      .text-field p {
        text-align: justify;
        hyphens: auto;
      }
    }

    /* Overhanging lists, needs padding to display list-style-type */
    .text-field ul,
    .text-field ol {
      padding-left: 0;
    }

    .text-field ul ul,
    .text-field ol ul,
    .text-field ul ol,
    .text-field ol ol {
      padding-left: var(--indent);
    }

    .text-field a {
      color: inherit;
      text-shadow: 0.03em 0 #fff, -0.03em 0 #fff,
                  0 0.03em #fff, 0 -0.03em #fff,
                  0.06em 0 #fff, -0.06em 0 #fff,
                  0.09em 0 #fff, -0.09em 0 #fff,
                  0.12em 0 #fff, -0.12em 0 #fff,
                  0.15em 0 #fff, -0.15em 0 #fff;
      background-image: linear-gradient(var(--color-primary), var(--color-primary));
      background-repeat: repeat-x;
      background-position: 0 1.1em;
      background-size: 1px 1px;
    }

    @supports (text-decoration-skip: ink) {
      .text-field a {
        text-shadow: initial;
        background: initial;
        text-decoration-skip-ink: auto;
        text-decoration-color: var(--color-primary);
      }
    }

    .text-field a:hover,
    .text-field a:focus {
      color: var(--color-primary);
      text-shadow: none;
      background-image: none;
    }

    /* Lead paragraph */
    .text-field > p:first-child {
      font-size: var(--ms-1);
    }

    /* Drop caps */
    .text-field > p:first-child::first-letter {
      float: left;
      padding-right: 0.5em;
      font-size: calc(var(--line-height) * 1em * 1.9);
      line-height: 1;
    }

    /* Run-ins */
    .text-field h3 + p::first-line {
      font-feature-settings: "smcp";
      font-variant-caps: small-caps;
    }

    .footnotes {
      font-size: var(--ms--1);
    }

    /**
     * Extra styles
     */

    html {
      background-color: gray;
      padding: 1em;
    }

    .text-field {
      background-color: white;
    }
js:
  lang: javascript
---

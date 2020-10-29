---
layout: code.njk
title: Variable fonts explorer
date: 2019-01-19
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <script src="https://unpkg.com/stimulus@1.1.0/dist/stimulus.umd.js"></script>
    <div class="grid" data-controller="vfont">
      <aside>
        <div class="field" data-controller="field">
          <label for="wdth">Width</label>
          <input type="range" data-target="field.input" data-action="input-&gt;field#update input-&gt;vfont#update" id="wdth" ="" min="60" max="402"/>
          <output data-target="field.output"></output>
        </div>
        <div class="field" data-controller="field">
          <label for="wght">Weight</label>
          <input type="range" data-target="field.input" data-action="input-&gt;field#update input-&gt;vfont#update" id="wght" ="" min="38" max="250"/>
          <output data-target="field.output"></output>
        </div>
        <!--+field('Italics')(id='ital' max=1 value=0)-->
        <!--+field('Slant')(id='slnt' max=10 value=0)-->
        <div class="field" data-controller="field">
          <label for="opsz">Optical size</label>
          <input type="range" data-target="field.input" data-action="input-&gt;field#update input-&gt;vfont#update" id="opsz" ="" min="10" max="72"/>
          <output data-target="field.output"></output>
        </div>
      </aside>
      <main class="vfont-content" data-target="vfont.content">
        <h1>Heading 1</h1>
        <p>Lorem lean startup ipsum product market fit customer development acquihire technical cofounder. User engagement A/B testing shrink a market venture capital pitch deck. Social bookmarking group buying crowded market pivot onboarding freemium prototype ping pong. Early stage disruptive ecosystem community outreach dynamic location based strategic investor.</p>
        <h2>Heading 2</h2>
        <p>Accelerator photo sharing business school drop out ramen hustle crush it revenue traction platforms. Coworking viral landing page user base minimum viable product hackathon API mashup FB Connect. Main differentiators business model micro economics marketplace equity augmented reality human computer interaction. Board members super angel preferred stock. Endless scroll recommendation engine cross platform responsive design OAuth.</p>
        <h3>Heading 3</h3>
        <p>Tablet publishing HTML5 mobile first really simple syndication meetups white board walls. User experience iterate algorithm gamification semantic web value add market research stealth. Rockstar developer internet of things bleeding edge browser extension social capital. Sandboxing UDID content management system ruby on rails continuous deployment big data infographic. Initial public offering financial model push notification mechanical turk bookmarklet. Term sheet convertible note colluding bootstrapping. Cloud computing subscription model out of the box proactive solution.</p>
        <h4>Heading 4</h4>
        <p>Lorem lean startup ipsum product market fit customer development acquihire technical cofounder. User engagement A/B testing shrink a market venture capital pitch deck. Social bookmarking group buying crowded market pivot onboarding freemium prototype ping pong. Early stage disruptive ecosystem community outreach dynamic location based strategic investor.</p>
        <h5>Heading 5</h5>
        <p>Accelerator photo sharing business school drop out ramen hustle crush it revenue traction platforms. Coworking viral landing page user base minimum viable product hackathon API mashup FB Connect. Main differentiators business model micro economics marketplace equity augmented reality human computer interaction. Board members super angel preferred stock. Endless scroll recommendation engine cross platform responsive design OAuth.</p>
        <h6>Heading 6</h6>
        <p>Tablet publishing HTML5 mobile first really simple syndication meetups white board walls. User experience iterate algorithm gamification semantic web value add market research stealth. Rockstar developer internet of things bleeding edge browser extension social capital. Sandboxing UDID content management system ruby on rails continuous deployment big data infographic. Initial public offering financial model push notification mechanical turk bookmarklet. Term sheet convertible note colluding bootstrapping. Cloud computing subscription model out of the box proactive solution.</p>
      </main>
    </div>
css:
  lang: css
  code: |-
    @import url("https://fonts.googleapis.com/earlyaccess/amstelvaralpha.css");

    .vfont-content {
      font-family: 'Amstelvar Alpha', serif;
      font-variation-settings: "wdth" var(--wdth, 231), "wght" var(--wght, 144), "ital" var(--ital, 0), "slnt" var(--slnt, 0), "opsz" var(--opsz, 41);
    }

    /**
     * Demo
     */
    body {
      font-size: 100%;
      padding: 1.5rem;
    }
    body * + * {
      margin-top: 1.5rem;
    }

    h1, h2, h3, h4, h5, h6 {
      margin-bottom: 0;
    }
    h1:first-child, h2:first-child, h3:first-child, h4:first-child, h5:first-child, h6:first-child {
      margin-top: 0;
    }

    p {
      margin-bottom: 0;
    }

    .field {
      display: -webkit-box;
      display: flex;
      flex-wrap: wrap;
    }
    .field > * {
      margin-top: 0;
    }
    .field label {
      flex-basis: 100%;
    }
    .field select,
    .field input {
      -webkit-box-flex: 1;
              flex: 1;
    }
    .field output {
      flex-basis: 3rem;
      text-align: right;
    }

    .grid {
      max-width: 60rem;
      margin: 0 auto;
    }
    @media (min-width: 30rem) {
      .grid {
        display: -webkit-box;
        display: flex;
      }
      .grid > * {
        margin-top: 0;
      }
      .grid > main {
        width: 66%;
      }
      .grid > aside {
        width: 33%;
        padding-right: 1rem;
      }
    }
js:
  lang: javascript
  code: |-
    class FieldController extends Stimulus.Controller {
      static get targets() {
        return [
          'input',
          'output'
        ]
      }
      
      initialize() {
        this.update();
      }
      
      update() {
        this.outputTarget.textContent = this.inputTarget.value;
      }
    }

    class VariableFontController extends Stimulus.Controller {
      static get targets() {
        return [
          'content'
        ];
      }
      
      update(e) {
        this.contentTarget.style.setProperty(`--${e.target.id}`, e.target.value);
      }
    }

    const application = Stimulus.Application.start();

    application.register('field', FieldController);
    application.register('vfont', VariableFontController);
---

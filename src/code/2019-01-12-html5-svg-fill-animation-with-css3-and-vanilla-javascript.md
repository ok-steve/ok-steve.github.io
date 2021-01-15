---
layout: code.njk
title: HTML5 SVG Fill Animation With CSS3 And Vanilla JavaScript
date: 2019-01-12
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <ul class="container">
      <li>
        <figure class="figure">
          <div class="meter" data-controller="meter" data-meter-value="7.50">
            <svg class="meter__svg" width="84" height="84">
              <circle class="meter__circle" cx="41" cy="41" r="38"></circle>
              <circle class="meter__circle meter__circle--fill" cx="41" cy="41" r="38" pathLength="1" data-meter-target="fill"></circle>
            </svg>
            <div class="meter__number"><span class="meter__int" data-meter-target="int">0.</span><span class="meter__dec" data-meter-target="dec">00</span></div>
          </div>
          <figcaption class="figure__caption">Transparent</figcaption>
        </figure>
      </li>
      <li>
        <figure class="figure">
          <div class="meter" data-controller="meter" data-meter-value="9.27">
            <svg class="meter__svg" width="84" height="84">
              <circle class="meter__circle" cx="41" cy="41" r="38"></circle>
              <circle class="meter__circle meter__circle--fill" cx="41" cy="41" r="38" pathLength="1" data-meter-target="fill"></circle>
            </svg>
            <div class="meter__number"><span class="meter__int" data-meter-target="int">0.</span><span class="meter__dec" data-meter-target="dec">00</span></div>
          </div>
          <figcaption class="figure__caption">Reasonable</figcaption>
        </figure>
      </li>
      <li>
        <figure class="figure">
          <div class="meter" data-controller="meter" data-meter-value="6.93">
            <svg class="meter__svg" width="84" height="84">
              <circle class="meter__circle" cx="41" cy="41" r="38"></circle>
              <circle class="meter__circle meter__circle--fill" cx="41" cy="41" r="38" pathLength="1" data-meter-target="fill"></circle>
            </svg>
            <div class="meter__number"><span class="meter__int" data-meter-target="int">0.</span><span class="meter__dec" data-meter-target="dec">00</span></div>
          </div>
          <figcaption class="figure__caption">Usable</figcaption>
        </figure>
      </li>
      <li>
        <figure class="figure">
          <div class="meter" data-controller="meter" data-meter-value="8.72">
            <svg class="meter__svg" width="84" height="84">
              <circle class="meter__circle" cx="41" cy="41" r="38"></circle>
              <circle class="meter__circle meter__circle--fill" cx="41" cy="41" r="38" pathLength="1" data-meter-target="fill"></circle>
            </svg>
            <div class="meter__number"><span class="meter__int" data-meter-target="int">0.</span><span class="meter__dec" data-meter-target="dec">00</span></div>
          </div>
          <figcaption class="figure__caption">Exemplary</figcaption>
        </figure>
      </li>
    </ul>
css:
  lang: css
  code: |-
    @import url("https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css");
    @import url("https://fonts.googleapis.com/css?family=Nixie+One|Raleway:200");
    
    * {
      box-sizing: inherit;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: #3e423a;
      box-sizing: border-box;
      color: #fff;
      display: -webkit-box;
      display: flex;
      font-family: 'Nixie One', cursive;
      height: 100vh;
    }

    .container {
      display: -webkit-box;
      display: flex;
      list-style: none;
      margin: auto;
    }

    .figure {
      -webkit-box-align: center;
              align-items: center;
      display: -webkit-box;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
              flex-direction: column;
      margin: 0 25px;
    }

    .figure__caption {
      font-family: 'Raleway', serif;
      font-size: 14px;
      margin-top: 15px;
      text-transform: uppercase;
    }

    .meter {
      position: relative;
    }

    .meter__svg {
      -webkit-transform: rotate(-90deg);
              transform: rotate(-90deg);
    }

    .meter__circle {
      fill: none;
      stroke-linecap: round;
      stroke-opacity: 0.3;
      stroke-width: 3;
    }

    .meter__circle--fill {
      stroke-dasharray: 1;
      stroke-dashoffset: 1;
      stroke-opacity: 1;
      -webkit-transition: stroke-dashoffset .9s ease;
      transition: stroke-dashoffset .9s ease;
    }

    .meter__number {
      font-weight: bold;
      left: 50%;
      line-height: 28px;
      position: absolute;
      text-align: center;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
      width: 100%;
    }

    .meter__int {
      font-size: 28px;
    }

    .meter__dec {
      font-size: 12px;
    }

    .container > li:nth-child(1) .meter__circle {
      stroke: #af0;
    }

    .container > li:nth-child(2) .meter__circle {
      stroke: #f0a;
    }

    .container > li:nth-child(3) .meter__circle {
      stroke: #a0f;
    }

    .container > li:nth-child(4) .meter__circle {
      stroke: #0af;
    }

js:
  lang: javascript
  code: |-
    import { Application, Controller } from 'https://cdn.skypack.dev/stimulus';

    class MeterController extends Controller {
      static get targets() {
        return [
          'fill',
          'int',
          'dec'
        ];
      }

      connect() {
        this.strokeTransition();
        this.increaseNumber(this.int, 'int');
        this.increaseNumber(this.dec, 'dec');
      }
      
      get dec() {
        return Number(this.data.get('value').split('.')[1]);
      }
      
      set dec(val) {
        this.decTarget.textContent = val;
      }
      
      get int() {
        return Number(this.data.get('value').split('.')[0]);
      }
      
      set int(val) {
        this.intTarget.textContent = `${val}.`;
      }
      
      get value() {
        return parseFloat(this.data.get('value'));
      }
      
      get transitionDuration() {
        let transitionDuration = window.getComputedStyle(this.fillTarget).transitionDuration;
        transitionDuration = parseFloat(transitionDuration) * (transitionDuration.indexOf('ms') > -1 ? 1 : 1000);
        
        return transitionDuration;
      }
      
      strokeTransition() {
        const offset = (10 - this.value) / 10;

        setTimeout(() => this.fillTarget.style.strokeDashoffset = offset, 100);
      }

      increaseNumber(number, className) {
        const interval = this.transitionDuration / number;
        let counter = 0;

        let increaseInterval = setInterval(() => {
          if (counter === number) { window.clearInterval(increaseInterval); }

          this[className] = counter;
          counter++;
        }, interval);
      }
    }

    const application = Application.start();
    application.register('meter', MeterController);
---
See https://www.smashingmagazine.com/2019/01/html5-svg-fill-animation-css3-vanilla-javascript/.

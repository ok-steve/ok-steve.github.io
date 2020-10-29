---
layout: code.njk
title: Finite State Machine button
date: 2018-04-20
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <script src="https://unpkg.com/javascript-state-machine@3.0.1/dist/state-machine.min.js"></script>
    
    <button>Button</button>
css:
  lang: css
  code: |-
    @import url("https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css");

    body {
      align-content: stretch;
      background-color: white;
      box-sizing: border-box;
      display: -webkit-box;
      display: flex;
      font-family: sans-serif;
      height: 100vh;
      -webkit-box-pack: justify;
              justify-content: space-between;
      margin: 0;
      padding: 1em;
    }

    button {
      background-color: inherit;
      border: 10px solid;
      color: black;
      -webkit-box-flex: 1;
              flex: 1;
      font-size: calc(1rem + 5vw);
    }

    [aria-pressed="true"] {
      background-color: black;
      border-color: black;
      color: white;
    }
js:
  lang: javascript
  code: |-
    const btn = document.querySelector('button');

    const ToggleFSM = StateMachine.factory({
      init: 'off',
      transitions: [
        {
          name: 'toggle',
          from: 'off',
          to: 'on',
        },
        {
          name: 'toggle',
          from: 'on',
          to: 'off',
        },
      ],
    });

    const toggle = new ToggleFSM();

    btn.addEventListener('click', e => {
      toggle.toggle();
    });

    toggle.observe('onAfterTransition', x => {
      btn.setAttribute('aria-pressed', toggle.state === 'on');
    });
---

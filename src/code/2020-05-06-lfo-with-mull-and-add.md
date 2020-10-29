---
layout: code.njk
title: LFO with mull and add
date: 2020-05-06
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <button>Resume context</button>
css:
  lang: css
js:
  lang: javascript
  code: |-
    const ctx = new AudioContext();

    const carrier = ctx.createOscillator();
    carrier.frequency.value = 220;

    const modulator = ctx.createOscillator();
    modulator.frequency.value = 2;

    const mul = ctx.createGain();
    mul.gain.value = 1200;

    const add = ctx.createConstantSource();
    add.offset.value = -1200;

    modulator.connect(mul);
    mul.connect(add.offset);
    add.connect(carrier.detune);
    carrier.connect(ctx.destination);

    modulator.start();
    add.start();
    carrier.start();

    const ctxToggle = document.querySelector('button');

    ctxToggle.addEventListener('click', e => {
      if (ctx.state === 'running') {
        ctx.suspend().then(() => {
          ctxToggle.textContent = 'Resume context';
          console.log('Context suspended');
        });
      } else if (ctx.state === 'suspended') {
        ctx.resume().then(() => {
          ctxToggle.textContent = 'Suspend context';
          console.log('Context resumed');
        });  
      }
    });
---

---
layout: code.njk
title: Ping Pong delay
date: 2020-05-16
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <button>Gate</button>
css:
  lang: css
js:
  lang: javascript
  code: |-
    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    osc.frequency.value = 220;
    osc.type = 'sine';

    const gain = ctx.createGain();
    gain.gain.value = 0;

    const delayL = ctx.createDelay();
    delayL.delayTime.value = 0.5;

    const feedbackL = ctx.createGain();
    feedbackL.gain.value = 0.5;

    const panL = ctx.createStereoPanner();
    panL.pan.value = -1;

    const delayR = ctx.createDelay();
    delayR.delayTime.value = 0.5;

    const feedbackR = ctx.createGain();
    feedbackR.gain.value = 0.5;

    const panR = ctx.createStereoPanner();
    panR.pan.value = 1;

    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.connect(delayL);
    delayL.connect(feedbackL);
    feedbackL.connect(panL);
    feedbackL.connect(delayR);
    panL.connect(ctx.destination);
    delayR.connect(feedbackR);
    feedbackR.connect(panR);
    feedbackR.connect(delayL);
    panR.connect(ctx.destination);

    osc.start();
    const attack = 0.1;
    const release = 0.1;

    const gate = document.querySelector('button');

    gate.addEventListener('click', async e => {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      gain.gain.setTargetAtTime(1, ctx.currentTime, attack);
      gain.gain.setTargetAtTime(0, ctx.currentTime + attack, release);
    });
---
Demo of a ping-pong delay using the Web Audio API.

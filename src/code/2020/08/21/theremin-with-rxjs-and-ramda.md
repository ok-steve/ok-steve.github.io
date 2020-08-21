---
layout: code.njk
title: Theremin (with Rxjs and Ramda)
date: 2017-10-02
tags:
  - posts
html:
  lang: html
  code: ""
css:
  lang: css
scripts:
  - https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.4.3/Rx.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/ramda/0.24.1/ramda.min.js
js:
  lang: javascript
  code: |-
    /**
     * Global variables
     */

    const MIN_FREQUENCY = 20;
    const MAX_FREQUENCY = 2000;
    const MIN_GAIN = 0;
    const MAX_GAIN = 1;

    /**
     * Math
     */

    const linearScale = R.curry(([dMin, dMax], [rMin, rMax], val) => {
      return R.add(
        R.multiply(
          R.divide(
            R.subtract(val, dMin),
            R.subtract(dMax, dMin)
          ),
          R.subtract(rMax, rMin)
        ),
        rMin
      );
    });

    const getClient = (propName) => R.ifElse(
      R.compose(R.not, R.isNil, R.prop('touches')),
      R.compose(R.prop(propName), R.head, R.prop('touches')),
      R.prop(propName)
    );

    const calculateFrequency = R.compose(
      R.clamp(MIN_FREQUENCY, MAX_FREQUENCY),
      linearScale([0, window.innerWidth], [MIN_FREQUENCY, MAX_FREQUENCY]),
      getClient('clientX')
    );

    const calculateGain = R.compose(
      R.clamp(MIN_GAIN, MAX_GAIN),
      linearScale([0, window.innerHeight], [MIN_GAIN, MAX_GAIN]),
      getClient('clientY')
    );

    const values = (e) => {
      return [
        calculateFrequency(e),
        calculateGain(e)
      ];
    };

    /**
     * Events
     */

    const pointerdown = (target) => {
      return Rx.Observable.merge(
        Rx.Observable.fromEvent(target, 'mousedown'),
        Rx.Observable.fromEvent(target, 'touchstart')
      );
    };

    const pointermove = (target) => {
      return Rx.Observable.merge(
        Rx.Observable.fromEvent(target, 'mousemove'),
        Rx.Observable.fromEvent(target, 'touchmove')
      );
    };

    const pointerup = (target) => {
      return Rx.Observable.merge(
        Rx.Observable.fromEvent(target, 'mouseup'),
        Rx.Observable.fromEvent(target, 'touchend')
      );
    };

    const pointerdrag = (target) => {
      return pointerdown(target).mergeMap(() => {
        return pointermove(target).takeUntil(pointerup(target));
      });
    };

    /**
     * Synth
     */

    const context = new AudioContext();
    const gain = context.createGain();
    gain.connect(context.destination);

    let osc = null;

    const start = (f, g, when = 0) => {
      if (!osc) {
        osc = context.createOscillator();
        osc.connect(gain);
        osc.frequency.value = f;
        gain.gain.value = g;
        osc.start();
      }
    };

    const stop = () => {
      if (osc) {
        osc.stop();
        osc.disconnect();
        osc = null;
      }
    };

    const setTargetAtTime = (f, g, when = 0, timeConstant = 0.01) => {
      if (osc) {
        osc.frequency.setTargetAtTime(f, when, timeConstant);
      }

      gain.gain.setTargetAtTime(g, when, timeConstant);
    };

    /**
     * App
     */

    const app = (target) => {
      pointerdown(target).map(values).subscribe(([freq, gain]) => {
        start(freq, gain);
      });

      pointerdrag(target).map(values).subscribe(([freq, gain]) => {
        setTargetAtTime(freq, gain);
      });

      pointerup(target).subscribe(() => stop());
    };

    app(document);
---
Drag cursor to begin playing
  
See https://www.smashingmagazine.com/2016/06/make-music-in-the-browser-with-a-web-audio-theremin/
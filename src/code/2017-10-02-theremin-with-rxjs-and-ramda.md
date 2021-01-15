---
layout: code.njk
title: Theremin (with Rxjs and Ramda)
date: 2017-10-02
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <p>Drag cursor to begin playing.</p>
css:
  lang: css
js:
  lang: javascript
  code: |-
    import { add, clamp, compose, curry, divide, head, ifElse, isNil, multiply, not, prop, subtract } from 'https://cdn.skypack.dev/ramda@^0.27.0';
    import { fromEvent, merge } from 'https://cdn.skypack.dev/rxjs@^6.5.5';
    import { map, mergeMap, takeUntil } from 'https://cdn.skypack.dev/rxjs@^6.5.5/operators';

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

    const linearScale = curry(([dMin, dMax], [rMin, rMax], val) => {
      return add(
        multiply(
          divide(
            subtract(val, dMin),
            subtract(dMax, dMin)
          ),
          subtract(rMax, rMin)
        ),
        rMin
      );
    });

    const getClient = (propName) => ifElse(
      compose(not, isNil, prop('touches')),
      compose(prop(propName), head, prop('touches')),
      prop(propName)
    );

    const calculateFrequency = compose(
      clamp(MIN_FREQUENCY, MAX_FREQUENCY),
      linearScale([0, window.innerWidth], [MIN_FREQUENCY, MAX_FREQUENCY]),
      getClient('clientX')
    );

    const calculateGain = compose(
      clamp(MIN_GAIN, MAX_GAIN),
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
      return merge(
        fromEvent(target, 'mousedown'),
        fromEvent(target, 'touchstart')
      );
    };

    const pointermove = (target) => {
      return merge(
        fromEvent(target, 'mousemove'),
        fromEvent(target, 'touchmove')
      );
    };

    const pointerup = (target) => {
      return merge(
        fromEvent(target, 'mouseup'),
        fromEvent(target, 'touchend')
      );
    };

    const pointerdrag = (target) => {
      return pointerdown(target).pipe(
        mergeMap(() => pointermove(target).pipe(takeUntil(pointerup(target))))
      )
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
      pointerdown(target).pipe(map(values)).subscribe(([freq, gain]) => {
        start(freq, gain);
      });

      pointerdrag(target).pipe(map(values)).subscribe(([freq, gain]) => {
        setTargetAtTime(freq, gain);
      });

      pointerup(target).subscribe(() => stop());
    };

    app(document);
---
See https://www.smashingmagazine.com/2016/06/make-music-in-the-browser-with-a-web-audio-theremin/

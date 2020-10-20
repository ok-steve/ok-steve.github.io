---
layout: code.njk
title: Frequency bar graph (with Vue, D3, and Rxjs)
date: 2017-10-02
published: true
tags:
  - code
html:
  lang: html
  code: |-
    <div id="app">
      <p>Click document to start</p>
      <bar-chart width="960" height="600" :data="frequencies"></bar-chart>
    </div>

    <template id="bar-chart">
      <svg :view-box.camel="viewBox">
        <rect v-for="bar in bars" v-bind="bar"></rect>
      </svg>
    </template>
css:
  lang: css
  code: |-
    html {
      background-color: black;
    }

    body {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    p {
      color: white;
      text-align: center;
    }

    #app {
      flex: 1;
    }
js:
  lang: javascript
  code: |-
    import { interpolateRainbow, range, scaleBand, scaleLinear, scalePow } from 'https://cdn.skypack.dev/d3@^5.16.0';
    import { animationFrame, interval, of, Scheduler } from 'https://cdn.skypack.dev/rxjs@^6.5.5';
    import { map, mergeMap, tap, withLatestFrom } from 'https://cdn.skypack.dev/rxjs@^6.5.5/operators';
    import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.min.js';

    /**
     * Global variables
     */

    const MIN_FREQ = 20;
    const MAX_FREQ = 6000;
    const NUM_BARS = 32;
    const FFT_SIZE = 1024 * 8;
    const CONTEXT = new AudioContext();

    /**
     * Utility functions
     */

    const average = list => list.reduce((x, y) => x + y) / list.length;

    const nToFreq = scalePow()
      .exponent(2)
      .domain([0, NUM_BARS])
      .range([MIN_FREQ, MAX_FREQ]);

    const freqToBin = scaleLinear()
      .domain([0, CONTEXT.sampleRate / 2])
      .range([0, FFT_SIZE / 2]);

    const BIN_LOWER = Math.floor(freqToBin(MIN_FREQ));
    const BIN_UPPER = Math.floor(freqToBin(MAX_FREQ));

    // Use a power scale to group bins into equal pitch ranges
    const nToBin = n => Math.floor(freqToBin(nToFreq(n)) - BIN_LOWER);

    const aggregate = (data, num) => {
      return new Uint8Array(num).map((_, i) => {
        const lowerBound = Math.floor(nToBin(i));
        const upperBound = Math.floor(nToBin(i + 1));

        return average(data.slice(lowerBound, upperBound));
      });
    };

    /**
     * Vue
     */

    const BarChart = {
      template: '#bar-chart',
      props: [
        'data',
        'width',
        'height',
      ],
      computed: {
        bars() {
          const len = this.data.length;

          const xScale = scaleBand()
            .domain(range(len))
            .rangeRound([0, this.width])
            .paddingInner(0.05);

          const yScale = scaleLinear()
            .range([0, this.height])
            .domain([0, 255]); // TODO don't hardcode this value

          return Array.from(this.data).map((d, i) => {
            return {
              x: xScale(i),
              y: this.height - yScale(d),
              width: xScale.bandwidth(),
              height: yScale(d),
              fill: interpolateRainbow(i / len),
            };
          });
        },
        viewBox() {
          return `0 0 ${this.width} ${this.height}`;
        },
      }
    };

    /**
     * Audio
     */

    const analyser = CONTEXT.createAnalyser();

    analyser.fftSize = FFT_SIZE;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const microphone = of(navigator).pipe(
      mergeMap(nav => nav.mediaDevices.getUserMedia({ audio: true, video: false }))
    );

    const mediaStream = microphone.pipe(
      map(stream => CONTEXT.createMediaStreamSource(stream)),
      tap(source => source.connect(analyser))
    );

    const animationFrame$ = interval(0, animationFrame);

    const frequencyData = animationFrame$.pipe(
      withLatestFrom(mediaStream),
      map(([frame, source]) => {
        analyser.getByteFrequencyData(dataArray);
        return aggregate(dataArray.slice(BIN_LOWER, BIN_UPPER), NUM_BARS);
      })
    );

    /**
     * App
     */

    const vm = new Vue({
      el: '#app',
      data: {
        frequencies: [],
      },
      components: {
        'bar-chart': BarChart,
      },
    });

    frequencyData.subscribe(data => {
      vm.frequencies = data;
    }, err => console.warn(err.message));

    function resumeAudioContext() {
      CONTEXT.resume().then(() => {
        document.removeEventListener('click', resumeAudioContext);
      });
    }

    document.addEventListener('click', resumeAudioContext);
---

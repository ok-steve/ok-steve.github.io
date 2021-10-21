---
title: Waveform Graph (with Vue, D3, & Rxjs)
date: 2017-10-25
published: false
html:
  lang: html
  code: |-
    <div id="app">
      <line-chart width="960" height="600" :data="waveform"></line-chart>
    </div>

    <template id="line-chart">
      <svg :view-box.camel="viewBox">
        <path :d="line"></path>
      </svg>
    </template>
css:
  lang: css
  code: |-
    :root {
      background-color: black;
    }

    body {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    #app {
      flex: 1;
    }

    path {
      fill: none;
      stroke: #1ec503;
      stroke-width: 2;
    }
js:
  lang: javascript
  code: |-
    import { line, scaleLinear } from 'https://cdn.skypack.dev/d3@^5.16.0';
    import { animationFrame, interval, of } from 'https://cdn.skypack.dev/rxjs@^6.5.5';
    import { map, mergeMap, tap, withLatestFrom } from 'https://cdn.skypack.dev/rxjs@^6.5.5/operators';
    import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.min.js';

    /**
     * Global variables
     */
    
    const FFT_SIZE = 1024;
    const CONTEXT = new AudioContext();
    
    /**
     * Vue
     */

    const LineChart = {
      template: '#line-chart',
      props: [
        'data',
        'width',
        'height',
      ],
      computed: {
        line() {
          const len = this.data.length;
          
          const xScale = scaleLinear()
            .range([0, this.width])
            .domain([0, len]);
          
          const yScale = scaleLinear()
            .range([0, this.height])
            .domain([0, 255]); // TODO don't hardcode this value

          const ln = line()
            .x((_, i) => xScale(i))
            .y(d => yScale(d));
          
          return ln(this.data);
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

    const waveformData = animationFrame$.pipe(
      withLatestFrom(mediaStream),
      map(([frame, source]) => {
        analyser.getByteTimeDomainData(dataArray);
        return Array.from(dataArray);
      })
    );

    /**
     * App
     */

    const vm = new Vue({
      el: '#app',
      data: {
        waveform: [],    
      },
      components: {
        'line-chart': LineChart,    
      },
    });

    waveformData.subscribe(data => {
      vm.waveform = data;
    });

    function resumeAudioContext() {
      CONTEXT.resume().then(() => {
        document.removeEventListener('click', resumeAudioContext);
      });
    }

    document.addEventListener('click', resumeAudioContext);
---
Waveform graph.

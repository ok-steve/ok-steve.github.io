---
layout: code.njk
title: Waveform Graph (with Vue, D3, & Rxjs)
date: 2017-10-25
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <script src="https://unpkg.com/vue@2.4.4/dist/vue.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.10.2/d3.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.4.3/Rx.min.js"></script>
    
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
          
          const xScale = d3.scaleLinear()
            .range([0, this.width])
            .domain([0, len]);
          
          const yScale = d3.scaleLinear()
            .range([0, this.height])
            .domain([0, 255]); // TODO don't hardcode this value

          const ln = d3.line()
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

    const context = new AudioContext();
    const analyser = context.createAnalyser();

    analyser.fftSize = 1024;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const microphone = Rx.Observable.of(navigator)
      .flatMap(nav => nav.mediaDevices.getUserMedia({ audio: true, video: false }));

    const mediaStream = microphone.map(stream => context.createMediaStreamSource(stream))
      .do(source => source.connect(analyser));

    const animationFrame = Rx.Observable.interval(0, Rx.Scheduler.animationFrame);

    const waveformData = animationFrame.withLatestFrom(mediaStream).map(([frame, source]) => {
      analyser.getByteTimeDomainData(dataArray);
      
      return Array.from(dataArray);
    });

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
---

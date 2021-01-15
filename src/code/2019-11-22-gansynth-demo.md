---
layout: code.njk
title: GanSynth demo
date: 2019-11-22
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <button id="toggle" aria-pressed="false">Start</button>
css:
  lang: css
js:
  lang: javascript
  code: |-
    import mm from 'https://cdn.skypack.dev/@magenta/music';

    /**
     * Globals
     */

    const tf = mm.tf;
    const Tone = mm.Player.tone;

    const CHECKPOINT_URL = 'https://storage.googleapis.com/magentadata/js/checkpoints/gansynth/acoustic_only';
    //const CHECKPOINT_URL = 'https://storage.googleapis.com/magentadata/js/checkpoints/gansynth/all_instruments';

    /**
     * App
     */

    const ctx = new AudioContext();
    const model = new mm.GANSynth(CHECKPOINT_URL);

    model.initialize()
      .then(() => model.randomSample(60))
      .then(model.specgramsToAudio)
      .then(data => {
        const myArrayBuffer = ctx.createBuffer(2, data.length, ctx.sampleRate);
        for (var channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
          // This gives us the actual array that contains the data
          var nowBuffering = myArrayBuffer.getChannelData(channel);
          for (var i = 0; i < myArrayBuffer.length; i++) {
            // Math.random() is in [0; 1.0]
            // audio needs to be in [-1.0; 1.0]
            nowBuffering[i] = Math.random() * 2 - 1;
          }
        }
      const source = ctx.createBufferSource();
      source.buffer = myArrayBuffer;
      source.connect(ctx.destination);
      //source.start();
      //ctx.decodeAudioData(data.buffer).then(console.log);
      //console.log(buffer, data.buffer, data);
    });

    const resumeContext = () => {
      if (ctx.state === 'suspended') return ctx.resume();
      return Promise.resolve();
    };

    const play = async () => {
      await resumeContext();
      console.log('play');
    };

    const pause = () => {
      console.log('pause');
    };

    document.querySelector('#toggle').addEventListener('click', e => {
      const playing = e.target.getAttribute('aria-pressed') === 'true';
      
      if (playing) {
        pause();
        e.target.textContent = 'Start';
      } else {
        play();
        e.target.textContent = 'Stop';
      }
      
      e.target.setAttribute('aria-pressed', !playing);
    });
---
A demo of Magenta's GanSynth.

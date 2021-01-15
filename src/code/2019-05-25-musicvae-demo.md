---
layout: code.njk
title: MusicVAE demo
date: 2019-05-25
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <canvas id="canvas"></canvas>
css:
  lang: css
js:
  lang: javascript
  code: |-
    import mm from 'https://cdn.skypack.dev/@magenta/music';

    /**
     * Libraries
     */

    const tf = mm.tf;
    const Tone = mm.Player.tone;


    /**
     * Soundfonts
     */

    const sgm_plus = 'https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus';
    const salamander = 'https://storage.googleapis.com/magentadata/js/soundfonts/salamander';
    const SOUNDFONT_URL = sgm_plus;


    /**
     * Checkpoints
     *
     * https://github.com/tensorflow/magenta-js/blob/master/music/checkpoints/README.md
     */

    const drums_2bar_lokl_small = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/drums_2bar_lokl_small';
    const CHECKPOINT_URL = drums_2bar_lokl_small;


    /**
     * Note sequences
     */


    /**
     * Visualizer
     */

    //const visualizer = new mm.Visualizer(NOTE_SEQUENCE, document.getElementById('canvas'));
    //const redraw = note => visualizer.redraw(note);


    /**
     * Player
     */

    //const playerCallbackObject = { run: redraw };
    //const player = new mm.Player(false, playerCallbackObject);
    const player = new mm.SoundFontPlayer(SOUNDFONT_URL);


    /**
     * Models
     */

    const model = new mm.MusicVAE(CHECKPOINT_URL);


    /**
     * App
     */

    function playVAE(temperature = 1) {
      model.sample(1, temperature)
        .then((sample) => player.start(sample[0]).then(() => playVAE(temperature)));
    }

    function playInterpolation(inputSequences, numInterps = 2) {
      const seqs = inputSequences.map(ns => {
        if (mm.sequences.isQuantizedSequence(ns)) {
          return ns;
        }
        
        return mm.sequences.quantizeNoteSequence(ns, 4);    
      });
      
      model.interpolate(seqs, numInterps)
        .then((sample) => player.start(sample[0]).then(() => playInterpolation(seqs, numInterps)));
    }

    const app = () => {
      if (player.isPlaying()) {
        player.stop();
        return;
      }
      
      playVAE();
    };

    model.initialize().then(() => {
      app();
    });
---
A demo of Magenta's MusicVAE.

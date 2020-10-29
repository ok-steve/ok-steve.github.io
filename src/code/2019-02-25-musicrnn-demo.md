---
layout: code.njk
title: MusicRNN demo
date: 2019-02-25
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <script src="https://cdn.jsdelivr.net/npm/@magenta/music@1.12.0/dist/magentamusic.min.js"></script>
    <button id="toggle" aria-pressed="false">Start</button>
css:
  lang: css
js:
  lang: javascript
  code: |-
    /**
     * Globals
     */

    const tf = mm.tf;
    const Tone = mm.Player.tone;

    // https://github.com/tensorflow/magenta-js/tree/master/music#soundfonts
    const SOUNDFONT_URL = 'https://storage.googleapis.com/magentadata/js/soundfonts/jazz_kit';

    // https://github.com/tensorflow/magenta-js/blob/master/music/checkpoints/README.md
    const CHECKPOINT_URL = 'https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/drum_kit_rnn';


    /**
     * Note sequences
     */

    const DRUMS = {
      notes: [
        { pitch: 36, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
        { pitch: 38, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
        { pitch: 42, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
        { pitch: 46, quantizedStartStep: 0, quantizedEndStep: 1, isDrum: true },
        { pitch: 42, quantizedStartStep: 2, quantizedEndStep: 3, isDrum: true },
        { pitch: 42, quantizedStartStep: 3, quantizedEndStep: 4, isDrum: true },
        { pitch: 42, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
        { pitch: 50, quantizedStartStep: 4, quantizedEndStep: 5, isDrum: true },
        { pitch: 36, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
        { pitch: 38, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
        { pitch: 42, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
        { pitch: 45, quantizedStartStep: 6, quantizedEndStep: 7, isDrum: true },
        { pitch: 36, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
        { pitch: 42, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
        { pitch: 46, quantizedStartStep: 8, quantizedEndStep: 9, isDrum: true },
        { pitch: 42, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
        { pitch: 48, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
        { pitch: 50, quantizedStartStep: 10, quantizedEndStep: 11, isDrum: true },
      ],
      quantizationInfo: {stepsPerQuarter: 4},
      tempos: [{time: 0, qpm: 120}],
      totalQuantizedSteps: 11
    };

    /**
     * Player
     */

    const player = new mm.SoundFontPlayer(SOUNDFONT_URL);


    /**
     * Models
     *
     * https://github.com/tensorflow/magenta/tree/master/magenta/models/improv_rnn
     */

    const model = new mm.MusicRNN(CHECKPOINT_URL);

    const initializeModel = () => {
      if (model.isInitialized()) return Promise.resolve();
      return model.initialize();
    };

    // https://tensorflow.github.io/magenta-js/music/classes/_music_rnn_model_.musicrnn.html#continuesequence
    const continueSequence = (sequence, ...args) => {
      if (!mm.sequences.isQuantizedSequence(sequence)) {
        sequence = mm.sequences.quantizeNoteSequence(sequence, 4);
      }
      
      return model.continueSequence(sequence, ...args)
        .then(sample => player.start(sample).then(() => continueSequence(sample, ...args)));
    };

    /**
     * App
     */

    const play = async () => {
      await initializeModel();
      continueSequence(DRUMS, 16, 1.5);
    };

    const pause = () => {
      if (player.isPlaying()) {
        player.stop();
      }
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

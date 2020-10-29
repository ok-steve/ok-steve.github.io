---
layout: code.njk
title: Microtonal piano
date: 2019-01-12
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/13.8.12/Tone.min.js"></script>
    <script src="https://unpkg.com/nexusui@2.0.10/dist/NexusUI.min.js"></script>
    <script src="https://gitcdn.xyz/repo/abbernie/tune/master/tune-api-only.js"></script>
    <script src="https://gitcdn.xyz/repo/abbernie/tune-scales/master/tunings.js"></script>

    <div class="container">
      <div class="tuning">
        <div id="tuning"></div>
      </div>
      <div class="description">
        <div id="tuning-description"></div>
      </div>
    </div>
    <div class="container">
      <div id="piano"></div>
    </div>
css:
  lang: css
  code: |-
    @import url("https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css");

    * {
      box-sizing: inherit;
    }

    body {
      box-sizing: border-box;
    }

    .container {
      display: -webkit-box;
      display: flex;
      -webkit-box-pack: center;
              justify-content: center;
      -webkit-box-align: center;
              align-items: center;
      padding: 2em;
    }

    .description {
      font-size: 1.5em;
      padding-left: 1rem;
    }

    .tuning {
      width: 33%;
    }
    .tuning > * {
      margin-left: auto;
    }

    .description {
      -webkit-box-flex: 2;
              flex: 2;
    }
js:
  lang: javascript
  code: |-
    /**
     * Tune.js
     * https://github.com/abbernie/tune-api
     */

    TuningList['etmajor'] = {
      description: '12-tone equal temperament',
      frequencies: Array.from(new Array(12), (_, i) => i + 60).map(note => Tone.Midi(note).toFrequency())
    };

    TuningList['hindemith'] = {
      description: 'From The Craft of Musical Composition by Paul Hindemith',
      frequencies: [64, 68.27, 72, 76.8, 80, 85.33333, 91.02, 96, 102.4, 106.66666, 113.78, 120].map(freq => freq * 4)
    };

    const tune = new Tune();


    /**
     * Utilities
     */

    const ftom = freq => 69 + 12 * Math.log2(freq / 440);

    // MIDI-to-frequency with tuning
    const mtof = midi => {
      const note = midi - 9;
      let stepIn = note % 12;

      while (stepIn < 0) {
        stepIn += 12;
      }

      const octaveIn = Math.floor((note / 12) - 5) + Math.floor(stepIn / 12);
      const freq = tune.note(stepIn, octaveIn);
      
      return freq;
    };

    const midiToDetune = midi => {
      const note = ftom(mtof(midi));
      const detune = (note - midi) * 100;
      
      return detune;
    };


    /**
     * App
     */

    const synth = new Tone.PolySynth(10).toMaster();
    const tuningDescription = document.querySelector('#tuning-description');

    new Nexus.Select('#tuning', {
      options: Object.keys(TuningList).sort()
    }).on('change', ({ index, value }) => {
      tune.loadScale(value);
      
      tuningDescription.textContent = TuningList[value].description;
      
      synth.voices.filter(voice => {
        return voice.envelope.value > 0;
      }).forEach((voice, i) => {
        const midi = Tone.Frequency(voice.frequency.value).toMidi();
        voice.detune.setValueAtTime(midiToDetune(midi), Tone.now());
      });
    }).value = 'etmajor';

    new Nexus.Piano('#piano', {
      size: [1000, 125],
      lowNote: 21,
      highNote: 108,
      mode: 'toggle'
    }).on('change', ({ note, state }) => {
      const freq = Tone.Midi(note).toFrequency();

      if (state) {
        synth.triggerAttack(freq);
        const voice = synth._getClosestVoice(Tone.now(), freq);
        voice.detune.setValueAtTime(midiToDetune(note), Tone.now());
      } else {
        synth.triggerRelease(freq);
      }
    });
---

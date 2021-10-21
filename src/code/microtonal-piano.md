---
title: Microtonal piano
date: 2019-01-12
published: false
html:
  lang: html
  code: |-
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
    import Nexus from 'https://cdn.skypack.dev/nexusui';
    import { Frequency, Midi, now, PolySynth, Synth } from 'https://cdn.skypack.dev/tone';

    async function init() {
      /**
       * Fake modules
       */
      const res = await fetch('https://gitcdn.xyz/repo/abbernie/tune-scales/master/tunings.js');
      const data = await res.text();
      const TuningList = JSON.parse(data.slice(17));

      /**
       * Tune.js
       * https://github.com/abbernie/tune-api
       * https://github.com/abbernie/tune-scales
       */

      TuningList['etmajor'] = {
        description: '12-tone equal temperament',
        frequencies: Array.from(new Array(12), (_, i) => i + 60).map(note => Midi(note).toFrequency())
      };

      TuningList['hindemith'] = {
        description: 'From The Craft of Musical Composition by Paul Hindemith',
        frequencies: [64, 68.27, 72, 76.8, 80, 85.33333, 91.02, 96, 102.4, 106.66666, 113.78, 120].map(freq => freq * 4)
      };

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
        const freq = Nexus.note(stepIn, octaveIn);
        console.log('mtof', freq);
        
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

      const synth = new PolySynth(Synth, { maxPolyphony: 10 }).toDestination();
      const tuningDescription = document.querySelector('#tuning-description');

      new Nexus.Select('#tuning', {
        options: Object.keys(TuningList).sort()
      }).on('change', ({ index, value }) => {
        Nexus.tune.loadScaleFromFrequencies(TuningList[value].frequencies);
        
        tuningDescription.textContent = TuningList[value].description;
        
        synth._voices.filter(voice => {
          return voice.envelope.value > 0;
        }).forEach((voice, i) => {
          const midi = Frequency(voice.frequency.value).toMidi();
          voice.detune.setValueAtTime(midiToDetune(midi), now());
        });
      }).value = 'etmajor';

      new Nexus.Piano('#piano', {
        size: [1000, 125],
        lowNote: 21,
        highNote: 108,
        mode: 'toggle'
      }).on('change', ({ note, state }) => {
        const freq = Midi(note).toFrequency();

        if (state) {
          const currentTime = now();
          synth.triggerAttack(freq, currentTime);
          const { voice } = synth._activeVoices[synth._activeVoices.length - 1];
          voice.detune.setValueAtTime(midiToDetune(note), currentTime);
        } else {
          synth.triggerRelease(freq);
        }
      });
    }

    init();
---
A microtonal piano.

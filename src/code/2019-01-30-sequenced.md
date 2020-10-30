---
layout: code.njk
title: Sequenced
date: 2019-01-30
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <script src="https://cdn.jsdelivr.net/npm/nexusui@2.0.7/dist/NexusUI.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/tone@13.3.1/build/Tone.min.js"></script>
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">Oscillator</div>
            </div>
            <div class="card-content">
              <div class="field">
                <label class="label">Type</label>
                <div class="control">
                  <div id="synth-oscillator-type"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Octave detune</label>
                <div class="control">
                  <div id="synth-oscillator-detune-octave"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Coarse detune</label>
                <div class="control">
                  <div id="synth-oscillator-detune-coarse"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Fine detune</label>
                <div class="control">
                  <div id="synth-oscillator-detune-fine"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Phase</label>
                <div class="control">
                  <div id="synth-oscillator-phase"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">Envelope</div>
            </div>
            <div class="card-content">
              <div class="field">
                <label class="label">Envelope</label>
                <div class="control">
                  <div id="synth-envelope-envelope"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">Filter</div>
            </div>
            <div class="card-content">
              <div class="field">
                <label class="label">Type</label>
                <div class="control">
                  <div id="synth-filter-type"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Rolloff</label>
                <div class="control">
                  <div id="synth-filter-rolloff"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Frequency</label>
                <div class="control">
                  <div id="synth-filter-frequency"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Q</label>
                <div class="control">
                  <div id="synth-filter-q"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">Filter envelope</div>
            </div>
            <div class="card-content">
              <div class="field">
                <label class="label">Envelope</label>
                <div class="control">
                  <div id="synth-filter-envelope-envelope"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Base frequency</label>
                <div class="control">
                  <div id="synth-filter-envelope-base-frequency"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Octaves</label>
                <div class="control">
                  <div id="synth-filter-envelope-octaves"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Exponent</label>
                <div class="control">
                  <div id="synth-filter-envelope-exponent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">LFO</div>
            </div>
            <div class="card-content">
              <div class="field">
                <label class="label">Frequency</label>
                <div class="control">
                  <div id="lfo-frequency"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Type</label>
                <div class="control">
                  <div id="lfo-type"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Min</label>
                <div class="control">
                  <div id="lfo-min"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Max</label>
                <div class="control">
                  <div id="lfo-max"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">Loop</div>
            </div>
            <div class="card-content">
              <div class="field">
                <label class="label">Interval</label>
                <div class="control">
                  <div id="loop-interval"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">Transport</div>
            </div>
            <div class="card-content">
              <div class="field">
                <label class="label">BPM</label>
                <div class="control">
                  <div id="transport-bpm"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">State</label>
                <div class="control">
                  <div id="transport-state"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="piano"></div>
    </div>
css:
  lang: css
  code: |-
    @import url("https://cdn.jsdelivr.net/npm/bulma@0.7.2/css/bulma.min.css");
js:
  lang: javascript
  code: |-
    import { createAmplitudeEnvelope, createFilter, createFrequencyEnvelope, createLfo, createLoop, createOmniOscillator, createPiano, createTransport } from '/code/2017/02/07/nexus-tone-components/script.js';
    
    const options = {
      synth: {
        oscillator: {
          type: 'sawtooth' 
        },
        envelope: {
          decay: 0.8,
          sustain: 0,
          release: 0.02
        },
        filter: {
          rolloff: -12
        },
        filterEnvelope: {
          octaves: 0,
          decay: 0.8,
          sustain: 0,
          release: 0.02
        }
      },
      loop: {
        interval: '8n'
      },
      lfo: {
        frequency: '1n',
        min: 100, 
        max: 2000, 
        type: 'sawtooth'
      },
      transport: {
        state: 'started'
      }
    };

    const synth = new Tone.PolySynth(4, Tone.MonoSynth, options.synth);
    const lfo = new Tone.LFO(options.lfo.frequency, options.lfo.min, options.lfo.max);

    synth.chain(Tone.Master);

    synth.voices.forEach(voice => {
      lfo.connect(voice.filter.frequency);
    });
    lfo.type = options.lfo.type;
    lfo.sync().start();

    if (options.transport.state === 'started') Tone.Transport.start();

    const voices = new Set();

    const loop = new Tone.Loop((time) => {
      if (voices.size > 0) {
        const freqs = Array.from(voices).map(note => Tone.Midi(note).toFrequency());
        synth.triggerAttackRelease(freqs, '1n', time);
      }
    }, options.loop.interval).start();

    const onMidi = ([status, data0, data1]) => {
      switch (status) {
        case 144: {
          voices.add(data0);
          break;
        }
        case 128: {
          voices.delete(data0);
          break;
        }
      }
    };

    const { oscillator, envelope, filter, filterEnvelope } = synth.get();

    createOmniOscillator('#synth-oscillator', oscillator, value => {
      synth.set({ oscillator: value })
    })

    createAmplitudeEnvelope('#synth-envelope', envelope, value => {
      synth.set({ envelope: value })
    })

    createFilter('#synth-filter', filter, value => {
      synth.set({ filter: value })
    })

    createFrequencyEnvelope('#synth-filter-envelope', filterEnvelope, value => {
      synth.set({ filterEnvelope: value });
    });

    createLoop('#loop', loop.get(), value => {
      loop.set(value);
    });

    createLfo('#lfo', lfo.get(), value => {
      lfo.set(value);
    });

    createTransport('#transport', {
      bpm: Tone.Transport.bpm.value,
      state: Tone.Transport.state === 'started'
    }, value => {
      Object.keys(value).forEach(key => {
        switch (key) {
          case 'bpm': {
            Tone.Transport.bpm.value = value[key];
            break;
          }
          case 'state': {
            if (value[key]) {
              Tone.Transport.start();
            } else {
              Tone.Transport.stop();
            }
          }
        }
      })
    })

    createPiano('#piano', { mode: 'button' }, onMidi);
---

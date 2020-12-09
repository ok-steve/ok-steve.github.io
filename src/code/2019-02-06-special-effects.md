---
layout: code.njk
title: Special effects
date: 2019-02-06
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
              <div class="card-header-title">Noise</div>
            </div>
            <div class="card-content">
              <div class="field">
                <label class="label">Type</label>
                <div class="control">
                  <div id="noise-type"></div>
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
                <label class="label">Frequency</label>
                <div class="control">
                  <div id="filter-frequency"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Type</label>
                <div class="control">
                  <div id="filter-type"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Base frequency</label>
                <div class="control">
                  <div id="filter-base-frequency"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Octaves</label>
                <div class="control">
                  <div id="filter-octaves"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Filter type</label>
                <div class="control">
                  <div id="filter-filter-type"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Rolloff</label>
                <div class="control">
                  <div id="filter-filter-rolloff"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Q</label>
                <div class="control">
                  <div id="filter-filter-q"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-header">
              <div class="card-header-title">Reverb</div>
            </div>
            <div class="card-content">
              <div class="field">
                <label class="label">Room size</label>
                <div class="control">
                  <div id="reverb-room-size"></div>
                </div>
              </div>
              <div class="field">
                <label class="label">Dampening</label>
                <div class="control">
                  <div id="reverb-dampening"></div>
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
    import { createAutoFilter, createFreeverb, createNoise, createPiano, createTransport } from '/code/nexus-tone-components/script.js';

    const options = {
      noise: {
        type: 'white' 
      },
      filter: {
        frequency: '4m',
        baseFrequency: 20,
        octaves: 6,
        type: 'sawtooth',
        filter: {
          type: 'bandpass',
          Q: 100
        }
      },
      reverb: {
        roomSize: 0.2,
        dampening: 1000
      },
      transport: {
        state: 'started'
      }
    };

    const noise = new Tone.Noise(options.noise.type);
    const filter = new Tone.AutoFilter(options.filter);
    filter._lfo.set('phase', 180);
    const reverb = new Tone.Freeverb(options.reverb.roomSize, options.reverb.dampening);

    noise.chain(filter, reverb, Tone.Master);

    if (options.transport.state === 'started') Tone.Transport.start();

    const onMidi = ([status, data0, data1]) => {
      switch (status) {
        case 144: {
          const len = Tone.Time(1 / filter.get('frequency').frequency).toSeconds();

          Tone.Transport.schedule(time => {
            reverb.set('roomSize', options.reverb.roomSize);
            reverb.roomSize.linearRampTo(0.8, len, time);
            filter.filter.Q.set(options.filter.filter.Q);
            filter.filter.Q.linearRampTo(0.1, len, time);
            noise.start(time).stop(time + len);
            filter.start(time).stop(time + len);
          }, Tone.Transport.nextSubdivision(len));
          break;
        }
      }
    };

    createNoise('#noise', noise.get(), value => {
      noise.set(value);
    });

    createAutoFilter('#filter', filter.get(), value => {
      filter.set(value);
    });

    createFreeverb('#reverb', reverb.get(), value => {
      reverb.set(value);
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
    });

    createPiano('#piano', { mode: 'button' }, onMidi);
---

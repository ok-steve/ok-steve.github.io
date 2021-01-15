---
layout: code.njk
title: Modular synthesizer (with React)
date: 2018-04-25
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <div id="root" class="section">
      <div class="container">
        <div id="app">
          <button class="button">Start</button>
        </div>
      </div>
    </div>
css:
  lang: css
  code: |-
    @import url("https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css");

    .is-nexus-centered > [nexus-ui] {
      margin-right: auto;
      margin-left: auto;
    }

    .card {
      height: 100%;
    }
js:
  lang: javascript
  code: |-
    import { h, Component, createContext, render } from 'https://cdn.skypack.dev/preact';
    import htm from 'https://cdn.skypack.dev/htm';
    import { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'https://cdn.skypack.dev/preact/hooks';
    import Nexus from 'https://cdn.skypack.dev/nexusui';
    import { AmplitudeEnvelope, Channel, Envelope, Filter, Gain, Oscillator } from 'https://cdn.skypack.dev/tone';
    import { mergeDeepRight } from 'https://cdn.jsdelivr.net/npm/ramda@0.27.1/es/index.js';

    /**
     * Utilities
     */

    const html = htm.bind(h);

    const pubsub = () => {
      const subscribers = new Set();
      
      const publish = data => {
        subscribers.forEach(subscriber => subscriber(data));
      };
      
      const subscribe = subscriber => {
        subscribers.add(subscriber);
        
        return {
          unsubscribe() {
            subscribers.delete(subscriber);
          },
        };
      };
      
      return {
        publish,
        subscribe,
      }
    };

    /**
     * Nexus components
     */
     
    function NexusComponent({ type, value, onChange, onStep, ...props }) {
      const el = useRef(null);
      const nexus = useRef(null);

      const handleChange = useCallback(value => onChange !== undefined ? onChange(value) : undefined, [onChange]);
      const handleStep = useCallback(value => onStep !== undefined ? onStep(value) : undefined,[onStep]);

      const getNexus = () => {
        if (el.current !== null && nexus.current === null) {
          const ui = new type(el.current, props);
          if (value !== undefined) ui.value = value;
          ui.on('change', handleChange);
          ui.on('step', handleStep);
          nexus.current = ui;
        }

        return nexus.current;
      };

      useEffect(() => {
        const ui = getNexus();
        return () => ui.destroy();
      }, [el, nexus]);

      return html`<div ref=${el}></div>`;
    }

    const makeNexusComponent = type => props =>   html`<${NexusComponent} ...${props} type=${type}/>`;

    // Core

    const NexusButton = makeNexusComponent(Nexus.Button);
    const NexusDial = makeNexusComponent(Nexus.Dial);
    const NexusNumber = makeNexusComponent(Nexus.Number);
    const NexusPosition = makeNexusComponent(Nexus.Position);
    const NexusSlider = makeNexusComponent(Nexus.Slider);
    const NexusToggle = makeNexusComponent(Nexus.Toggle);

    // General

    const NexusEnvelope = makeNexusComponent(Nexus.Envelope);
    const NexusMultislider = makeNexusComponent(Nexus.Multislider);
    const NexusPiano = makeNexusComponent(Nexus.Piano);
    const NexusRadioButton = makeNexusComponent(Nexus.RadioButton);
    const NexusSelect = makeNexusComponent(Nexus.Select);
    const NexusSequencer = makeNexusComponent(Nexus.Sequencer);
    const NexusTextButton = makeNexusComponent(Nexus.TextButton);

    // Mobile

    const NexusTilt = makeNexusComponent(Nexus.Tilt);

    // Spatialization

    const NexusPan = makeNexusComponent(Nexus.Pan);
    const NexusPan2D = makeNexusComponent(Nexus.Pan2D);

    // Visualization

    const NexusMeter = makeNexusComponent(Nexus.Meter);
    const NexusOscilloscope = makeNexusComponent(Nexus.Oscilloscope);
    const NexusSpectrogram = makeNexusComponent(Nexus.Spectrogram);


    /**
     * Contexts
     */

    const MidiContext = createContext(pubsub());
    const ToneBusContext = createContext(null);

    /**
     * Hooks
     */

    function useToneBus(node) {
      const { send, receive } = useContext(ToneBusContext);
      const input = useRef(null);
      const output = useRef(null);

      useEffect(() => {
        if (send !== undefined && node !== undefined) {
          if (output.current === null) {
            output.current = new Channel();
          }

          node.connect(output.current);
          output.current.send(send, 1);
        }
      }, [send, node, output]);

      useEffect(() => {
        if (receive !== undefined && node !== undefined) {
          if (input.current === null) {
            input.current = new Channel();
          }

          input.current.connect(node);
          input.current.receive(receive);
        }
      }, [receive, node, input]);
    }

    function useMidi(onMessage) {
      const { subscribe } = useContext(MidiContext);
      
      useEffect(() => {
        const listener = (subscribe !== undefined && onMessage !== undefined) ? subscribe(onMessage) : undefined;
    
        return () => {
          if (listener !== undefined) listener.unsubscribe();
        };
      }, [subscribe, onMessage]);
    }

    /**
     * Components
     */

    function BulmaCard({ title, children }) {
      return html`
        <div className="card">
          <div className="card-header">
            <h2 className="card-header-title">${title}</h2>
          </div>
          <div className="card-content">
            ${children}
          </div>
        </div>
      `;
    }

    function ToneWrapper({ node, onMessage, children }) {
      useToneBus(node);
      useMidi(onMessage);

      useEffect(() => {
        return () => {
          if (node !== undefined) node.dispose();
        };
      }, [node]);
        
      return html`
        ${children}
      `;
    }

    function ToneAmplitudeEnvelope({ attack, decay, sustain, release, onChange }) {
      const [node] = useState(() => new AmplitudeEnvelope({ attack, decay, sustain, release }));
      const [envelope] = useState([attack, decay, sustain, release]);
      const [keys] = useState(() => ['attack', 'decay', 'sustain', 'release']);

      const handleChange = useCallback(({ index, value }) => {
        const key = keys[index];
        if (onChange !== undefined) onChange({ [key]: value });
      }, [onChange]);

      const handleMessage = useCallback(([status, data0, data1]) => {
        switch (status) {
          case 144:
            node.triggerAttack();
            break;
          case 128:
            node.triggerRelease();
            break;
        } 
      }, [node]);
      
      useEffect(() => {
        node.set({ attack });
      }, [attack, node]);
      
      useEffect(() => {
        node.set({ decay });
      }, [decay, node]);
      
      useEffect(() => {
        node.set({ sustain });
      }, [sustain, node]);
      
      useEffect(() => {
        node.set({ release });
      }, [release, node]);
        
      return html`
        <${ToneWrapper} node=${node} onMessage=${handleMessage}>
          <${NexusMultislider} numberOfSliders=${envelope.length} min=${0} max=${2} step=${0.001} values=${envelope} onChange=${handleChange}/>
        <//>
      `;
    }

    function ToneFilter({ frequency, type, rolloff, onChange }) {
      const [node] = useState(() => new Filter({ frequency, type, rolloff }));
      const [types] = useState(() => ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'notch', 'allpass', 'peaking']);
      const [rolloffs] = useState(() => [-12, -24, -48, -96]);

      const setFrequency = useCallback(frequency => {
        if (onChange !== undefined) onChange({ frequency });
      }, [onChange]);
      
      const setType = useCallback(({ index, value }) => {
        if (onChange !== undefined) onChange({ type: value });
      }, [onChange]);
      
      const setRolloff = useCallback(({ index, value }) => {
        if (onChange !== undefined) onChange({ rolloff: value });
      }, [onChange]);
    
      useEffect(() => {    
        node.set({ frequency });
      }, [frequency, node]);

      useEffect(() => {    
        node.set({ type });
      }, [type, node]);

      useEffect(() => {    
        node.set({ rolloff });
      }, [rolloff, node]);

      return html`
        <${ToneWrapper} node=${node}>
          <h3 className="is-size-7">Frequency</h3>
          <${NexusSlider} min=${20} max=${20000} step=${1} value=${frequency} onChange=${setFrequency}/>
          <h3 className="is-size-7">Type</h3>
          <${NexusSelect} value=${type} options=${types} onChange=${setType}/>
          <h3 className="is-size-7">Rolloff</h3>
          <${NexusSelect} value=${rolloff} options=${rolloffs} onChange=${setRolloff}/>
        <//>
      `;
    }

    function ToneOscillator({ detune, type, onChange }) {
      const [node] = useState(() => new Oscillator({ detune, type }).start());
      const [mute, setMute] = useState(false);
      const [types] = useState(() => ['sine', 'triangle', 'square', 'sawtooth']);
      
      const setDetune = useCallback(detune => {
        if (onChange !== undefined) onChange({ detune });
      }, [onChange]);

      const setType = useCallback(({ index, value }) => {
        if (onChange !== undefined) onChange({ type: value }); 
      }, [onChange]);
      
      const handleMessage = ([status, data0, data1]) => {
        if (status === 144) {
          const frequency = Nexus.mtof(data0);
          node.set({ frequency });
        }
      };
      
      /*useEffect(() => {
        node.mute = mute;
      }, [mute, node]);*/
      
      useEffect(() => {
        node.set({ detune });
      }, [detune]);
      
      useEffect(() => {
        node.set({ type });
      }, [type]);
        
      return html`
        <${ToneWrapper} node=${node} onMessage=${handleMessage}>
          <div className="columns">
            <div className="column">
              <h3 className="is-size-7">Type</h3>
              <${NexusSelect} value=${type} options=${types} onChange=${setType}/>
            </div>
            <div className="column">
              <h3 className="is-size-7">Detune</h3>
              <${NexusDial} value=${detune} min=${-100} max=${100} step=${1} size=${[32, 32]} onChange=${setDetune}/>
            </div>
            <div className="column">
              <h3 className="is-size-7">Mute</h3>
              <${NexusToggle} state=${mute} onChange=${setMute}/>
            </div>
          </div>
        <//>
      `;
    }

    function ToneMaster({ gain = 1, onChange }) {
      const [node] = useState(() => new Gain({ gain }));

      useEffect(() => {
        node.toDestination();
      }, []);
    
      useEffect(() => {
        node.set({ gain });
      }, [gain, node]);

      const setGain = useCallback(gain => {
        if (onChange !== undefined) onChange({ gain });
      }, [onChange]);

      return html`
        <${ToneWrapper} node=${node}>
          <h3 className="is-size-7">Gain</h3>
          <${NexusSlider} min=${0} max=${1} value=${gain} onChange=${setGain}/>
        <//>
      `;
    }

    function OscillatorBank({ oscillators, onChange, ...props }) {
      // TODO use hooks?
      const handleChange = key => payload => onChange({ [key]: payload });
      
      return Object.keys(oscillators).map(key => {
        return html`<${ToneOscillator} ...${props} ...${oscillators[key]} key=${key} onChange=${handleChange(key)}/>`;
      });
    }

    function MidiPiano(props) {
      const { publish } = useContext(MidiContext);

      const handleChange = useCallback(({ note, state }) => {
        const status = state ? 144 : 128;
        publish([status, note, 127]);
      }, [publish]);

      return html`<${NexusPiano} ...${props} onChange=${handleChange}/>`;
    }

    /**
     * App
     */

    const initialState = {
      envelope: Envelope.getDefaults(),
      filter: Filter.getDefaults(),
      oscillator1: { ...Oscillator.getDefaults(), type: 'sawtooth' },
      oscillator2: { ...Oscillator.getDefaults(), type: 'sawtooth', detune: -5 },
      oscillator3: { ...Oscillator.getDefaults(), type: 'sawtooth', detune: 5 },
      master: { gain: 1 }
    };

    const appReducer = (state, { type, ...payload }) => {
      switch (type) {
        case 'update': {
          return mergeDeepRight(state, payload);
        }
        default: {
          return state;
        }
      }
    };

    function App() {
      const [state, dispatch] = useReducer(appReducer, initialState);
      const { filter, envelope, master, ...oscillators } = state;

      return html`
        <div className="columns">
          <div className="column">
            <${BulmaCard} title="Oscillators">
              <${ToneBusContext.Provider} value=${{ send: 'filter' }}>
                <${OscillatorBank} oscillators=${oscillators} onChange=${payload => dispatch({ type: 'update', ...payload })}/>
              <//>
            <//>
          </div>
          <div className="column">
            <${BulmaCard} title="Envelope">
              <${ToneBusContext.Provider} value=${{ receive: 'envelope', send: 'master' }}>
                <${ToneAmplitudeEnvelope} ...${envelope} onChange=${envelope => dispatch({ type: 'update', envelope })}/>
              <//>
            <//>
          </div>
          <div className="column">
            <${BulmaCard} title="Filter">
              <${ToneBusContext.Provider} value=${{ receive: 'filter', send: 'envelope' }}>
                <${ToneFilter} ...${filter} onChange=${filter => dispatch({ type: 'update', filter })}/>
              <//>
            <//>
          </div>
          <div className="column">
            <${BulmaCard} title="Master">
              <${ToneBusContext.Provider} value=${{ receive: 'master' }}>
                <${ToneMaster} ...${master} onChange=${master => dispatch({ type: 'update', master })} />
              <//>
            <//>
          </div>
        </div>
        <div className="container mt-5 is-nexus-centered">
          <${MidiPiano} lowNote=${21} highNote=${108} size=${[1000,125]}/>
        </div>
      `;
    }

    // Audio context needs a user event to begin playing
    // https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide#Autoplay_using_the_Web_Audio_API
    document.querySelector('#app > button').addEventListener('click', () => {
      render(
        html`<${App}/>`,
        document.getElementById('root'),
        document.getElementById('app')
      );
    }, { once: true });
---
A modular synthesizer using Preact.

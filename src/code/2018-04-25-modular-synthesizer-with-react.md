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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/13.8.12/Tone.js"></script>
    <script src="https://unpkg.com/nexusui@2.0.10/dist/NexusUI.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.8.6/umd/react.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.8.6/umd/react-dom.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ramda/0.26.1/ramda.min.js"></script>

    <div class="section">
      <div class="container" id="root">
        <button class="button">Start</button>
      </div>
    </div>
css:
  lang: css
  code: |-
    @import url("https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css");
    @import url("https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css");

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
    /**
     * Utilities
     */

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
      const el = React.useRef(null);
      const nexus = React.useRef(null);

      const handleChange = React.useCallback(value => onChange !== undefined ? onChange(value) : undefined, [onChange]);
      const handleStep = React.useCallback(value => onStep !== undefined ? onStep(value) : undefined,[onStep]);

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

      React.useEffect(() => {
        const ui = getNexus();
        return () => ui.destroy();
      }, [el, nexus]);

      return <div ref={el}></div>;
    }

    const makeNexusComponent = type => props => (
      <NexusComponent {...props} type={type} />
    );

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

    const MidiContext = React.createContext(pubsub());
    const ToneBusContext = React.createContext(null);

    /**
     * Hooks
     */

    function useToneBus(node) {
      const { send, receive } = React.useContext(ToneBusContext);

      React.useEffect(() => {
        if (send !== undefined && node !== undefined) node.send(send, 1);
      }, [send, node]);

      React.useEffect(() => {
        if (receive !== undefined && node !== undefined) node.receive(receive);
      }, [receive, node]);
    }

    function useMidi(onMessage) {
      const { subscribe } = React.useContext(MidiContext);
      
      React.useEffect(() => {
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
      return (
        <div className="card">
          <div className="card-header">
            <h2 className="card-header-title">{title}</h2>
          </div>
          <div className="card-content">
            {children}
          </div>
        </div>
      );
    }

    function ToneWrapper({ node, onMessage, children }) {
      useToneBus(node);
      useMidi(onMessage);
      
      React.useEffect(() => {
        return () => {
          if (node !== undefined) node.dispose();
        };
      }, [node]);
        
      return (
        <React.Fragment>
          {children}
        </React.Fragment>
      );
    }

    function ToneAmplitudeEnvelope({ attack, decay, sustain, release, onChange }) {
      const [node] = React.useState(() => new Tone.AmplitudeEnvelope({ attack, decay, sustain, release }));
      const [envelope] = React.useState([attack, decay, sustain, release]);
      const [keys] = React.useState(() => ['attack', 'decay', 'sustain', 'release']);

      const handleChange = React.useCallback(({ index, value }) => {
        const key = keys[index];
        if (onChange !== undefined) onChange({ [key]: value });
      }, [onChange]);

      const handleMessage = React.useCallback(([status, data0, data1]) => {
        switch (status) {
          case 144:
            node.triggerAttack();
            break;
          case 128:
            node.triggerRelease();
            break;
        } 
      }, [node]);
      
      React.useEffect(() => {
        node.set('attack', attack);
      }, [attack, node]);
      
      React.useEffect(() => {
        node.set('decay', decay);
      }, [decay, node]);
      
      React.useEffect(() => {
        node.set('sustain', sustain);
      }, [sustain, node]);
      
      React.useEffect(() => {
        node.set('release', release);
      }, [release, node]);
        
      return (
        <ToneWrapper node={node} onMessage={handleMessage}>
          <NexusMultislider numberOfSliders={envelope.length} min={0} max={2} step={0.001} values={envelope} onChange={handleChange} />
        </ToneWrapper>
      );
    }

    function ToneFilter({ frequency, type, rolloff, onChange }) {
      const [node] = React.useState(() => new Tone.Filter({ frequency, type, rolloff }));
      const [types] = React.useState(() => ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'notch', 'allpass', 'peaking']);
      const [rolloffs] = React.useState(() => [-12, -24, -48, -96]);

      const setFrequency = React.useCallback(frequency => {
        if (onChange !== undefined) onChange({ frequency });
      }, [onChange]);
      
      const setType = React.useCallback(({ index, value }) => {
        if (onChange !== undefined) onChange({ type: value });
      }, [onChange]);
      
      const setRolloff = React.useCallback(({ index, value }) => {
        if (onChange !== undefined) onChange({ rolloff: value });
      }, [onChange]);
    
      React.useEffect(() => {    
        node.set('frequency', frequency);
      }, [frequency, node]);

      React.useEffect(() => {    
        node.set('type', type);
      }, [type, node]);

      React.useEffect(() => {    
        node.set('rolloff', rolloff);
      }, [rolloff, node]);

      return (
        <ToneWrapper node={node}>
          <h3 className="is-size-7">Frequency</h3>
          <NexusSlider min={20} max={20000} step={1} value={frequency} onChange={setFrequency}/>
          <h3 className="is-size-7">Type</h3>
          <NexusSelect value={type} options={types} onChange={setType}/>
          <h3 className="is-size-7">Rolloff</h3>
          <NexusSelect value={rolloff} options={rolloffs} onChange={setRolloff}/>
        </ToneWrapper>
      );
    }

    function ToneOscillator({ detune, type, onChange }) {
      const [node] = React.useState(() => new Tone.Oscillator({ detune, type }).start());
      const [mute, setMute] = React.useState(false);
      const [types] = React.useState(() => Object.values(Tone.Oscillator.Type).filter(type => type !== 'custom'));
      
      const setDetune = React.useCallback(detune => {
        if (onChange !== undefined) onChange({ detune });
      }, [onChange]);
      
      const setType = React.useCallback(({ index, value }) => {
        if (onChange !== undefined) onChange({ type: value }); 
      }, [onChange]);
      
      const handleMessage = ([status, data0, data1]) => {
        if (status === 144) {
          const freq = Nexus.mtof(data0);
          node.set('frequency', freq);
        }
      };
      
      /*React.useEffect(() => {
        node.mute = mute;
      }, [mute, node]);*/
      
      React.useEffect(() => {
        node.set('detune', detune);
      }, [detune]);
      
      React.useEffect(() => {
        node.set('type', type);
      }, [type]);
        
      return (
        <ToneWrapper node={node} onMessage={handleMessage}>
          <div className="columns">
            <div className="column">
              <h3 className="is-size-7">Type</h3>
              <NexusSelect value={type} options={types} onChange={setType} />
            </div>
            <div className="column">
              <h3 className="is-size-7">Detune</h3>
              <NexusDial value={detune} min={-100} max={100} step={1} size={[32, 32]} onChange={setDetune} />
            </div>
            <div className="column">
              <h3 className="is-size-7">Mute</h3>
              <NexusToggle state={mute} onChange={setMute}/>
            </div>
          </div>
        </ToneWrapper>
      );
    }

    function ToneMaster({ gain, onChange }) {
      const [node] = React.useState(() => new Tone.Gain({ gain }).toMaster());
    
      React.useEffect(() => {
        node.set('gain', gain);
      }, [gain, node]);

      return (
        <ToneWrapper node={node}>
          <h3 className="is-size-7">Gain</h3>
          <NexusSlider min={0} max={1} value={gain} onChange={onChange}/>
        </ToneWrapper>
      );
    }

    ToneMaster.defaultProps = {
      gain: 1
    };

    function OscillatorBank({ oscillators, onChange, ...props }) {
      // TODO use hooks?
      const handleChange = key => payload => onChange({ [key]: payload });
      
      return (
        <React.Fragment>
          {Object.keys(oscillators).map(key => {
            return <ToneOscillator {...props} {...oscillators[key]} key={key} onChange={handleChange(key)}/>
          })}
        </React.Fragment>
      );
    }

    function MidiPiano(props) {
      const { publish } = React.useContext(MidiContext);

      const handleChange = React.useCallback(({ note, state }) => {
        const status = state ? 144 : 128;
        publish([status, note, 127]);
      }, [publish]);

      return <NexusPiano {...props} onChange={handleChange} />;
    }

    /**
     * App
     */

    const initialState = {
      envelope: Tone.Envelope.defaults,
      filter: Tone.Filter.defaults,
      oscillator1: { ...Tone.Oscillator.defaults, type: 'sawtooth' },
      oscillator2: { ...Tone.Oscillator.defaults, type: 'sawtooth', detune: -5 },
      oscillator3: { ...Tone.Oscillator.defaults, type: 'sawtooth', detune: 5 }
    };

    const appReducer = (state, { type, ...payload }) => {
      switch (type) {
        case 'update': {
          return R.mergeDeepRight(state, payload);
        }
        default: {
          return state;
        }
      }
    };

    function App() {
      const [state, dispatch] = React.useReducer(appReducer, initialState);
      const { filter, envelope, ...oscillators } = state;
      
      return (
        <React.Fragment>
          <div className="columns">
            <div className="column">
              <BulmaCard title="Oscillators">
                <ToneBusContext.Provider value={{ send: 'filter' }}>
                  <OscillatorBank oscillators={oscillators} onChange={payload => dispatch({ type: 'update', ...payload })} />
                </ToneBusContext.Provider>
              </BulmaCard>
            </div>
            <div className="column">
              <BulmaCard title="Envelope">
                <ToneBusContext.Provider value={{ receive: 'envelope', send: 'master' }}>
                  <ToneAmplitudeEnvelope {...envelope} onChange={envelope => dispatch({ type: 'update', envelope })} />
                </ToneBusContext.Provider>
              </BulmaCard>
            </div>
            <div className="column">
              <BulmaCard title="Filter">
                <ToneBusContext.Provider value={{ receive: 'filter', send: 'envelope' }}>
                  <ToneFilter {...filter} onChange={filter => dispatch({ type: 'update', filter })} />
                </ToneBusContext.Provider>
              </BulmaCard>
            </div>
            <div className="column">
              <BulmaCard title="Master">
                <ToneBusContext.Provider value={{ receive: 'master' }}>
                  <ToneMaster />
                </ToneBusContext.Provider>
              </BulmaCard>
            </div>
          </div>
          <div className="is-nexus-centered">
            <MidiPiano lowNote={21} highNote={108} size={[1000,125]}/>
          </div>
        </React.Fragment>
      );
    }

    // Audio context needs a user event to begin playing
    // https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide#Autoplay_using_the_Web_Audio_API
    document.querySelector('#root > button').addEventListener('click', () => {
      ReactDOM.render(
        <App />,
        document.getElementById('root')
      );
    });
---

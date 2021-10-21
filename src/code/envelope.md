---
title: Envelope
date: 2020-05-19
published: false
html:
  lang: html
  code: |-
    <button>Gate</button>
css:
  lang: css
js:
  lang: javascript
  code: |-
    class Envelope {
      constructor(context, {
        attack = 0.01,
        decay = 0.1,
        sustain = 0.5,
        release = 1,
        mul = 1,
        add = 0,
      } = {}) {
        this.context = context;
        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;
        
        this.input = this.context.createGain();
        this.output = this.context.createGain();
        
        this.gain = this.context.createGain();
        this.gain.gain.value = 0;
        
        this.mul = this.context.createGain();
        this.mul.gain.value = mul;
        
        this.input.connect(this.gain);
        this.mul.connect(this.gain.gain);
        this.gain.connect(this.output);
        
        /*this.add = this.context.createConstantSource();
        this.add.offset.value = add;

        this.mul.connect(this.add.offset);
        this.add.start();*/
      }
      
      connect(...args) {
        this.output.connect(...args);
        //this.add.connect(...args);
      }
      
      disconnect(...args) {
        this.output.disconnect(...args);
        //this.add.disconnect(...args);
      }

      gate(val, startTime = this.context.currentTime) {
        // note on
        if (val) {
          // cancel scheduled values
          this.gain.gain.linearRampToValueAtTime(1, startTime + this.attack);
          this.gain.gain.setTargetAtTime(this.sustain, startTime + this.attack, this.decay);
        }
        // note off
        else {
          // cancel scheduled values
          this.gain.gain.setTargetAtTime(0, startTime, this.release);
        }
      }
    }

    const ctx = new AudioContext();

    const osc = ctx.createOscillator();
    osc.frequency.value = 220;
    osc.type = 'sawtooth';

    const gain = ctx.createGain();
    gain.gain.value = 0;

    const env = new Envelope(ctx, {
      attack: 0.005,
      decay: 0.1,
      release: 1,
      sustain: 0.9,
      mul: 0.1,
    });

    /*const filter = ctx.createBiquadFilter();

    const filterEnv = new Envelope(ctx, {
      attack: 1,
      decay: 1,
      sustain: 0.5,
      mul: 20000,
      add: 350,
    });*/

    osc.connect(env.input);
    env.connect(ctx.destination);
    //osc.connect(gain);
    //gain.connect(ctx.destination);
    //gain.connect(filter);
    //env.connect(gain.gain);
    //gain.connect(env.gain);
    //env.connect(filter);
    //filter.connect(ctx.destination);
    //filterEnv.connect(filter.frequency);

    osc.start();

    const gate = document.querySelector('button');

    gate.addEventListener('mousedown', async e => {
      if (e.repeat) return;
      
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      console.log('note on');
      env.gate(true);
      //filterEnv.gate(true);
    });

    gate.addEventListener('mouseup', async e => {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      console.log('note off');
      env.gate(false);
      //filterEnv.gate(false);
    });
---
Demo of an amplitude envelope using the Web Audio API.

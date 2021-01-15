---
layout: code.njk
title: Modular synthesizer (with Stimulus.js)
date: 2019-01-29
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <form data-controller="storage" data-action="change->storage#save" data-storage-name="synth">
      <button data-action="click->storage#clear">Clear</button>
      <div class="grid">
        <fieldset class="oscillator" data-controller="oscillator" id="oscillator-1" data-send="gain-1">
          <legend>Oscillator 1</legend>
          <div class="field field__number">
            <label for="oscillator-1-detune">Detune</label>
            <input type="number" name="oscillator-1-detune" id="oscillator-1-detune" min="-3600" max="3600" value="0" data-oscillator-target="detune" data-action="input->oscillator#setDetune"/>
          </div>
          <div class="field field__select">
            <label for="oscillator-1-type">Type</label>
            <select name="oscillator-1-type" id="oscillator-1-type" data-oscillator-target="type" data-action="change->oscillator#setType">
              <option value="sine" selected="selected">sine</option>
              <option value="square">square</option>
              <option value="sawtooth">sawtooth</option>
              <option value="triangle">triangle</option>
              <option value="custom">custom</option>
            </select>
          </div>
          <div class="field field__select">
            <label for="oscillator-1-wave">Periodic wave</label>
            <select name="oscillator-1-wave" id="oscillator-1-wave" data-oscillator-target="wave" data-action="change->oscillator#setPeriodicWave">
              <option value="Bass">Bass</option>
              <option value="BassAmp360">BassAmp360</option>
              <option value="BassFuzz">BassFuzz</option>
              <option value="BassFuzz2">BassFuzz2</option>
              <option value="BassSubDub">BassSubDub</option>
              <option value="BassSubDub2">BassSubDub2</option>
              <option value="Brass">Brass</option>
              <option value="BritBlues">BritBlues</option>
              <option value="BritBluesDriven">BritBluesDriven</option>
              <option value="Buzzy1">Buzzy1</option>
              <option value="Buzzy2">Buzzy2</option>
              <option value="Celeste">Celeste</option>
              <option value="ChorusStrings">ChorusStrings</option>
              <option value="Dissonant1">Dissonant1</option>
              <option value="Dissonant2">Dissonant2</option>
              <option value="DissonantPiano">DissonantPiano</option>
              <option value="DroppedSaw">DroppedSaw</option>
              <option value="DroppedSquare">DroppedSquare</option>
              <option value="DynaEPBright">DynaEPBright</option>
              <option value="DynaEPMed">DynaEPMed</option>
              <option value="Ethnic33">Ethnic33</option>
              <option value="Full1">Full1</option>
              <option value="Full2">Full2</option>
              <option value="GuitarFuzz">GuitarFuzz</option>
              <option value="Harsh">Harsh</option>
              <option value="MklHard">MklHard</option>
              <option value="Noise">Noise</option>
              <option value="Organ2">Organ2</option>
              <option value="Organ3">Organ3</option>
              <option value="PhonemeAh">PhonemeAh</option>
              <option value="PhonemeBah">PhonemeBah</option>
              <option value="PhonemeEe">PhonemeEe</option>
              <option value="PhonemeO">PhonemeO</option>
              <option value="PhonemeOoh">PhonemeOoh</option>
              <option value="PhonemePopAhhhs">PhonemePopAhhhs</option>
              <option value="Piano">Piano</option>
              <option value="Pulse">Pulse</option>
              <option value="PutneyWavering">PutneyWavering</option>
              <option value="Saw">Saw</option>
              <option value="Square">Square</option>
              <option value="TB303Square">TB303Square</option>
              <option value="Throaty">Throaty</option>
              <option value="Triangle">Triangle</option>
              <option value="Trombone">Trombone</option>
              <option value="TwelveOpTines">TwelveOpTines</option>
              <option value="TwelveStringGuitar1">TwelveStringGuitar1</option>
              <option value="WarmSaw">WarmSaw</option>
              <option value="WarmSquare">WarmSquare</option>
              <option value="WarmTriangle">WarmTriangle</option>
              <option value="Wurlitzer">Wurlitzer</option>
              <option value="Wurlitzer2">Wurlitzer2</option>
            </select>
          </div>
        </fieldset>
        <fieldset class="gain" data-controller="gain" id="gain-1" data-receive="gain-1" data-send="panner-1">
          <legend>Gain 1</legend>
          <div class="field field__range" data-controller="field">
            <label for="gain-1-gain">Gain</label>
            <input type="range" name="gain-1-gain" id="gain-1-gain" max="1" step="0.125" value="1" data-gain-target="gain" data-field-target="input" data-action="input->gain#setGain input->field#update"/>
            <output data-field-target="output"></output>
          </div>
          <div class="field field__checkbox">
            <label for="gain-1-mute">Mute</label>
            <input type="checkbox" name="gain-1-mute" id="gain-1-mute" data-gain-target="mute" data-action="change->gain#setGain"/>
          </div>
        </fieldset>
        <fieldset class="stereo-panner" data-controller="panner" id="panner-1" data-receive="panner-1" data-send="envelope">
          <legend>Panner 1</legend>
          <div class="field field__range" data-controller="field">
            <label for="panner-1-pan">Pan</label>
            <input type="range" name="panner-1-pan" id="panner-1-pan" min="-1" max="1" step="0.1" value="0" data-panner-target="pan" data-field-target="input" data-action="input->panner#setPan input->field#update"/>
            <output data-field-target="output"></output>
          </div>
        </fieldset>
        <fieldset class="oscillator" data-controller="oscillator" id="oscillator-2" data-send="gain-2">
          <legend>Oscillator 2</legend>
          <div class="field field__number">
            <label for="oscillator-2-detune">Detune</label>
            <input type="number" name="oscillator-2-detune" id="oscillator-2-detune" min="-3600" max="3600" value="0" data-oscillator-target="detune" data-action="input->oscillator#setDetune"/>
          </div>
          <div class="field field__select">
            <label for="oscillator-2-type">Type</label>
            <select name="oscillator-2-type" id="oscillator-2-type" data-oscillator-target="type" data-action="change->oscillator#setType">
              <option value="sine" selected="selected">sine</option>
              <option value="square">square</option>
              <option value="sawtooth">sawtooth</option>
              <option value="triangle">triangle</option>
              <option value="custom">custom</option>
            </select>
          </div>
          <div class="field field__select">
            <label for="oscillator-2-wave">Periodic wave</label>
            <select name="oscillator-2-wave" id="oscillator-2-wave" data-oscillator-target="wave" data-action="change->oscillator#setPeriodicWave">
              <option value="Bass">Bass</option>
              <option value="BassAmp360">BassAmp360</option>
              <option value="BassFuzz">BassFuzz</option>
              <option value="BassFuzz2">BassFuzz2</option>
              <option value="BassSubDub">BassSubDub</option>
              <option value="BassSubDub2">BassSubDub2</option>
              <option value="Brass">Brass</option>
              <option value="BritBlues">BritBlues</option>
              <option value="BritBluesDriven">BritBluesDriven</option>
              <option value="Buzzy1">Buzzy1</option>
              <option value="Buzzy2">Buzzy2</option>
              <option value="Celeste">Celeste</option>
              <option value="ChorusStrings">ChorusStrings</option>
              <option value="Dissonant1">Dissonant1</option>
              <option value="Dissonant2">Dissonant2</option>
              <option value="DissonantPiano">DissonantPiano</option>
              <option value="DroppedSaw">DroppedSaw</option>
              <option value="DroppedSquare">DroppedSquare</option>
              <option value="DynaEPBright">DynaEPBright</option>
              <option value="DynaEPMed">DynaEPMed</option>
              <option value="Ethnic33">Ethnic33</option>
              <option value="Full1">Full1</option>
              <option value="Full2">Full2</option>
              <option value="GuitarFuzz">GuitarFuzz</option>
              <option value="Harsh">Harsh</option>
              <option value="MklHard">MklHard</option>
              <option value="Noise">Noise</option>
              <option value="Organ2">Organ2</option>
              <option value="Organ3">Organ3</option>
              <option value="PhonemeAh">PhonemeAh</option>
              <option value="PhonemeBah">PhonemeBah</option>
              <option value="PhonemeEe">PhonemeEe</option>
              <option value="PhonemeO">PhonemeO</option>
              <option value="PhonemeOoh">PhonemeOoh</option>
              <option value="PhonemePopAhhhs">PhonemePopAhhhs</option>
              <option value="Piano">Piano</option>
              <option value="Pulse">Pulse</option>
              <option value="PutneyWavering">PutneyWavering</option>
              <option value="Saw">Saw</option>
              <option value="Square">Square</option>
              <option value="TB303Square">TB303Square</option>
              <option value="Throaty">Throaty</option>
              <option value="Triangle">Triangle</option>
              <option value="Trombone">Trombone</option>
              <option value="TwelveOpTines">TwelveOpTines</option>
              <option value="TwelveStringGuitar1">TwelveStringGuitar1</option>
              <option value="WarmSaw">WarmSaw</option>
              <option value="WarmSquare">WarmSquare</option>
              <option value="WarmTriangle">WarmTriangle</option>
              <option value="Wurlitzer">Wurlitzer</option>
              <option value="Wurlitzer2">Wurlitzer2</option>
            </select>
          </div>
        </fieldset>
        <fieldset class="gain" data-controller="gain" id="gain-1" data-receive="gain-2" data-send="panner-2">
          <legend>Gain 2</legend>
          <div class="field field__range" data-controller="field">
            <label for="gain-1-gain">Gain</label>
            <input type="range" name="gain-1-gain" id="gain-1-gain" max="1" step="0.125" value="1" data-gain-target="gain" data-field-target="input" data-action="input->gain#setGain input->field#update"/>
            <output data-field-target="output"></output>
          </div>
          <div class="field field__checkbox">
            <label for="gain-1-mute">Mute</label>
            <input type="checkbox" name="gain-1-mute" id="gain-1-mute" checked="checked" data-gain-target="mute" data-action="change->gain#setGain"/>
          </div>
        </fieldset>
        <fieldset class="stereo-panner" data-controller="panner" id="panner-2" data-receive="panner-2" data-send="envelope">
          <legend>Panner 2</legend>
          <div class="field field__range" data-controller="field">
            <label for="panner-2-pan">Pan</label>
            <input type="range" name="panner-2-pan" id="panner-2-pan" min="-1" max="1" step="0.1" value="0" data-panner-target="pan" data-field-target="input" data-action="input->panner#setPan input->field#update"/>
            <output data-field-target="output"></output>
          </div>
        </fieldset>
        <fieldset class="oscillator" data-controller="oscillator" id="oscillator-3" data-send="gain-3">
          <legend>Oscillator 3</legend>
          <div class="field field__number">
            <label for="oscillator-3-detune">Detune</label>
            <input type="number" name="oscillator-3-detune" id="oscillator-3-detune" min="-3600" max="3600" value="0" data-oscillator-target="detune" data-action="input->oscillator#setDetune"/>
          </div>
          <div class="field field__select">
            <label for="oscillator-3-type">Type</label>
            <select name="oscillator-3-type" id="oscillator-3-type" data-oscillator-target="type" data-action="change->oscillator#setType">
              <option value="sine" selected="selected">sine</option>
              <option value="square">square</option>
              <option value="sawtooth">sawtooth</option>
              <option value="triangle">triangle</option>
              <option value="custom">custom</option>
            </select>
          </div>
          <div class="field field__select">
            <label for="oscillator-3-wave">Periodic wave</label>
            <select name="oscillator-3-wave" id="oscillator-3-wave" data-oscillator-target="wave" data-action="change->oscillator#setPeriodicWave">
              <option value="Bass">Bass</option>
              <option value="BassAmp360">BassAmp360</option>
              <option value="BassFuzz">BassFuzz</option>
              <option value="BassFuzz2">BassFuzz2</option>
              <option value="BassSubDub">BassSubDub</option>
              <option value="BassSubDub2">BassSubDub2</option>
              <option value="Brass">Brass</option>
              <option value="BritBlues">BritBlues</option>
              <option value="BritBluesDriven">BritBluesDriven</option>
              <option value="Buzzy1">Buzzy1</option>
              <option value="Buzzy2">Buzzy2</option>
              <option value="Celeste">Celeste</option>
              <option value="ChorusStrings">ChorusStrings</option>
              <option value="Dissonant1">Dissonant1</option>
              <option value="Dissonant2">Dissonant2</option>
              <option value="DissonantPiano">DissonantPiano</option>
              <option value="DroppedSaw">DroppedSaw</option>
              <option value="DroppedSquare">DroppedSquare</option>
              <option value="DynaEPBright">DynaEPBright</option>
              <option value="DynaEPMed">DynaEPMed</option>
              <option value="Ethnic33">Ethnic33</option>
              <option value="Full1">Full1</option>
              <option value="Full2">Full2</option>
              <option value="GuitarFuzz">GuitarFuzz</option>
              <option value="Harsh">Harsh</option>
              <option value="MklHard">MklHard</option>
              <option value="Noise">Noise</option>
              <option value="Organ2">Organ2</option>
              <option value="Organ3">Organ3</option>
              <option value="PhonemeAh">PhonemeAh</option>
              <option value="PhonemeBah">PhonemeBah</option>
              <option value="PhonemeEe">PhonemeEe</option>
              <option value="PhonemeO">PhonemeO</option>
              <option value="PhonemeOoh">PhonemeOoh</option>
              <option value="PhonemePopAhhhs">PhonemePopAhhhs</option>
              <option value="Piano">Piano</option>
              <option value="Pulse">Pulse</option>
              <option value="PutneyWavering">PutneyWavering</option>
              <option value="Saw">Saw</option>
              <option value="Square">Square</option>
              <option value="TB303Square">TB303Square</option>
              <option value="Throaty">Throaty</option>
              <option value="Triangle">Triangle</option>
              <option value="Trombone">Trombone</option>
              <option value="TwelveOpTines">TwelveOpTines</option>
              <option value="TwelveStringGuitar1">TwelveStringGuitar1</option>
              <option value="WarmSaw">WarmSaw</option>
              <option value="WarmSquare">WarmSquare</option>
              <option value="WarmTriangle">WarmTriangle</option>
              <option value="Wurlitzer">Wurlitzer</option>
              <option value="Wurlitzer2">Wurlitzer2</option>
            </select>
          </div>
        </fieldset>
        <fieldset class="gain" data-controller="gain" id="gain-1" data-receive="gain-3" data-send="panner-3">
          <legend>Gain 3</legend>
          <div class="field field__range" data-controller="field">
            <label for="gain-1-gain">Gain</label>
            <input type="range" name="gain-1-gain" id="gain-1-gain" max="1" step="0.125" value="1" data-gain-target="gain" data-field-target="input" data-action="input->gain#setGain input->field#update"/>
            <output data-field-target="output"></output>
          </div>
          <div class="field field__checkbox">
            <label for="gain-1-mute">Mute</label>
            <input type="checkbox" name="gain-1-mute" id="gain-1-mute" checked="checked" data-gain-target="mute" data-action="change->gain#setGain"/>
          </div>
        </fieldset>
        <fieldset class="stereo-panner" data-controller="panner" id="panner-3" data-receive="panner-3" data-send="envelope">
          <legend>Panner 3</legend>
          <div class="field field__range" data-controller="field">
            <label for="panner-3-pan">Pan</label>
            <input type="range" name="panner-3-pan" id="panner-3-pan" min="-1" max="1" step="0.1" value="0" data-panner-target="pan" data-field-target="input" data-action="input->panner#setPan input->field#update"/>
            <output data-field-target="output"></output>
          </div>
        </fieldset>
        <fieldset class="envelope" data-controller="envelope" id="envelope" data-receive="envelope" data-send="filter">
          <legend>Envelope</legend>
          <div class="field field__range" data-controller="field">
            <label for="envelope-attack">Attack</label>
            <input type="range" name="envelope-attack" id="envelope-attack" max="1" step="0.1" value="0.01" data-envelope-target="attack" data-field-target="input" data-action="input->envelope#setAttack input->field#update"/>
            <output data-field-target="output"></output>
          </div>
          <div class="field field__range" data-controller="field">
            <label for="envelope-decay">Decay</label>
            <input type="range" name="envelope-decay" id="envelope-decay" max="1" step="0.1" value="0.1" data-envelope-target="decay" data-field-target="input" data-action="input->envelope#setDecay input->field#update"/>
            <output data-field-target="output"></output>
          </div>
          <div class="field field__range" data-controller="field">
            <label for="envelope-sustain">Sustain</label>
            <input type="range" name="envelope-sustain" id="envelope-sustain" max="1" step="0.1" value="0.5" data-envelope-target="sustain" data-field-target="input" data-action="input->envelope#setSustain input->field#update"/>
            <output data-field-target="output"></output>
          </div>
          <div class="field field__range" data-controller="field">
            <label for="envelope-release">Release</label>
            <input type="range" name="envelope-release" id="envelope-release" max="1" step="0.1" value="0.2" data-envelope-target="release" data-field-target="input" data-action="input->envelope#setRelease input->field#update"/>
            <output data-field-target="output"></output>
          </div>
        </fieldset>
        <fieldset class="biquad-filter" data-controller="filter" id="filter" data-receive="filter" data-send="delay master">
          <legend>Filter</legend>
          <div class="field field__number">
            <label for="filter-frequency">Frequency</label>
            <input type="number" name="filter-frequency" id="filter-frequency" min="10" max="24000" value="350" data-filter-target="frequency" data-action="input->filter#setFrequency"/>
          </div>
          <div class="field field__number">
            <label for="filter-detune">Detune</label>
            <input type="number" name="filter-detune" id="filter-detune" min="-3600" max="3600" value="0" data-filter-target="detune" data-action="input->filter#setDetune"/>
          </div>
          <div class="field field__number">
            <label for="filter-q">Q</label>
            <input type="number" name="filter-q" id="filter-q" min="0.0001" max="1000" step="0.0001" value="1" data-filter-target="Q" data-action="input->filter#setQ"/>
          </div>
          <div class="field field__range" data-controller="field">
            <label for="filter-gain">Gain</label>
            <input type="range" name="filter-gain" id="filter-gain" min="-40" max="40" value="0" data-filter-target="gain" data-field-target="input" data-action="input->filter#setGain input->field#update"/>
            <output data-field-target="output"></output>
          </div>
          <div class="field field__select">
            <label for="filter-type">Type</label>
            <select name="filter-type" id="filter-type" data-filter-target="type" data-action="change->filter#setType">
              <option value="lowpass" selected="selected">lowpass</option>
              <option value="highpass">highpass</option>
              <option value="bandpass">bandpass</option>
              <option value="lowshelf">lowshelf</option>
              <option value="highshelf">highshelf</option>
              <option value="peaking">peaking</option>
              <option value="notch">notch</option>
              <option value="allpass">allpass</option>
            </select>
          </div>
        </fieldset>
        <fieldset class="lfo" data-controller="lfo" id="lfo" data-send="filter.detune">
          <legend>LFO</legend>
          <div class="field field__range" data-controller="field">
            <label for="lfo-frequency">Frequency</label>
            <input type="range" name="lfo-frequency" id="lfo-frequency" max="20" step="0.5" value="0.5" data-lfo-target="frequency" data-field-target="input" data-action="input->lfo#setFrequency input->field#update"/>
            <output data-field-target="output"></output>
          </div>
          <div class="field field__select">
            <label for="lfo-type">Type</label>
            <select name="lfo-type" id="lfo-type" data-lfo-target="type" data-action="change->lfo#setType">
              <option value="sine" selected="selected">sine</option>
              <option value="square">square</option>
              <option value="sawtooth">sawtooth</option>
              <option value="triangle">triangle</option>
            </select>
          </div>
          <div class="field field__number">
            <label for="lfo-gain">Gain</label>
            <input type="number" name="lfo-gain" id="lfo-gain" max="3600" value="1" data-lfo-target="gain" data-action="input->lfo#setGain"/>
          </div>
          <div class="field field__checkbox">
            <label for="lfo-mute">Mute</label>
            <input type="checkbox" name="lfo-mute" id="lfo-mute" checked="checked" data-lfo-target="mute" data-action="change->lfo#setGain"/>
          </div>
        </fieldset>
        <fieldset class="delay" data-controller="delay" data-delay="1" id="delay" data-receive="delay" data-send="master delay-feedback">
          <legend>Delay</legend>
          <div class="field field__range" data-controller="field">
            <label for="delay-delay-time">Delay time</label>
            <input type="range" name="delay-delay-time" id="delay-delay-time" max="1" step="0.125" value="0" data-delay-target="delayTime" data-field-target="input" data-action="input->delay#setDelayTime input->field#update"/>
            <output data-field-target="output"></output>
          </div>
        </fieldset>
        <fieldset class="gain" data-controller="gain" id="delay-feedback" data-receive="delay-feedback" data-send="delay">
          <legend>Delay feedback</legend>
          <div class="field field__range" data-controller="field">
            <label for="delay-feedback-gain">Gain</label>
            <input type="range" name="delay-feedback-gain" id="delay-feedback-gain" max="1" step="0.125" value="1" data-gain-target="gain" data-field-target="input" data-action="input->gain#setGain input->field#update"/>
            <output data-field-target="output"></output>
          </div>
          <div class="field field__checkbox">
            <label for="delay-feedback-mute">Mute</label>
            <input type="checkbox" name="delay-feedback-mute" id="delay-feedback-mute" checked="checked" data-gain-target="mute" data-action="change->gain#setGain"/>
          </div>
        </fieldset>
        <fieldset class="gain" data-controller="gain" id="master" data-receive="master" data-send="destination">
          <legend>Master</legend>
          <div class="field field__range" data-controller="field">
            <label for="master-gain">Gain</label>
            <input type="range" name="master-gain" id="master-gain" max="1" step="0.125" value="0.5" data-gain-target="gain" data-field-target="input" data-action="input->gain#setGain input->field#update"/>
            <output data-field-target="output"></output>
          </div>
          <div class="field field__checkbox">
            <label for="master-mute">Mute</label>
            <input type="checkbox" name="master-mute" id="master-mute" data-gain-target="mute" data-action="change->gain#setGain"/>
          </div>
        </fieldset>
      </div>
    </form>
    <!-- Piano-->
    <fieldset data-controller="piano" data-action="keydown@window->piano#onKeypress keyup@window->piano#onKeypress" id="piano">
      <legend>Piano</legend>
      <div class="field field__range" data-controller="field">
        <label for="piano-octave">Octave</label>
        <input type="range" name="piano-octave" id="piano-octave" min="1" max="7" value="4" data-piano-target="octave" data-field-target="input" data-action="input->field#update"/>
        <output data-field-target="output"></output>
      </div>
      <svg class="piano" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 616 162" aria-labelledby="piano-title piano-desc">
        <title id="piano-title">Piano</title>
        <desc id="piano-desc">A two octave piano keyboard</desc>
        <defs>
          <polygon id="left" points="0,0 29,0 29,81 40,81 40,160 0,160"></polygon>
          <polygon id="middle" points="11,0 29,0 29,81 40,81 40,160 0,160 0,81 11,81"></polygon>
          <polygon id="right" points="11,0 40,0 40,160 0,160 0,81 11,81"></polygon>
          <rect id="full" width="40" height="160"></rect>
          <rect id="accidental" width="21" height="80"></rect>
        </defs>
        <use class="piano__key piano__key--natural" xlink:href="#left" x="1" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="0"></use>
        <use class="piano__key piano__key--accidental" xlink:href="#accidental" x="31" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="1"></use>
        <use class="piano__key piano__key--natural" xlink:href="#middle" x="42" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="2"></use>
        <use class="piano__key piano__key--accidental" xlink:href="#accidental" x="72" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="3"></use>
        <use class="piano__key piano__key--natural" xlink:href="#right" x="83" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="4"></use>
        <use class="piano__key piano__key--natural" xlink:href="#left" x="124" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="5"></use>
        <use class="piano__key piano__key--accidental" xlink:href="#accidental" x="154" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="6"></use>
        <use class="piano__key piano__key--natural" xlink:href="#middle" x="165" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="7"></use>
        <use class="piano__key piano__key--accidental" xlink:href="#accidental" x="195" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="8"></use>
        <use class="piano__key piano__key--natural" xlink:href="#middle" x="206" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="9"></use>
        <use class="piano__key piano__key--accidental" xlink:href="#accidental" x="236" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="10"></use>
        <use class="piano__key piano__key--natural" xlink:href="#right" x="247" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="11"></use>
        <use class="piano__key piano__key--natural" xlink:href="#left" x="288" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="12"></use>
        <use class="piano__key piano__key--accidental" xlink:href="#accidental" x="318" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="13"></use>
        <use class="piano__key piano__key--natural" xlink:href="#middle" x="329" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="14"></use>
        <use class="piano__key piano__key--accidental" xlink:href="#accidental" x="359" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="15"></use>
        <use class="piano__key piano__key--natural" xlink:href="#right" x="370" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="16"></use>
        <use class="piano__key piano__key--natural" xlink:href="#left" x="411" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="17"></use>
        <use class="piano__key piano__key--accidental" xlink:href="#accidental" x="441" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="18"></use>
        <use class="piano__key piano__key--natural" xlink:href="#middle" x="452" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="19"></use>
        <use class="piano__key piano__key--accidental" xlink:href="#accidental" x="482" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="20"></use>
        <use class="piano__key piano__key--natural" xlink:href="#middle" x="493" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="21"></use>
        <use class="piano__key piano__key--accidental" xlink:href="#accidental" x="523" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="22"></use>
        <use class="piano__key piano__key--natural" xlink:href="#right" x="534" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="23"></use>
        <use class="piano__key piano__key--natural" xlink:href="#full" x="575" y="1" tabindex="0" data-piano-target="key" data-action="keydown->piano#noteOn keyup->piano#noteOff mousedown->piano#noteOn mouseup->piano#noteOff touchstart->piano#noteOn touchend->piano#noteOff pointerdown->piano#noteOn pointerup->piano#noteOff" data-note="24"></use>
      </svg>
    </fieldset>
css:
  lang: css
  code: |-
    @import url("https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css");

    /**
     * Base
     */
     * {
      margin: 0;
    }

    body {
      font-size: 1rem;
      padding: 1rem;
    }
    body * + * {
      margin-top: 1rem;
    }

    [hidden] {
      display: none !important;
    }

    /**
     * Fields
     */
    .field {
      display: -webkit-box;
      display: flex;
      flex-wrap: wrap;
    }
    .field label {
      flex-basis: 100%;
    }
    .field label ~ * {
      margin-top: 0.25rem;
    }
    .field select,
    .field input {
      -webkit-box-flex: 1;
              flex: 1;
    }
    .field output {
      flex-basis: 3rem;
      text-align: right;
    }

    /**
     * Piano
     */
    .piano {
      background-color: black;
    }

    .piano__key.focus,
    .piano__key:focus {
      outline: none;
      fill: yellow;
    }

    .piano__key--natural {
      fill: white;
    }

    .piano_key--accidental {
      fill: black;
    }

    /**
     * Grid
     */
    .grid {
      display: -webkit-box;
      display: flex;
      display: grid;
      flex-wrap: wrap;
      grid-gap: 0.5rem;
      grid-template-columns: repeat(3, 1fr);
    }
    .grid > * {
      margin-top: 0;
      flex-basis: 33.3333333333%;
    }

js:
  lang: javascript
  code: |-
    import { Application, Controller } from 'https://cdn.skypack.dev/stimulus';

    /**
     * Utilities
     */

    const mtof = midi => Math.pow(2, (midi - 69) / 12) * 440;

    const audioBus = context => {
      const channels = new Map([['destination', context.destination]]);
      
      const getChannels = channelName => {
        const names = channelName.split(' ');
        
        names.forEach(name => {
          if (!channels.has(name)){
            channels.set(name, context.createGain());
          }
        });
        
        return names.map(name => channels.get(name));
      };

      return {
        receive(channelName, audioNode) {
          getChannels(channelName).forEach(channel => {
            channel.connect(audioNode);
          });
        },
        send(channelName, audioNode) {
          getChannels(channelName).forEach(channel => {
            audioNode.connect(channel);
          });
        }
      };
    };

    const midiBus = () => {
      const subscribers = new Set();
      
      return {
        publish(data) {
          subscribers.forEach(subscriber => subscriber(data));
        },
        subscribe(subscriber) {
          subscribers.add(subscriber);

          return {
            unpublish() {
              subscribers.delete(subscriber);
            }
          };
        }
      };
    };


    /**
     * Global variables
     */

    const AUDIO_CONTEXT = new AudioContext();
    const AUDIO$ = audioBus(AUDIO_CONTEXT);
    const MIDI$ = midiBus();


    /**
     * Audio
     */

    class Envelope {
      constructor(context, { attack, decay, sustain, release }) {
        this.context = context;
        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;
      }
      
      connect(to) {
        this.output = to;
      }
      
      disconnect() {
        this.output = undefined;
      }
      
      triggerAttack(velocity = 1, time = this.context.currentTime) {
        if (this.output) {
          this.output.cancelScheduledValues(time);
          //this.output.cancelAndHoldAtTime(time);
          this.output.setValueAtTime(0, time);
          this.output.linearRampToValueAtTime(velocity, time + this.attack);
          this.output.setTargetAtTime(velocity * this.sustain, time + this.attack, this.decay);
        }

        return this;
      }
      
      triggerRelease(time = this.context.currentTime) {
        if (this.output) {
          this.output.cancelScheduledValues(time);
          //this.output.cancelAndHoldAtTime(time);
          this.output.setTargetAtTime(0, time, this.release);
        }

        return this;
      }
      
      triggerAttackRelease(duration, time = this.context,currentTime, velocity = 1) {
        this.triggerAttack(time, velocity);
        this.triggerRelease(time + duration);
        
        return this;
      }
    }


    /**
     * Controllers
     */

    class FieldController extends Controller {
      static get targets() {
        return [
          'input',
          'output'
        ];
      }
      
      connect() {
        this.update();
      }
      
      update() {
        this.outputTarget.textContent = this.inputTarget.value;
      }
    }

    class MidiController extends Controller {
      static get targets() {
        return [
          'input'
        ];
      }
      
      initialize() {
        if (navigator.requestMIDIAccess) {
          navigator.requestMIDIAccess().then(access => {
            this.access = access;
            this.inputs = this.access.inputs;
            
            this.access.addEventListener('statechange', this.setInputs);
          })
        }
      }
      
      disconnect() {
        this.access.removeEventListener('statechange', this.setInputs);
      }
      
      get input() {
        return this.inputTarget.value;
      }
      
      get inputs() {
        return this._inputs;
      }
      
      set inputs(val) {
        this._inputs = val;
        this.createInputs(this._inputs);
      }
      
      createInputs() {
        const inputMap = new Map();
        const options = this.inputTarget.childNodes;

        // Add keys to inputMap
        this.inputs.forEach((port, key) => {
          inputMap.add(key, port.name);
        });
        
        // Diff current and previous inputs
        options.forEach(option => {
          if (inputMap.has(option.value)) {
            inputMap.delete(option.value);
          } else {
            this.inputTarget.removeChild(option);
          }
        });
        
        // Add new inputs
        inputMap.forEach((value, key) => {
          const option = document.createElement('option');
          option.text = value;
          option.value = leu
          this.inputTarget.add(option);
        });
      }
      
      setInput() {
        this.inputs.forEach((port, key) => {
          if (key === this.input) {
            port.addEventListener('midimessage', this.onMidi)
          } else {
            port.removeEventListener('midimessage', this.onMidi);
          }
        });
      }
      
      setInputs(e) {
        if (e.port.connection !== 'open') {
          this.inputs = e.target.inputs;
        }
      }
      
      onMidi(e) {
        MIDI$.publish(e.data);
      }
    }

    class PianoController extends Controller {
      static get targets() {
        return [
          'octave',
          'key'
        ];
      }
      
      connect() {
        this.gate = MIDI$.subscribe(([status, data0, data1]) => {
          const index = data0 - (12 * this.octave);
          const key = this.keyTargets.find(target => {
            return target.dataset.note == index;
          });

          switch (status) {
            case 144: {
              key.classList.add('focus');
              break;
            }
            case 128: {
              key.classList.remove('focus');
              break;
            }
          }
        });
      }
      
      disconnect() {
        this.gate.unsubscribe();
      }
      
      get octave() {
        return +this.octaveTarget.value;
      }
      
      set octave(val) {
        this.octaveTarget.value = +val;
        this.octaveTarget.dispatchEvent(new Event('input'));
      }
      
      noteOn(e) {
        if (e.repeat || (e.type === 'keydown' && !(e.keyCode === 32 || e.keyCode === 13))) {
        } else {
          const note = 12 * this.octave + +e.target.dataset.note;
          const message = Uint8Array.of(144, note, 127);
          MIDI$.publish(message);
        }
      }
      
      noteOff(e) {
        if (e.type === 'keyup' && !(e.keyCode === 32 || e.keyCode === 13)) {
        } else {
          if (e.type !== 'keyup') {
            e.target.blur();
          }
          
          const message = Uint8Array.of(128, 12 * this.octave + +e.target.dataset.note, 127);
          MIDI$.publish(message);
        }
      }
      
      onKeypress(e) {
        const { key, type, shiftKey } = e;
        const baseKey = key.toLowerCase();
        const keys = 'awsedftgyhujk';
        const octaveKeys = 'zx';
        
        if (e.repeat) return;
        
        if (keys.includes(baseKey)) {
          const note = 12 * (this.octave + (shiftKey ? 1 : 0)) + keys.indexOf(baseKey);

          switch (type) {
            case 'keydown': {
              const message = Uint8Array.of(144, note, 127);
              MIDI$.publish(message);
              break;
            }
            case 'keyup': {
              const message = Uint8Array.of(128, note, 127);
              MIDI$.publish(message);
              break;
            }
          }
        } else if (octaveKeys.includes(baseKey)) {
          if (type === 'keydown') {
            const direction = baseKey === 'z' ? -1 : 1;
            
            this.octave += direction;
          }
        }
      }
    }

    class BiquadFilterController extends Controller {
      static get targets() {
        return [
          'frequency',
          'detune',
          'Q',
          'gain',
          'type',
        ];
      }
      
      initialize() {
        this.node = AUDIO_CONTEXT.createBiquadFilter();
        
        this.setFrequency();
        this.setDetune();
        this.setQ();
        this.setGain();
        this.setType();
      }
      
      connect() {
        if (this.element.dataset.send) {
          AUDIO$.send(this.element.dataset.send, this.node);
        }
        
        if (this.element.dataset.receive) {
          AUDIO$.receive(this.element.dataset.receive, this.node);

          Reflect.ownKeys(Reflect.getPrototypeOf(this.node)).filter(key => {
            return this.node[key] instanceof AudioParam;
          }).forEach(key => {
            AUDIO$.receive(`${this.element.dataset.receive}.${key}`, this.node[key]);
          });
        }
      }
    
      disconnect() {
        this.node.disconnect();
      }

      setDetune() {
        this.node.detune.setValueAtTime(+this.detuneTarget.value, AUDIO_CONTEXT.currentTime);
      }
      
      setFrequency() {
        this.node.frequency.setValueAtTime(+this.frequencyTarget.value, AUDIO_CONTEXT.currentTime);
      }
      
      setGain() {
        this.node.gain.setValueAtTime(+this.gainTarget.value, AUDIO_CONTEXT.currentTime);
      }
      
      setQ() {
        this.node.Q.setValueAtTime(+this.QTarget.value, AUDIO_CONTEXT.currentTime);
      }
      
      setType() {
        this.node.type = this.typeTarget.value;
      }
    }

    class DelayController extends Controller {
      static get targets() {
        return [
          'delayTime'
        ];
      }

      initialize() {
        this.node = AUDIO_CONTEXT.createDelay(this.maxDelay);

        this.setDelayTime();
      }
      
      connect() {
        if (this.element.dataset.send) {
          AUDIO$.send(this.element.dataset.send, this.node);
        }
        
        if (this.element.dataset.receive) {
          AUDIO$.receive(this.element.dataset.receive, this.node);

          Reflect.ownKeys(Reflect.getPrototypeOf(this.node)).filter(key => {
            return this.node[key] instanceof AudioParam;
          }).forEach(key => {
            AUDIO$.receive(`${this.element.dataset.receive}.${key}`, this.node[key]);
          });
        }
      }
    
      disconnect() {
        this.node.disconnect();
      }
      
      get maxDelay() {
        return +this.data.get('maxDelay') || 1;
      }
      
      setDelayTime() {
        this.node.delayTime.setValueAtTime(+this.delayTimeTarget.value, AUDIO_CONTEXT.currentTime);
      }
    }

    class GainController extends Controller {
      static get targets() {
        return [
          'gain',
          'mute'
        ];
      }

      initialize() {
        this.node = AUDIO_CONTEXT.createGain();

        this.setGain();
      }
      
      connect() {
        if (this.element.dataset.send) {
          AUDIO$.send(this.element.dataset.send, this.node);
        }
        
        if (this.element.dataset.receive) {
          AUDIO$.receive(this.element.dataset.receive, this.node);

          Reflect.ownKeys(Reflect.getPrototypeOf(this.node)).filter(key => {
            return this.node[key] instanceof AudioParam;
          }).forEach(key => {
            AUDIO$.receive(`${this.element.dataset.receive}.${key}`, this.node[key]);
          });
        }
      }
    
      disconnect() {
        this.node.disconnect();
      }
      
      setGain() {
        const value = this.muteTarget.checked ? 0 : +this.gainTarget.value;
        this.node.gain.setValueAtTime(value, AUDIO_CONTEXT.currentTime);
      }
    }

    class OscillatorController extends Controller {
      static get targets() {
        return [
          'detune',
          'type',
          'wave'
        ];
      }

      initialize() {
        this.node = AUDIO_CONTEXT.createOscillator();
        
        this.setDetune();
        this.setType();
        
        this.node.start();
      }
      
      connect() {
        if (this.element.dataset.send) {
          AUDIO$.send(this.element.dataset.send, this.node);
        }
        
        if (this.element.dataset.receive) {
          AUDIO$.receive(this.element.dataset.receive, this.node);

          Reflect.ownKeys(Reflect.getPrototypeOf(this.node)).filter(key => {
            return this.node[key] instanceof AudioParam;
          }).forEach(key => {
            AUDIO$.receive(`${this.element.dataset.receive}.${key}`, this.node[key]);
          })
        }
    
        this.gate = MIDI$.subscribe(([status, data0, data1]) => {
          switch (status) {
            case 144: {
              this.node.frequency.setValueAtTime(mtof(data0), AUDIO_CONTEXT.currentTime);
              break;
            }
          }
        });
      }
    
      disconnect() {
        this.gate.unsubscribe();
        this.node.stop();
        this.node.disconnect();
      }
      
      setDetune() {
        this.node.detune.setValueAtTime(+this.detuneTarget.value, AUDIO_CONTEXT.currentTime);
      }
      
      setPeriodicWave() {
        if (this.typeTarget.value !== 'custom') {
          this.typeTarget.value = 'custom';
        }
        
        const baseUrl = 'https://unpkg.com/@mohayonao/wave-tables@0.2.0';

        fetch(`${baseUrl}/${this.waveTarget.value}.json`)
          .then(res => res.json())
          .then(({ real, imag }) => {
            const wave = AUDIO_CONTEXT.createPeriodicWave(Float32Array.from(real), Float32Array.from(imag), { disableNormalization: true });

            this.node.setPeriodicWave(wave); 
          });
      }

      setType() {
        if (this.typeTarget.value === 'custom') {
          this.waveTarget.parentElement.removeAttribute('hidden');
          this.setPeriodicWave();
        } else {
          this.waveTarget.parentElement.setAttribute('hidden', '');
          this.node.type = this.typeTarget.value;
        }
      }
    }

    class StereoPannerController extends Controller {
      static get targets() {
        return [
          'pan'
        ];
      }
      
      initialize() {
        this.node = new StereoPannerNode(AUDIO_CONTEXT, { 
          pan: +this.panTarget.value 
        });
      }
      
      connect() {
        if (this.element.dataset.send) {
          AUDIO$.send(this.element.dataset.send, this.node);
        }
        
        if (this.element.dataset.receive) {
          AUDIO$.receive(this.element.dataset.receive, this.node);

          Reflect.ownKeys(Reflect.getPrototypeOf(this.node)).filter(key => {
            return this.node[key] instanceof AudioParam;
          }).forEach(key => {
            AUDIO$.receive(`${this.element.dataset.receive}.${key}`, this.node[key]);
          });
        }
      }
    
      disconnect() {
        this.node.disconnect();
      }
      
      setPan() {
        this.node.pan.setValueAtTime(+this.panTarget.value, AUDIO_CONTEXT.currentTime);
      }
    }

    class EnvelopeController extends Controller {
      static get targets() {
        return [
          'attack',
          'decay',
          'sustain',
          'release'
        ];
      }
      
      initialize() {
        this.node = AUDIO_CONTEXT.createGain();
        this.node.gain.setValueAtTime(0, AUDIO_CONTEXT.currentTime);

        this.envelope = new Envelope(AUDIO_CONTEXT, {
          attack: +this.attackTarget.value,
          decay: +this.decayTarget.value,
          sustain: +this.sustainTarget.value,
          release: +this.releaseTarget.value
        });
        
        this.envelope.connect(this.node.gain);
      }
      
      connect() {
        if (this.element.dataset.send) {
          AUDIO$.send(this.element.dataset.send, this.node);
        }
        
        if (this.element.dataset.receive) {
          AUDIO$.receive(this.element.dataset.receive, this.node);
        }
        
        this.gate = MIDI$.subscribe(([status, data0, data1]) => {
          switch (status) {
            case 144: {
              this.envelope.triggerAttack(this.amount);
              break;
            }
            case 128: {
              this.envelope.triggerRelease();
              break;
            }
          }
        });
      }
      
      disconnect() {
        this.gate.unsubscribe();
        this.envelope.disconnect();
      }
      
      get amount() {
        return +this.data.get('gain') || 1;
      }

      setAttack() {
        this.envelope.attack = +this.attackTarget.value;
      }
      
      setDecay() {
        this.envelope.decay = +this.decayTarget.value;
      }

      setSustain() {
        this.envelope.sustain = +this.sustainTarget.value;
      }

      setRelease() {
        this.envelope.release = +this.releaseTarget.value;
      }
    }

    class LFOController extends Controller {
      static get targets() {
        return [
          'frequency',
          'type',
          'gain',
          'mute'
        ];
      }
      
      initialize() {
        this.oscillator = AUDIO_CONTEXT.createOscillator();
        this.gain = AUDIO_CONTEXT.createGain();
        this.oscillator.connect(this.gain);
        
        this.setFrequency();
        this.setGain();
        this.setType();
        
        this.oscillator.start();
      }
      
      connect() {
        if (this.element.dataset.send) {
          AUDIO$.send(this.element.dataset.send, this.gain);
        }
        
        if (this.element.dataset.receive) {
          AUDIO$.receive(this.element.dataset.receive, this.oscillator);
          
          Reflect.ownKeys(Reflect.getPrototypeOf(this.oscillator)).filter(key => {
            return this.node[key] instanceof AudioParam;
          }).forEach(key => {
            AUDIO$.receive(`${this.element.dataset.receive}.${key}`, this.oscillator[key]);
          });
          
          Reflect.ownKeys(Reflect.getPrototypeOf(this.gain)).filter(key => {
            return this.node[key] instanceof AudioParam;
          }).forEach(key => {
            AUDIO$.receive(`${this.element.dataset.receive}.${key}`, this.gain[key]);
          });
        }
      }
    
      disconnect() {
        this.oscillator.stop();
        this.gain.disconnect();
        this.oscillator.disconnect();
      }
      
      setFrequency() {
        this.oscillator.frequency.setValueAtTime(+this.frequencyTarget.value, AUDIO_CONTEXT.currentTime);
      }
      
      setGain() {
        const value = this.muteTarget.checked ? 0 : +this.gainTarget.value;
        this.gain.gain.setValueAtTime(value, AUDIO_CONTEXT.currentTime);
      }
      
      setType() {
        this.oscillator.type = this.typeTarget.value;
      }
    }

    class StorageController extends Controller {
      initialize() {
        this.load();
      }
      
      get name() {
        return this.data.get('name');
      }
      
      load() {
        if (localStorage.getItem(this.name) === null) {
          this.save();
        }

        //const data = new FormData(this.element);
        const state = JSON.parse(localStorage.getItem(this.name));
        
        const els = this.element.elements;
        
        Object.keys(state).forEach(key => {
          //data.set(key, state[key]);
          const el = els.namedItem(key);
          
          if (el.type === 'checkbox') {
            const checked = state[key] === 'on';
            el.checked = checked;
          } else {
            el.value = state[key];
          }
        });
      }
      
      clear() {
        localStorage.removeItem(this.name);
      }
      
      save() {
        const data = new FormData(this.element);
        const state = {};
        
        for (let [key, value] of data.entries()) {
          state[key] = value;
        }
        
        localStorage.setItem(this.name, JSON.stringify(state));
      }
    }


    /**
     * App
     */

    const application = Application.start();

    application.register('delay', DelayController);
    application.register('envelope', EnvelopeController);
    application.register('field', FieldController);
    application.register('filter', BiquadFilterController);
    application.register('gain', GainController);
    application.register('lfo', LFOController);
    application.register('midi', MidiController);
    application.register('oscillator', OscillatorController);
    application.register('panner', StereoPannerController);
    application.register('piano', PianoController);
    application.register('storage', StorageController);
---

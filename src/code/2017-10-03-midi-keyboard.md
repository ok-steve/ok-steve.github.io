---
layout: code.njk
title: MIDI Keyboard (with Rxjs and Ramda)
date: 2017-10-03
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.5.2/rxjs.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ramda/0.26.1/ramda.min.js"></script>
css:
  lang: css
js:
  lang: javascript
  code: |-
    const NOTE_KEYS = 'awsedftgyhujk';
    const VELOCITY_KEYS = '1234567890';
    const OCTAVE = 5;
    const PITCH_BEND = 64;
    const MOD_WHEEL = 64;
    const VELOCITY = 5;

    const keydown = rxjs.fromEvent(document, 'keydown').pipe(
      rxjs.operators.filter(R.compose(R.not, R.prop('repeat')))
    );

    const keyup = rxjs.fromEvent(document, 'keyup');

    const octavechange = keydown.pipe(
      rxjs.operators.map(R.prop('keyCode')),
      rxjs.operators.filter(R.either(R.equals(88), R.equals(90))),
      rxjs.operators.map(R.ifElse(R.equals(88), R.always(1), R.always(-1))),
      rxjs.operators.startWith(OCTAVE),
      rxjs.operators.scan(R.add),
      rxjs.operators.map(R.clamp(0, 8)),
      rxjs.operators.distinctUntilChanged()
    );

    const velocitychange = keydown.pipe(
      rxjs.operators.map(R.prop('key')),
      rxjs.operators.filter(R.flip(R.contains)(VELOCITY_KEYS)),
      rxjs.operators.startWith(VELOCITY),
      rxjs.operators.map(R.compose(R.flip(R.divide)(R.prop('length', VELOCITY_KEYS)), R.add(1), R.flip(R.indexOf)(VELOCITY_KEYS))),
      rxjs.operators.map(R.compose(Math.floor, R.multiply(127))),
      rxjs.operators.distinctUntilChanged()
    );

    const notemessage = rxjs.merge(keydown, keyup).pipe(
      rxjs.operators.filter(R.compose(R.flip(R.contains)(NOTE_KEYS), R.toLower, R.prop('key'))),
      rxjs.operators.withLatestFrom(octavechange, velocitychange),
      rxjs.operators.map(([e, octave, velocity]) => {
        // TODO use Ramda
        const message = e.type === 'keydown' ? 144 : 128;
        const note = NOTE_KEYS.indexOf(e.key.toLowerCase()) + 12 * (octave + +e.shiftKey);
        return Uint8Array.of(message, note, velocity);
      })
    );

    const pitchbendmessage = rxjs.merge(keydown, keyup).pipe(
      rxjs.operators.filter(R.compose(R.either(R.equals(38), R.equals(40)), R.prop('keyCode'))),
      rxjs.operators.map(e => {
        // TODO use Ramda
        const [coarse, fine] = e.type === 'keyup' ? [PITCH_BEND, 0] : (e.keyCode === 40 ? [0, 0] : [127, 127]);
        return Uint8Array.of(224, coarse, fine);
      })
    );

    const modwheelmessage = keydown.pipe(
      rxjs.operators.map(R.prop('keyCode')),
      rxjs.operators.filter(R.either(R.equals(37), R.equals(39))),
      rxjs.operators.map(R.ifElse(R.equals(39), R.always(1), R.always(-1))),
      rxjs.operators.map(R.multiply(5)),
      rxjs.operators.scan(R.compose(R.clamp(0, 127), R.add), MOD_WHEEL),
      rxjs.operators.distinctUntilChanged(),
      rxjs.operators.map(value => Uint8Array.of(176, 1, value))
    );

    // TODO add Web MIDI API
    const midimessage = rxjs.merge(notemessage, pitchbendmessage, modwheelmessage);
---

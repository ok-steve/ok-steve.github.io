---
title: MIDI Keyboard (with Rxjs and Ramda)
date: 2017-10-03
published: false
html:
  lang: html
css:
  lang: css
js:
  lang: javascript
  code: |-
    import { add, always, clamp, compose, contains, divide, either, equals, flip, ifElse, indexOf, multiply, not, prop, toLower } from 'https://cdn.skypack.dev/ramda@^0.27.0';
    import { fromEvent, merge } from 'https://cdn.skypack.dev/rxjs@^6.5.5';
    import { distinctUntilChanged, filter, map, scan, startWith, withLatestFrom } from 'https://cdn.skypack.dev/rxjs@^6.5.5/operators';

    const CHANNEL = 0;
    const NOTE_KEYS = 'awsedftgyhujk';
    const VELOCITY_KEYS = '1234567890';
    const OCTAVE = 5;
    const PITCH_BEND = 64;
    const MOD_WHEEL = 64;
    const VELOCITY = 5;

    const keydown = fromEvent(document, 'keydown').pipe(
      filter(compose(not, prop('repeat')))
    );

    const keyup = fromEvent(document, 'keyup');

    const octavechange = keydown.pipe(
      map(prop('keyCode')),
      filter(either(equals(88), equals(90))),
      map(ifElse(equals(88), always(1), always(-1))),
      startWith(OCTAVE),
      scan(add),
      map(clamp(0, 8)),
      distinctUntilChanged()
    );

    const velocitychange = keydown.pipe(
      map(prop('key')),
      filter(flip(contains)(VELOCITY_KEYS)),
      startWith(VELOCITY),
      map(compose(flip(divide)(prop('length', VELOCITY_KEYS)), add(1), flip(indexOf)(VELOCITY_KEYS))),
      map(compose(Math.floor, multiply(127))),
      distinctUntilChanged()
    );

    const notemessage = merge(keydown, keyup).pipe(
      filter(compose(flip(contains)(NOTE_KEYS), toLower, prop('key'))),
      withLatestFrom(octavechange, velocitychange),
      map(([e, octave, velocity]) => {
        // TODO use Ramda
        const message = (e.type === 'keydown' ? 9 : 8) * 16 + CHANNEL;
        const note = NOTE_KEYS.indexOf(e.key.toLowerCase()) + 12 * (octave + +e.shiftKey);
        return Uint8Array.of(message, note, velocity);
      })
    );

    const pitchbendmessage = merge(keydown, keyup).pipe(
      filter(compose(either(equals(38), equals(40)), prop('keyCode'))),
      map(e => {
        // TODO use Ramda
        const [coarse, fine] = e.type === 'keyup' ? [PITCH_BEND, 0] : (e.keyCode === 40 ? [0, 0] : [127, 127]);
        return Uint8Array.of(224, coarse, fine);
      })
    );

    const modwheelmessage = keydown.pipe(
      map(prop('keyCode')),
      filter(either(equals(37), equals(39))),
      map(ifElse(equals(39), always(1), always(-1))),
      map(multiply(5)),
      scan(compose(clamp(0, 127), add), MOD_WHEEL),
      distinctUntilChanged(),
      map(value => Uint8Array.of(176, 1, value))
    );

    // TODO add Web MIDI API
    export default merge(notemessage, pitchbendmessage, modwheelmessage);
---
Trigger MIDI messages with a computer keyboard. Uses Rxjs and Ramda. Imitates the Web MIDI API.

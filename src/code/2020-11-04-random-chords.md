---
layout: code.njk
title: Random Chords
date: 2020-11-04
name: true
tags:
  - code
html:
  lang: html
css:
  lang: css
js:
  lang: javascript
  code: >-
    // import htm from 'https://cdn.skypack.dev/htm/preact';

    import { h, Component, render } from 'https://cdn.skypack.dev/preact';

    import htm from 'https://cdn.skypack.dev/htm';

    import { useReducer } from 'https://cdn.skypack.dev/preact/hooks';

    import { ChordType } from 'https://cdn.skypack.dev/@tonaljs/tonal';


    const html = htm.bind(h);


    const rand = (n = 1) => Math.floor(Math.random() * n);

    const chordNames = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

    const chordTypes = ChordType.symbols();


    function getRandomChord() {
      const note = chordNames[rand(chordNames.length)];
      const type = chordTypes[rand(chordTypes.length)];

      return {
        note,
        type,
      };
    }


    function getRandomChords(n = 1) {
      const list = [];

      for (let i = 0; i < n; i += 1) {
        list.push(getRandomChord());
      }

      return list;
    }


    const initialState = {
      num: 4,
      chords: getRandomChords(4),
    };


    const Actions = {
      SET_NUM: 'SET_NUM',
      SET_CHORDS: 'SET_CHORDS'
    };


    function reducer(state, action) {
      switch (action.type) {
        case Actions.SET_NUM: {
          return {
            num: action.num,
            chords: getRandomChords(action.num),
          };
        }
        case Actions.SET_CHORDS: {
          return {
            ...state,
            chords: getRandomChords(state.num),
          };
        }
      }
    }


    const Chord = ({ note, type }) =>
      html`
        ${note}<sup>${type}</sup>
      `;


    const App = () => {
      const [{ num, chords }, dispatch] = useReducer(reducer, initialState);

      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: Actions.SET_CHORDS });
      };

      return html`
        <form onSubmit=${handleSubmit}>
          <label for="n">Number</label>
          <input
            id="n"
            name="n"
            type="number"
            min="1"
            value=${num}
            onInput=${(e) => dispatch({ type: Actions.SET_NUM, num: parseInt(e.target.value, 10) })}
          />
          <button type="submit">Change</button>
          <output>${chords}</output>
        </form>
        <ul>
          ${chords.map(
            (chord) => html`
              <li><${Chord} ...${chord} /></li>
            `
          )}
        </ul>
      `;
    };


    render(
      html`
        <${App} />
      `,
      document.body
    );
---
Generate random chord progressions.
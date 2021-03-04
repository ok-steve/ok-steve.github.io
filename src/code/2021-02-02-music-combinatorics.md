---
layout: code.njk
title: Music Combinatorics
date: 2021-02-02
published: true
tags:
  - code
html:
  lang: html
  code: <div id="root"><div id="app"></div></div>
css:
  lang: css
js:
  lang: javascript
  code: >
    import { h, render } from 'https://cdn.skypack.dev/preact';

    import htm from 'https://cdn.skypack.dev/htm';

    import { useEffect, useMemo, useState, useRef } from 'https://cdn.skypack.dev/preact/hooks';

    import { Xiterable } from 'https://cdn.jsdelivr.net/npm/js-xiterable@0.1.7/xiterable.min.js';

    import { Combination, Permutation } from 'https://cdn.jsdelivr.net/npm/js-combinatorics@1.4.5/combinatorics.js';

    import { AbcNotation, Note, PcSet } from 'https://cdn.skypack.dev/@tonaljs/tonal';

    import abcjs from 'https://cdn.skypack.dev/abcjs';


    const html = htm.bind(h);


    const notes = ['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];


    function calculateCombinationPermutation({ seed = [], size = 2 }) {
      const sets = new Set();
      const it = new Combination(seed, size);
      const xit = new Xiterable(it).filter(s => {
        const { normalized } = PcSet.get(s);
        if (sets.has(normalized)) return false;
        sets.add(normalized);
        return true;
      }).flatMap(s => {
        return new Permutation(s);
      });
     
      return xit.toArray();
    }


    function createNotation(seed) {
      return seed.map(n => AbcNotation.scientificToAbcNotation(`${n}4`));
    }


    function Notation({ notation }) {
      const ref = useRef();
      //const data = seed.map(n => AbcNotation.scientificToAbcNotation(`${n}4`));
     
      useEffect(() => {
        abcjs.renderAbc(ref.current, `X:1\n${notation}|]`);
      }, [notation]);

      return html`<div ref=${ref}></div>`;
    }


    function App() {
      const [seed, setSeed] = useState(['C', 'Eb', 'F', 'G', 'Bb']);
      const [size, setSize] = useState(4);
      const data = useMemo(() => calculateCombinationPermutation({ seed, size }), [seed, size]);
      
      const handleChange = ({ target }) => {
        const { value, checked } = target;
        const n = checked ? [...seed, value] : seed.filter(s => s !== value);
        setSeed(PcSet.intervals(n).map(Note.transposeFrom('C')));
      };
        
      return html`
        <div id="app">
          ${notes.map(note => {
            return html`
              <label>
                <input type="checkbox" value=${note} checked=${seed.includes(note)} onChange=${handleChange}/>
                ${note}
              </label>
            `;
          })}
          
          <h2>Scale</h2>
          <p>${seed.join(' ')}</p>
          <${Notation} notation=${createNotation(seed)} />
        
          <h2>Permutations</h2>
        </div>
      `;
    };


    render(html`<${App}/>`, document.querySelector('#root'), document.querySelector('#app'));
---
Exploring combinatorics with relation to music.
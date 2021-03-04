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

    import { useMemo, useState, useRef } from 'https://cdn.skypack.dev/preact/hooks';

    //import { xiterable as $X } from 'https://cdn.jsdelivr.net/npm/js-xiterable@0.0.3/xiterable.min.js';

    import * as $C from 'https://cdn.jsdelivr.net/npm/js-combinatorics@1.4.5/combinatorics.js';

    import * as Tonal from 'https://cdn.skypack.dev/@tonaljs/tonal';

    import abcjs from 'https://cdn.skypack.dev/abcjs';


    const html = htm.bind(h);


    const notes = ['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];


    function calculateCombination ({ seed = [], size = 2 }) {
      const it = new $C.Combination(seed, size);
      const arr = it.toArray();
      const sets = new Set();
      return arr.filter(s => {
        const { normalized } = Tonal.PcSet.get(s);
        if (sets.has(normalized)) return false;
        sets.add(normalized);
        return true;
      });
    }


    function calculatePermutation({ seed }) {
      const it = new $C.Permutation(seed);
      return it.toArray();
    }


    function Notes({ seed }) {
      const ref = useRef();
      const data = seed.map(n => Tonal.AbcNotation.scientificToAbcNotation(`${n}4`));
      abcjs.renderAbc(ref.current, `X:1\n${data.join(' ')}`);

      return html`<div ref=${ref}></div>`;
    }


    function Permutation({ seed }) {
      const data = useMemo(() => calculatePermutation({ seed }), [seed]); 
     
      return html`
        <ol>
          ${data.map(v => html`<li><${Notes} seed=${v}/></li>`)}
        </ol>
      `;
    }


    function Combination ({ seed = [], size = 2 }) {
      const data = useMemo(() => calculateCombination({ seed, size }), [seed, size]);
      
      return html`
        <ol>
          ${data.map(v => {
            return html`
              <li>
                <${Notes} seed=${v} />
                <${Permutation} seed=${v}/>
              </li>
            `
          })}
        </ol>
      `;
    };


    function App() {
      const [scale, setScale] = useState(['A', 'C', 'D', 'E', 'G']);
        
      return html`
        <div id="app">
          <h2>Scale</h2>
          <ul>
            ${scale.map(note => html`<li>${note}</li>`)}
          </ul>
          <h2>Combination</h2>
          <${Combination} seed=${scale} />
          <${Combination} seed=${scale} size=${3} />
          <${Combination} seed=${scale} size=${4} />
        </div>
      `;
    };


    render(html`<${App}/>`, document.querySelector('#root'), document.querySelector('#app'));
---
Exploring combinatorics with relation to music.
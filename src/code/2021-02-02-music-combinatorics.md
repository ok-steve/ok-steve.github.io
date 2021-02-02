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
  code: >-
    import { h, render } from 'https://cdn.skypack.dev/preact';

    import htm from 'https://cdn.skypack.dev/htm';

    import { useMemo } from 'https://cdn.skypack.dev/preact/hooks';

    //import { xiterable as $X } from 'https://cdn.jsdelivr.net/npm/js-xiterable@0.0.3/xiterable.min.js';

    import * as $C from 'https://cdn.jsdelivr.net/npm/js-combinatorics@1.4.5/combinatorics.js';


    const html = htm.bind(h);


    const notes = ['C','C#','D','Eb','E','F','F#','G','Ab','A','Bb','B'];


    const calculateCombination = (seed = [], size = 2) => {
      const it = new $C.Combination(seed, size);
      return it.toArray();
    }


    const Combination = ({ seed = [], size = 2 }) => {
      const data = useMemo(() => calculateCombination(seed, size), [seed, size]);
      
      return html`
        <ol>
          ${data.map(v => html`<li>${v.join(' ')}</li>`)}
        </ol>
      `;
    };


    const App = () => {
      const [scale, setScale] = useState(['C', 'Eb', 'F', 'G', 'Bb']);
        
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
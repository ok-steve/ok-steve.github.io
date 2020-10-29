---
layout: code.njk
title: Every 4 chord loop
date: 2020-08-05
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <script src="https://cdn.jsdelivr.net/npm/@tonaljs/tonal@4.1.0/browser/tonal.min.js"></script>

    <div id="output"></div>
css:
  lang: css
  code: |-
    @import url("https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css");
    
    body {
      padding: 1em;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      text-align: left;
    }

    th,
    td {
      border: 1px solid;
    }
js:
  lang: javascript
  code: |-
    /**
     * Modules
     */
    import {
      CartesianProduct,
      Permutation
    } from "https://cdn.jsdelivr.net/npm/js-combinatorics@1.2.3/combinatorics.min.js";
    // Fake modules
    const { Chord } = window.Tonal;

    /**
     * Data
     */
    const notes = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
    const chordTypes = ["major", "minor"];
    const chords = notes.map((note) =>
      chordTypes.map((type) => Chord.get(`${note}${type}`))
    );
    // const chords = chordTypes.flatMap((type) =>
    //   notes.map((note) => Chord.get(`${note}${type}`))
    // );

    /**
     * Utilities
     */
    function rotation(list) {
      const results = list.map((item, i, arr) => {
        const first = arr.slice(0, i + 1);
        const last = arr.slice(i + 1, arr.length);
        return [...last, ...first];
      });

      return new Set(results);
    }

    function parse(progression) {
      return progression
        .map((chord, i, arr) => {
          const next = arr[(i + 1) % arr.length];
          const interval =
            (notes.indexOf(next.tonic) - notes.indexOf(chord.tonic) + 12) % 12;
          const type = chordTypes.indexOf(chord.type);
          const id = `${interval.toString(notes.length)}${type.toString(
            chordTypes.length
          )}`;
          return { id, name: chord.name };
        })
        .reduce((agg, curr, i, arr) => {
          Object.keys(curr).forEach((key) => {
            if (!Reflect.has(agg, key)) {
              agg[key] = [];
            }

            agg[key].push(curr[key]);
          });

          return agg;
        }, {});
    }

    /**
     * Generator
     */

    function* generate(data) {
      const p = new Permutation(data, 4);

      for (let x of p) {
        const cp = new CartesianProduct(...x);

        for (let y of cp) {
          yield y;
        }
      }
    }

    /**
     * App
     */

    const iter = generate(chords);

    const idSet = new Set();
    const valueMap = new Map();

    for (let progression of iter) {
      const { id, name } = parse(progression);
      const nameStr = name.join(",");

      const ids = rotation(id);

      for (let i of ids) {
        const idStr = i.join(",");

        if (!idSet.has(idStr)) {
          idSet.add(idStr);

          if (!valueMap.has(nameStr)) {
            valueMap.set(nameStr, new Set());
          }

          valueMap.get(nameStr).add(idStr);
        }
      }
    }
    console.log(valueMap.size);
---

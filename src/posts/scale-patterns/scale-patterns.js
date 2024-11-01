import { h, render } from "https://cdn.skypack.dev/preact";
import htm from "https://cdn.skypack.dev/htm";
import {
  useEffect,
  useMemo,
  useState,
  useRef,
} from "https://cdn.skypack.dev/preact/hooks";
import { Xiterable } from "https://cdn.skypack.dev/js-xiterable";
import {
  Combination,
  Permutation,
} from "https://cdn.jsdelivr.net/npm/js-combinatorics@2.0.0/combinatorics.min.js";
import {
  AbcNotation,
  Note,
  PcSet,
} from "https://cdn.skypack.dev/@tonaljs/tonal";
import abcjs from "https://cdn.skypack.dev/abcjs";

const html = htm.bind(h);
const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

function notesToAbc(seed) {
  return seed.map((n) => AbcNotation.scientificToAbcNotation(`${n}4`)).join("");
}

function calculateCombinationPermutation({ seed = [], size = 2 }) {
  const it = new Combination(seed, size);
  const xit = new Xiterable(it)
    .flatMap((s) => {
      return new Permutation(s);
    })
    .map(notesToAbc);

  return xit.toArray().reduce((str, n, i) => {
    return `${str}|${i % 4 === 0 ? "\n" : ""}${n}`;
  });
}

function Notation({ notation }) {
  const ref = useRef();

  useEffect(() => {
    abcjs.renderAbc(ref.current, `X:1\n${notation}|]`, {
      responsive: "resize",
    });
  }, [notation]);

  return html` <div ref=${ref}></div> `;
}

function App() {
  const [seed, setSeed] = useState(["C", "Eb", "F", "G", "Bb"]);
  const [size, setSize] = useState(4);

  const data = useMemo(
    () => calculateCombinationPermutation({ seed, size }),
    [seed, size]
  );

  const handleChange = ({ target }) => {
    const { value, checked } = target;
    const n = checked ? [...seed, value] : seed.filter((s) => s !== value);
    setSeed(PcSet.intervals(n).map(Note.transposeFrom("C")));
  };

  return html`
    <div id="app">
      ${notes.map((note) => {
        return html`
          <label>
            <input
              type="checkbox"
              value=${note}
              checked=${seed.includes(note)}
              onChange=${handleChange}
            />
            ${note}
          </label>
        `;
      })}

      <label>
        Num
        <input
          type="number"
          min="1"
          max=${seed.length}
          value=${size}
          onChange=${(e) => setSize(e.target.value)}
        />
      </label>

      <h2>Scale</h2>
      <${Notation} notation=${notesToAbc(seed)} />

      <h2>Permutations</h2>
      <${Notation} notation=${data} />
    </div>
  `;
}

render(
  html` <${App} /> `,
  document.querySelector("#root"),
  document.querySelector("#app")
);

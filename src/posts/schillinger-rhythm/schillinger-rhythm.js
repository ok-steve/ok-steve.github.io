// import * as rxjs from 'https://cdn.skypack.dev/rxjs@7.8.0';
// import * as Tonal from "https://cdn.skypack.dev/@tonaljs/tonal@4.8.0";
import abcjs from "https://cdn.skypack.dev/abcjs@6.1.7";

/**
 * Utilities
 */

/*
function range(from, to, step = 1) {
  const list = [];

  for (let i = from; i < to; i += step) {
    list.push(i);
  }

  return list;
}

const unique = (list) => Array.from(new Set(list));

function* summation(generators = [1, 2]) {
  while (true) {
    const [current, ...rest] = generators;
    const next = generators.reduce((x, y) => x + y);
    generators = [...rest, next];
    yield current;
  }
}

function seriesRange(generators, len) {
  const list = range(0, len);
  const series = summation(generators);
  return list.map((_) => series.next().value);
}
*/

/**
 * Rhythm
 */

function distribute(list, pow = 2) {
  console.log("distribute", list);
  // a, b -> (a, b)(a, b) -> aa ab ba bb
  const res = [];
  for (let n = 0; n < pow; n += 1) {
    for (let i = 0; i < list.length; i += 1) {
      res.push(list[i]);
    }
  }
  return list;
}

/*
function interference(generators, useComplementaryFactors = false) {
  const product = generators.reduce((a, b) => a * b);
  const complementaryFactors = generators.map(
    (generator) => product / generator
  );
  const resultant = (useComplementaryFactors
    ? complementaryFactors
    : generators
  ).flatMap((generator) => range(0, product, generator));

  return unique(resultant)
    .sort((x, y) => x - y)
    .reduce((res, val, i, arr) => {
      const next = arr[i + 1] || product;
      res.push(next - val);
      return res;
    }, []);
}

function fractioning(generators) {
  const major = Math.max(...generators);
  const minors = generators.filter((generator) => generator !== major);
  const product = major * major;
  const majorResultant = range(0, product, major);

  const minorResultant = minors.flatMap((minor) =>
    majorResultant
      .filter((step) => major * minor + step <= product)
      .flatMap((start) => range(start, start + major * minor, minor))
  );

  return unique([...majorResultant, ...minorResultant])
    .sort((x, y) => x - y)
    .reduce((res, val, i, arr) => {
      const next = arr[i + 1] || product;
      res.push(next - val);
      return res;
    }, []);
}
*/

function balance(generators) {
  const [a, b] = generators;
  console.log(a, b);

  return [
    ...fractioning(generators),
    ...interference(generators),
    Math.abs(a * (a - b)),
  ];
}

function expansion(generators) {
  return [...interference(generators), ...fractioning(generators)];
}

function contraction(generators) {
  return [...fractioning(generators), ...interference(generators)];
}

/**
 * App
 */

/*
function parseGeneratorInput(value) {
  return value.split('').filter(x => +x).map(x => +x);
}

const generatorInputTarget = document.querySelector('#generators');

const generator$ = rxjs.fromEvent(generatorInputTarget, 'input').pipe(
  rxjs.map(({ target }) => target),
  rxjs.startWith(generatorInputTarget),
  rxjs.map(el => unique(el.value.replace(/\D/g,' ').split(' ').filter(x => x !== '').map(x => +x))),
  rxjs.distinctUntilChanged((prev, curr) => prev.sort().join('') === curr.sort().join(''))
);

function generateAbc(resultant, scale = 4) {
  return `X:1\nL:1/${scale}\nK:C style=rhythm\n${resultant.map(r => `B${r}`)} ||`;
}

function renderResultant(selector, resultant) {
  document.querySelector(`[data-target="${selector}"]`).textContent = resultant.join(', ');
  abcjs.renderAbc(document.querySelector(`[data-target="${selector}-abc"]`), generateAbc(resultant), { responsive: 'resize' });
}

generator$.subscribe(generators => {
  renderResultant('interference', interference(generators));
  renderResultant('fractioning', fractioning(generators));
  renderResultant('balance', balance(generators));
  renderResultant('expansion', expansion(generators));
  renderResultant('contraction', contraction(generators));
});
*/

const output = document.querySelector("output");

function render(input) {
  const distribution = distribute(
    input.value.split(" ").map((n) => +n),
    2
  );
  output.textContent = distribution.join(" ");
}

const generators = document.querySelector("#generators");

render(generators);

generators.addEventListener("input", (e) => {
  render(e.target);
});

import Chance from "https://cdn.skypack.dev/chance";
import { Scale } from "https://cdn.skypack.dev/@tonaljs/tonal";

/**
 * Globals
 */

const INTERVALS = {
  unison: 0,
  second: 1,
  third: 2,
  fourth: 3,
  fifth: 4,
  sixth: 5,
  seventh: 6,
  octave: 7,
};

/**
 * Elements
 */

const form = document.querySelector("#form");
const output = document.querySelector("#output");

/**
 * Utilities
 */

const chance = new Chance();

function weightedRandom(obj) {
  return chance.weighted(Object.keys(obj), Object.values(obj));
}

/**
 * Event listeners
 */

form.addEventListener("input", ({ target, currentTarget }) => {
  if (target.type !== "range") return;
  const output = currentTarget.querySelector(`output[for="${target.id}"]`);
  output.textContent = target.value;
  console.log("input", target.id);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(e.target);

  const weights = Array.from(new Array(+data.get("length")), () => {
    const direction =
      weightedRandom({
        up: +data.get("up"),
        down: +data.get("down"),
      }) === "up"
        ? 1
        : -1;
    const interval =
      INTERVALS[
        weightedRandom({
          unison: +data.get("unison"),
          second: +data.get("second"),
          third: +data.get("third"),
          fourth: +data.get("fourth"),
          fifth: +data.get("fifth"),
          sixth: +data.get("sixth"),
          seventh: +data.get("seventh"),
          octave: +data.get("octave"),
        })
      ];

    return interval * direction;
  });

  const scaleNotes = Scale.get(`${data.get("key")} ${data.get("scale")}`).notes;
  const numNotes = scaleNotes.length;

  const steps = weights.reduce(
    (sequence, step) => {
      const last = sequence[sequence.length - 1];

      return [...sequence, last + step];
    },
    [+data.get("start") % numNotes]
  );

  const notes = steps.map((step) => {
    return scaleNotes[(numNotes + (step % numNotes)) % numNotes];
  });

  output.textContent = notes.join(" ");
});

const form = document.querySelector("form");
const ctx = new AudioContext();
const osc = new OscillatorNode(ctx);
const gain = new GainNode(ctx, { gain: 0 });
const notes = [
  "C",
  "C#/Db",
  "D",
  "D#Eb",
  "E",
  "F",
  "F#/Gb",
  "G",
  "G#/Ab",
  "A",
  "A#/Bb",
  "B",
];

function mtof(midi) {
  return 440.0 * Math.pow(2, (midi - 69) / 12);
}

async function createPeriodicWave(sound) {
  const response = await fetch(
    `https://raw.githubusercontent.com/mohayonao/wave-tables/master/${sound}.json`
  );
  const waveTable = await response.json();
  const real = new Float32Array(waveTable.real.length);
  const imag = new Float32Array(waveTable.imag.length);

  waveTable.real.forEach((value, i) => {
    real[i] = value;
    imag[i] = waveTable.imag[i];
  });

  const wave = ctx.createPeriodicWave(real, imag);

  return wave;
}

async function render(keys) {
  const data = new FormData(form);

  if (!keys || keys.includes("octave") || keys.includes("note")) {
    const note = 12 * +data.get("octave") + notes.indexOf(data.get("note"));
    osc.frequency.value = mtof(note);
  }

  if (!keys || keys.includes("sound")) {
    const wave = await createPeriodicWave(data.get("sound"));
    osc.setPeriodicWave(wave);
  }
}

osc.connect(gain).connect(ctx.destination);

render();
form.addEventListener("change", (e) => {
  render([e.target.name]);
});

document.querySelector("#toggle").addEventListener("click", async (e) => {
  const isStarted = e.target.getAttribute("aria-pressed") === "true";
  e.target.setAttribute("aria-pressed", `${!isStarted}`);

  if (!isStarted) {
    if (!["running", "closed"].includes(ctx.state)) {
      await ctx.resume();
      osc.start();
    }

    gain.gain.setTargetAtTime(1, ctx.currentTime, 0.02);
  } else {
    gain.gain.setTargetAtTime(0, ctx.currentTime, 0.02);
  }
});

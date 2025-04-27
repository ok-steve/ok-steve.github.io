const form = document.querySelector("form");
const output = document.querySelector("#output");

function setMeasures(form) {
  const data = new FormData(form);
  const bpm = parseInt(data.get("bpm"), 10);
  const beats = parseInt(data.get("beats"), 10);
  const duration = parseFloat(data.get("duration"));
  const measures = Math.ceil((bpm / beats) * duration);
  output.textContent = measures;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

setMeasures(form);

form.addEventListener("input", (e) => {
  setMeasures(e.currentTarget);
});

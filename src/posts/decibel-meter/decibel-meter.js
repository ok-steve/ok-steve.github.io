const meter = document.querySelector("meter");
const ctx = new AudioContext();
const analyzer = new AnalyserNode(ctx);
const pcmData = new Float32Array(analyzer.fftSize);

navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: false,
  })
  .then((mediaStream) => new MediaStreamAudioSourceNode(ctx, { mediaStream }))
  .then((source) => source.connect(analyzer));

function render() {
  analyzer.getFloatTimeDomainData(pcmData);

  let sumSquares = 0.0;

  for (const amplitude of pcmData) {
    sumSquares += amplitude * amplitude;
  }

  meter.value = Math.sqrt(sumSquares / pcmData.length);

  if (ctx.state === "running") {
    window.requestAnimationFrame(render);
  }
}

document.querySelector("#toggle").addEventListener("click", async (e) => {
  const isStarted = e.target.getAttribute("aria-pressed") === "true";
  e.target.setAttribute("aria-pressed", `${!isStarted}`);

  if (!isStarted) {
    await ctx.resume();
    window.requestAnimationFrame(render);
  } else {
    ctx.suspend();
  }
});

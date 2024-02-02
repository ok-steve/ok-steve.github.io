const form = document.querySelector('form');
const ctx = new AudioContext();
const bufferSource = ctx.createBufferSource();
bufferSource.connect(ctx.destination);
bufferSource.start();

function createSineBuffer() {
  const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const channel = buf.getChannelData(0);
  let phase = 0;
  let amp = 1;
  const duration = ctx.sampleRate / 50;
  const f = 330;

  for (var i = 0; i < duration; i++) {
    channel[i] = Math.sin(phase) * amp;
    phase += (2 * Math.PI * f) / ctx.sampleRate;

    if (phase > 2 * Math.PI) {
      phase -= 2 * Math.PI;
    }

    amp -= 1 / duration;
  }

  return buf;
}

bufferSource.buffer = createSineBuffer();
bufferSource.loop = true;

function render() {
  const data = new FormData(form);
  const tempo = parseFloat(data.get('tempo'));
  console.log('render', tempo);
  bufferSource.loopEnd = 1 / (tempo / 60);
}

render();
document.querySelector('form').addEventListener('change', (e) => {
  render();
});

document.querySelector('#toggle').addEventListener('click', async (e) => {
  const isStarted = e.target.getAttribute('aria-pressed') === 'true';
  e.target.setAttribute('aria-pressed', `${!isStarted}`);

  if (!isStarted) {
    ctx.resume();
  } else {
    ctx.suspend();
  }
});

// Sync input and output values
document.querySelectorAll('input[type="range"][id]').forEach((input) => {
  input.addEventListener('input', (e) => {
    const id = e.target.id;
    const output = document.querySelector(`output[for="${id}"]`);

    if (output !== null) {
      output.textContent = e.target.value;
    }
  });
});

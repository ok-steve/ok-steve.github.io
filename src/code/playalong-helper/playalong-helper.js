import {
  combineLatest,
  from,
  fromEvent,
  fromEventPattern,
  merge,
} from "https://cdn.skypack.dev/rxjs";
import {
  filter,
  map,
  mergeMap,
  scan,
  share,
  startWith,
  tap,
  withLatestFrom,
} from "https://cdn.skypack.dev/rxjs/operators";
import { context, now, GrainPlayer } from "https://cdn.skypack.dev/tone";
import WaveSurfer from "https://cdn.skypack.dev/wavesurfer.js";
import RegionsPlugin from "https://cdn.skypack.dev/wavesurfer.js/src/plugin/regions/index.js";
/** * File */ const form = document.querySelector("[data-drop]");
const fileInput = document.querySelector('input[type="file"]');
const change$ = fromEvent(fileInput, "change").pipe(map((e) => e.target.files));
const drag$ = fromEventPattern(
  (handler) => {
    "dragover drop".split(" ").forEach((eventName) => {
      form.addEventListener(eventName, handler);
    });
  },
  (handler) => {
    "dragover drop".split(" ").forEach((eventName) => {
      form.removeEventListener(eventName, handler);
    });
  }
).pipe(
  tap((e) => {
    e.preventDefault();
    e.stopPropagation();
  }),
  filter((e) => e.type === "drop"),
  map((e) => e.dataTransfer.files)
);
const file$ = merge(change$, drag$).pipe(
  map((x) => Array.from(x)),
  mergeMap(from),
  share()
);
drag$.subscribe((files) => {
  fileInput.files = files;
});

/**
 * Region
 */
// TODO show cursor progress when playing using Tone
const wavesurfer = WaveSurfer.create({
  container: "#waveform",
  plugins: [RegionsPlugin.create({ loop: true })],
});

function load(blob) {
  return new Promise((resolve, reject) => {
    wavesurfer.loadBlob(blob);

    wavesurfer.on("ready", (e) => {
      const region = wavesurfer.addRegion({
        end: wavesurfer.getDuration(),
      });
      resolve(region);
    });

    wavesurfer.on("error", (msg) => {
      reject(msg);
    });
  });
}

const regionCreated$ = file$.pipe(mergeMap(load));
const regionUpdated$ = fromEventPattern(
  (handler) => {
    wavesurfer.on("region-updated", handler);
  },
  (handler) => {
    wavesurfer.un("region-updated", handler);
  }
);

const region$ = merge(regionCreated$, regionUpdated$).pipe(
  map((region) => ({
    loopStart: region.start,
    loopEnd: region.end,
  })),
  share()
);

/**
 * Player
 */

function readFromFile(file, type) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
      reader.abort();
    };
    switch (type) {
      case "arraybuffer": {
        reader.readAsArrayBuffer(file);
        break;
      }
      case "binarystring": {
        reader.readAsBinaryString(file);
        break;
      }
      case "dataurl": {
        reader.readAsDataURL(file);
        break;
      }
      case "text": {
        reader.readAsText(file);
        break;
      }
    }
  });
}

const grainPlayer$ = file$.pipe(
  mergeMap((file) => readFromFile(file, "arraybuffer")),
  mergeMap((buffer) => context.decodeAudioData(buffer)),
  scan((player, url) => {
    // TODO make more idiomatic way of preserving state
    if (player === null) {
      player = new GrainPlayer({ url, loop: true }).toDestination();
    } else {
      player.buffer.set(url);
    }
    return player;
  }, null)
);
const playbackRate = document.querySelector("#playback-rate");
const playbackRate$ = fromEvent(playbackRate, "change").pipe(
  map(({ target }) => ({ playbackRate: +target.value })),
  startWith({ playbackRate: +playbackRate.value })
);
const detune = document.querySelector("#detune");
const detune$ = fromEvent(detune, "change").pipe(
  map(({ target }) => ({ detune: +target.value })),
  startWith({ detune: +detune.value })
);
const grainSize = document.querySelector("#grain-size");
const grainSize$ = fromEvent(grainSize, "change").pipe(
  map(({ target }) => ({ grainSize: +target.value })),
  startWith({ grainSize: +grainSize.value })
);
const overlap = document.querySelector("#overlap");
const overlap$ = fromEvent(overlap, "change").pipe(
  map(({ target }) => ({ overlap: +target.value })),
  startWith({ overlap: +overlap.value })
);
const options$ = merge(playbackRate$, detune$, grainSize$, overlap$, region$);
const player$ = combineLatest(grainPlayer$, options$).pipe(
  tap(([player, options]) => {
    player.set(options);
  }),
  map(([player]) => {
    return player;
  })
);
/** * App */ fromEvent(document.querySelector("#play-toggle"), "click")
  .pipe(
    tap((e) => e.preventDefault()),
    withLatestFrom(player$)
  )
  .subscribe(([e, player]) => {
    if (player.state === "stopped") {
      player.start(now(), player.loopStart);
    } else {
      player.stop();
    }
  });

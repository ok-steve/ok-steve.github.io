---
title: Playalong helper
date: 2020-12-15
published: false
html:
  lang: html
  code: |-
    <form>
      <div class="p-8 bg-gray-200" data-drop>
        <label for="upload" class="block">Upload</label>
        <input id="upload" type="file" />
      </div>

      <div id="waveform"></div>

      <fieldset>
        <legend>Grain Player</legend>

        <label for="playback-rate" class="block">Playback rate</label>
        <input type="range" name="playback-rate" id="playback-rate" min=".5" max="2" step=".01" />

        <label for="detune" class="block">Detune</label>
        <input type="range" name="detune" id="detune" min="-1200" max="1200" step="1" />

        <label for="grain-size" class="block">Grain size</label>
        <input type="range" name="grain-size" id="grain-size" min="0" max=".5" step=".01" />

        <label for="overlap" class="block">Overlap</label>
        <input type="range" name="overlap" id="overlap" min="0" max=".2" step=".01" />

        <!--
        <label for="loop" class="block">Loop</label>
        <input type="checkbox" name="loop" id="loop">

        <label for="loop-start" class="block">Loop start</label>
        <input type="range" name="loop-start" id="loop-start" min="0" max="1" step="0.1">

        <label for="loop-end" class="block">Loop end</label>
        <input type="range" name="loop-end" id="loop-end" min="0" max="1" step="0.1">
        -->
      </fieldset>

      <button id="play-toggle">Play/Pause</button>
    </form>
css:
  lang: css
  code: |-
    @import url("https://cdn.jsdelivr.net/combine/npm/sanitize.css@11.0.0,npm/tailwindcss@1.2.0/dist/utilities.min.css");

    body {
      padding: 1em;
    }
js:
  lang: javascript
  code: |-
    import { combineLatest, from, fromEvent, fromEventPattern, merge } from 'https://cdn.skypack.dev/rxjs';
    import { filter, map, mergeMap, scan, share, startWith, tap, withLatestFrom } from 'https://cdn.skypack.dev/rxjs/operators';
    import { context, now, GrainPlayer } from 'https://cdn.skypack.dev/tone';
    import WaveSurfer from 'https://cdn.skypack.dev/wavesurfer.js';
    import RegionsPlugin from 'https://cdn.skypack.dev/wavesurfer.js/src/plugin/regions/index.js';

    /**
     * File
     */

    const form = document.querySelector('[data-drop]');
    const fileInput = document.querySelector('input[type="file"]');

    const change$ = fromEvent(fileInput, 'change').pipe(map((e) => e.target.files));

    const drag$ = fromEventPattern(
      (handler) => {
        'dragover drop'.split(' ').forEach((eventName) => {
          form.addEventListener(eventName, handler);
        });
      },
      (handler) => {
        'dragover drop'.split(' ').forEach((eventName) => {
          form.removeEventListener(eventName, handler);
        });
      }
    ).pipe(
      tap((e) => {
        e.preventDefault();
        e.stopPropagation();
      }),
      filter((e) => e.type === 'drop'),
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
      container: '#waveform',
      plugins: [
        RegionsPlugin.create({
          loop: true,
        }),
      ],
    });

    function load(blob) {
      return new Promise((resolve, reject) => {
        wavesurfer.loadBlob(blob);

        wavesurfer.on('ready', (e) => {
          const region = wavesurfer.addRegion({
            end: wavesurfer.getDuration(),
          });

          resolve(region);
        });

        wavesurfer.on('error', (msg) => {
          reject(msg);
        });
      });
    }

    const regionCreated$ = file$.pipe(mergeMap(load));

    const regionUpdated$ = fromEventPattern(
      (handler) => {
        wavesurfer.on('region-updated', handler);
      },
      (handler) => {
        wavesurfer.un('region-updated', handler);
      }
    );

    const region$ = merge(regionCreated$, regionUpdated$).pipe(
      map((region) => ({ loopStart: region.start, loopEnd: region.end })),
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
          case 'arraybuffer': {
            reader.readAsArrayBuffer(file);
            break;
          }
          case 'binarystring': {
            reader.readAsBinaryString(file);
            break;
          }
          case 'dataurl': {
            reader.readAsDataURL(file);
            break;
          }
          case 'text': {
            reader.readAsText(file);
            break;
          }
        }
      });
    }

    const grainPlayer$ = file$.pipe(
      mergeMap((file) => readFromFile(file, 'arraybuffer')),
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

    const playbackRate = document.querySelector('#playback-rate');
    const playbackRate$ = fromEvent(playbackRate, 'change').pipe(
      map(({ target }) => ({ playbackRate: +target.value })),
      startWith({ playbackRate: +playbackRate.value })
    );

    const detune = document.querySelector('#detune');
    const detune$ = fromEvent(detune, 'change').pipe(
      map(({ target }) => ({ detune: +target.value })),
      startWith({ detune: +detune.value })
    );

    const grainSize = document.querySelector('#grain-size');
    const grainSize$ = fromEvent(grainSize, 'change').pipe(
      map(({ target }) => ({ grainSize: +target.value })),
      startWith({ grainSize: +grainSize.value })
    );

    const overlap = document.querySelector('#overlap');
    const overlap$ = fromEvent(overlap, 'change').pipe(
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

    /**
     * App
     */
    fromEvent(document.querySelector('#play-toggle'), 'click')
      .pipe(
        tap((e) => e.preventDefault()),
        withLatestFrom(player$)
      )
      .subscribe(([e, player]) => {
        if (player.state === 'stopped') {
          player.start(now(), player.loopStart);
        } else {
          player.stop();
        }
      });
---
A tool for practicing music.

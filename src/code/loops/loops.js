import {
  Chord,
  Collection,
  Interval,
  Mode,
  Note,
  Progression,
  RomanNumeral,
} from 'https://cdn.skypack.dev/@tonaljs/tonal';

/**
 * Utilities
 */

function strToInt(str, radix = 24) {
  return parseInt(str, radix);
}

function intToStr(int, radix = 24) {
  return int.toString(radix);
}

function symbolToChord(sym) {
  return Chord.get(sym);
}

function chordToId({ tonic, quality }) {
  return intToStr(Note.chroma(tonic) + (quality === 'Minor' ? 12 : 0));
}

function symbolToId(sym) {
  return chordToId(symbolToChord(sym));
}

function idToSymbol(id) {
  const n = strToInt(id);
  const note = Note.pitchClass(Note.fromMidi(n));
  return `${note}${n > 11 ? 'm' : ''}`;
}

function idToLoop(id) {
  return id.split('').map(idToSymbol);
}

function loopToId(loop) {
  return loop.map(chordToId).join('');
}

// Return all rotations of an array
function rotate(list) {
  return list.map((_, i) => Collection.rotate(i, list));
}

// Get an item from an array by index, wrapping
function wrap(list, i) {
  return list[(list.length + i) % list.length];
}

function unique(list) {
  return Array.from(new Set(list));
}

/**
 * Loop utilities
 */

// Set the tonic of the first chord to be C
function normalize(chordIds) {
  const root = strToInt(chordIds[0]) % 12;

  const ids = chordIds.map((id) => {
    const num = strToInt(id);
    const isMinor = num > 11;
    return intToStr(((num + 12 - root) % 12) + (isMinor ? 12 : 0));
  });

  return ids.join('');
}

// Prime is the lowest id when converted to an integer
function prime(id) {
  let deduplicatedIds =
    id.length === 1
      ? [id]
      : id.split('').filter((id, i, list) => id !== wrap(list, i - 1));

  if (deduplicatedIds.length === 0) {
    deduplicatedIds.push(id.charAt(0));
  }

  if (
    (deduplicatedIds.length === 4,
    deduplicatedIds[0] === deduplicatedIds[2] &&
      deduplicatedIds[1] === deduplicatedIds[3])
  ) {
    deduplicatedIds = deduplicatedIds.slice(0, 2);
  }

  const normalizedIds = rotate(deduplicatedIds).map(normalize);

  const retVal = intToStr(
    Math.min(...normalizedIds.map((id) => id.split('').map(strToInt)))
  ).padStart(deduplicatedIds.length, '0');

  return retVal;
}

function negative(chords, axis) {
  const chordData = chords.map(symbolToChord);
  axis = axis || chordData[0].tonic;

  return chordData.map(({ notes }) => {
    const negative = notes.map((note) =>
      Note.transpose(
        axis,
        Interval.invert(Interval.distance(chordData[0].tonic, note))
      )
    );

    return Chord.detect(negative)
      .map((symbol) => symbol.split('/')[0])
      .filter((symbol) => symbol.toLowerCase().endsWith('m'))
      .map((symbol) =>
        symbol.endsWith('M') ? symbol.slice(0, -1) : symbol
      )[0];
  });
}

function getLendvaiFunctions(chordData) {
  const functions = ['Tonic', 'Dominant', 'Subdominant'];
  return chordData
    .map(({ tonic }) => tonic)
    .map(
      (tonic, i, list) =>
        functions[Interval.get(Interval.distance(list[0], tonic)).semitones % 3]
    );
}

function toNashvilleNumbers(keyTonic, chords) {
  const numerals = Progression.toRomanNumerals(keyTonic, chords);

  return numerals.map((numeral) => {
    const { acc, step, chordType } = RomanNumeral.get(numeral);
    return `${acc}${step + 1}${chordType}`;
  });
}

function getTransitions(chordData) {
  return chordData
    .map(({ tonic }, i, list) =>
      [0, 1, 2, 5, 7, 10, 11].includes(
        Math.abs(
          Interval.semitones(
            Interval.simplify(Interval.distance(tonic, wrap(list, i + 1).tonic))
          )
        )
      )
    )
    .map((isToStrong, i, list) => {
      const isFromStrong = wrap(list, i - 1);

      if (isFromStrong && isToStrong) {
        return 'Connector';
      } else if (!isFromStrong && !isToStrong) {
        return 'Island';
      } else if (isToStrong) {
        return 'Signpost';
      } else if (isFromStrong) {
        return 'Destination';
      }
    });
}

function getLoopQuality(transitions) {
  const numDestinations = transitions.filter((t) => t === 'Destination').length;
  const numIslands = transitions.filter((t) => t === 'Island').length;

  if (numIslands === 4) {
    return 'Archipelago';
  } else if (numDestinations === 0) {
    return 'Zero destination';
  } else if (numDestinations === 2) {
    return 'Two destination';
  } else if (numIslands === 2) {
    return 'Drift';
  } else if (numIslands === 1) {
    return 'Piston';
  } else if (numIslands === 0) {
    return 'Cascade';
  }
}

const MODE_NUMERALS = Mode.names().reduce(
  (obj, mode) => ({
    ...obj,
    [mode]: Progression.toRomanNumerals('C', Mode.triads(mode, 'C')),
  }),
  {}
);

function detectMode(chords) {
  const numerals = Progression.toRomanNumerals(
    symbolToChord(chords[0]).tonic,
    chords
  );

  return Object.keys(MODE_NUMERALS)
    .map((mode) => {
      const diatonic = numerals.filter((rn) =>
        MODE_NUMERALS[mode].includes(rn)
      ).length;

      return {
        mode,
        diatonic,
        chromatic: chords.length - diatonic,
      };
    })
    .reduce((prev, curr) => (prev.diatonic > curr.diatonic ? prev : curr), {});
}

/**
 * Loop data
 */

function getLoopData(id) {
  const data = new Map();

  data.set('id', id);
  data.set('chords', idToLoop(id));

  const chordData = data.get('chords').map(symbolToChord);

  data.set(
    'roman-numerals',
    Progression.toRomanNumerals(chordData[0].tonic, data.get('chords'))
  );

  data.set(
    'nashville-numbers',
    toNashvilleNumbers(chordData[0].tonic, data.get('chords'))
  );

  const { mode: parentMode, chromatic: numChromaticChords } = detectMode(
    data.get('chords')
  );

  data.set('parent-mode', parentMode);
  data.set('chromatic-chords', numChromaticChords);

  data.set(
    'negative',
    loopToId(
      negative(data.get('chords'), wrap(chordData[0].notes, -1)).map(
        symbolToChord
      )
    )
  );

  data.set('prime', prime(id));

  data.set('lendvai-functions', getLendvaiFunctions(chordData));

  data.set('modes', unique(rotate(chordData).map(loopToId)));

  data.set('transitions', getTransitions(chordData));
  data.set('quality', getLoopQuality(data.get('transitions')));

  data.set('unique-chords', unique(data.get('chords')).length);

  return data;
}

/**
 * App
 */

const form = document.querySelector('form');
const keyTargets = form.querySelectorAll('select');
const dataTargets = document.querySelectorAll('[data-target]');

function render() {
  const key = (window.location.hash || '#07l5').slice(1);

  keyTargets.forEach((target, i) => {
    target.value = idToSymbol(key.charAt(i));
  });

  const data = getLoopData(key);

  dataTargets.forEach((target) => {
    const key = target.getAttribute('data-target');
    let value = data.get(key);

    switch (key) {
      case 'modes':
        value = value.map((id) => `<a href="#${id}">${id}</a>`);
        target.innerHTML = value.join(' ');
        break;

      default:
        target.textContent = Array.isArray(value) ? value.join(' ') : value;
    }

    if (target.hasAttribute('href')) {
      target.setAttribute('href', `#${value}`);
    }
  });
}

render();

window.addEventListener('hashchange', render);

form.addEventListener('change', () => {
  const value = Array.from(keyTargets)
    .map((target) => target.value)
    .map(symbolToId)
    .join('');

  window.location.hash = `#${value}`;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

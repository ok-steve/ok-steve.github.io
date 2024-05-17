function toInt(str) {
  return parseInt(str, 24);
}

function toStr(int) {
  return int.toString(24);
}

// Return all rotations of an array
function rotate(list) {
  return list.map((_, i) => [...list.slice(i), ...list.slice(0, i)]);
}

// Get an item from an array by index, wrapping
function wrap(list, i) {
  return list[(list.length + i) % list.length];
}

function unique(list) {
  return Array.from(new Set(list));
}

// Set the tonic of the first chord to be C
function normalize(id) {
  const chordIds = id.split("");
  const root = toInt(chordIds[0]) % 12;

  const ids = chordIds.map((id) => {
    const num = toInt(id);
    const isMinor = num > 11;
    return toStr(((num + 12 - root) % 12) + (isMinor ? 12 : 0));
  });

  return ids.join("");
}

// Prime is the lowest id when converted to an integer
function prime(id) {
  let deduplicatedIds =
    id.length === 1
      ? [id]
      : id.split("").filter((id, i, list) => id !== wrap(list, i - 1));

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

  const normalizedIds = rotate(deduplicatedIds).map((chordIds) =>
    normalize(chordIds.join(""))
  );

  const res = toStr(Math.min(...normalizedIds.map(toInt))).padStart(
    deduplicatedIds.length,
    "0"
  );

  return res;
}

const ids = Array.from(new Array(24), (_, i) => toStr(i));

function* makeGenerator(list) {
  for (let a of list) {
    for (let b of list) {
      for (let c of list) {
        for (let d of list) {
          yield [a, b, c, d];
        }
      }
    }
  }
}

const iter = makeGenerator(ids);

const cachedIds = new Set();
const cachedPrimes = new Set();

for (let item of iter) {
  const rotations = rotate(item).map((v) => v.join(""));

  if (rotations.some((id) => cachedIds.has(id))) {
    continue;
  }

  cachedPrimes.add(prime(item.join("")));
}

const fragment = new DocumentFragment();

Array.from(cachedPrimes).forEach((id) => {
  const li = document.createElement("li");
  li.textContent = id;
  fragment.append(li);
});

document.querySelector("ol").append(fragment);

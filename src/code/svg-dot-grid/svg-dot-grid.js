function dotgrid(width = 4, height = 4, scale = 8) {
  const xList = Array.from(new Array(width), (_, i) => (i + 1) * scale);
  const yList = Array.from(new Array(height), (_, i) => (i + 1) * scale);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${
      (width + 1) * scale
    } ${(height + 1) * scale}">
      <defs>
        <circle id="dot" cx="1" cy="1" r="1" fill="#eee" />
      </defs>

      ${xList.flatMap((x) =>
        yList.map((y) => `<use href="#dot" x="${x}" y="${y}" />`)
      )}
      </svg>
    `;
}

document.querySelector("#dotgrid").innerHTML = dotgrid(16, 16);

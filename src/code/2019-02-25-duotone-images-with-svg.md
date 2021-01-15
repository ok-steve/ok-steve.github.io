---
layout: code.njk
title: Duotone images with SVG
date: 2019-02-25
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <div class="grid">
      <div class="grid-cell">
        <div class="field">
          <label for="color-1">Color 1</label>
          <input id="color-1" type="color" value="#fe208d">
        </div>

        <div class="field">
          <label for="color-2">Color 2</label>
          <input id="color-2" type="color" value="#faf07a">
        </div>
      </div>

      <div class="grid-cell">
        <img src="https://www.fillmurray.com/640/360" alt="placeholder image">
      </div>
      
    </div>

    <svg xmlns="http://www.w3.org/2000/svg">
      <filter id="duotone">
        <!-- Grab the SourceGraphic (implicit) and convert it to grayscale -->
        <feColorMatrix type="matrix"
          values=".33 .33 .33 0 0
                  .33 .33 .33 0 0
                  .33 .33 .33 0 0
                  0 0 0 1 0">
          <!--values="1 0 0 0 0
                  1 0 0 0 0
                  1 0 0 0 0
                  0 0 0 1 0">-->
        </feColorMatrix>

        <!-- Map the grayscale result to the gradient map provided in tableValues -->
        <feComponentTransfer id="transfer" color-interpolation-filters="sRGB">
          <feFuncR type="table" tableValues=".996078431  .984313725"></feFuncR>
          <feFuncG type="table" tableValues=".125490196  .941176471"></feFuncG>
          <feFuncB type="table" tableValues=".552941176  .478431373"></feFuncB>
        </feComponentTransfer>
      </filter>
    </svg>
css:
  lang: css
  code: |-
    @import url("https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css");
    img {
      filter: url(#duotone);
    }

    svg {
      display: none;
    }

    label {
      display: block;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
    }

    .field + .field {
      margin-top: 1rem;
    }

    .grid {
      display: flex;
      margin: 0 auto;
      max-width: 60rem;
    }

    .grid-cell {
      flex: 1;
      padding: 1rem;
    }
js:
  lang: javascript
  code: |-
    const inputs = document.querySelectorAll('input');
    const feComponentTransfer = document.querySelector('#transfer');
    const image = document.querySelector('img');

    const hexToRgb = hex => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;

      return [r, g, b];
    };

    const rgbToFrac = val => val / 255;

    const zip = (list1, list2) => list1.map((item, index) => [item, list2[index]]);

    const setColors = () => {
      const colors = [];
      
      inputs.forEach(input => {
        colors.push(hexToRgb(input.value).map(rgbToFrac));
      });

      const tableValues = zip(colors[0], colors[1])
        .map(x => x.join(' '));
      
      tableValues.forEach((value, index) => {
        feComponentTransfer.children[index].setAttribute('tableValues', value);
      });
      
      // Force repaint
      image.style.display = 'none';
      image.offsetHeight;
      image.style.display = 'inline';
    };

    inputs.forEach(input => {
      input.addEventListener('change', setColors);
    });

    setColors();
---
See https://tympanus.net/codrops/2019/02/05/svg-filter-effects-duotone-images-with-fecomponenttransfer/

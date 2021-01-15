---
layout: code.njk
title: Color schemer
date: 2017-10-31
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <div id="app">
      <color v-for="color in colors" :color="color" :primary="primary" v-on:removecolor="removeColor" v-on:setprimary="setPrimary"></color>
      <button v-on:click="addColor">+</button>
    </div>

    <template id="color">
      <div class="flex">
        <div :style="{ backgroundColor: primary }" class="fx1">
          <div :style="{ backgroundColor: color }" class="h2 o-90">&nbsp;</div>
        </div>
        <div>
          <label class="clip" :for="_uid"></label>
          <input type="color" name="color" :id="_uid" v-model="color"/>
          <input type="radio" name="primary" id="" :value="color" v-model="primary" v-on:change="setPrimary"/>
          <button v-on:click="removeColor">-</button>
        </div>
      </div>
    </template>
css:
  lang: css
  code: |-
    @import url("https://cdnjs.cloudflare.com/ajax/libs/tachyons/4.8.1/tachyons.min.css");

    .fx1 {
      flex: 1;
    }
js:
  lang: javascript
  code: |-
    import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.min.js';
    
    const Color = {
      template: '#color',
      props: {
        color: {
          type: String,
        },
        primary: {
          type: String,
        },
      },
      methods: {
        removeColor() {
          this.$emit('removecolor', this.color);
        },
        setPrimary() {
          this.$emit('setprimary', this.color);
        },
      },
    };

    const vm = new Vue({
      el: '#app',
      components: {
        'color': Color,
      },
      data: {
        colors: ['#222222', '#f5f5f5', '#0000ff', '#ff0000'],
        primary: '#0000ff',
      },
      methods: {
        addColor() {
          this.colors.push('#000000');
        },
        removeColor(val) {
          this.colors = this.colors.filter(color => color !== val);
          
          if (val === this.primary) {
            this.setPrimary(this.colors[0]);
          }
        },
        setPrimary(val) {
          this.primary = val;
        },
      },
    });
---
A tool to build color schemes.

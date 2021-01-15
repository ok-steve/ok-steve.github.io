---
layout: code.njk
title: Horizontal and vertical sliders
date: 2017-10-25
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <div class="container">
      <div class="slider is-horizontal" data-controller="slider" data-action="keydown@window->slider#switch" data-slider-direction="horizontal">
        <section class="slider-slide" data-slider-target="slide" data-index="0">
          <h1>Slide 1</h1>
          <p>Lorem lean startup ipsum product market fit customer development acquihire technical cofounder.</p>
        </section>
        <section class="slider-slide" data-slider-target="slide" data-index="1">
          <h1>Slide 2</h1>
          <p>User engagement A/B testing shrink a market venture capital pitch deck.</p>
        </section>
        <section class="slider-slide" data-slider-target="slide" data-index="2">
          <h1>Slide 3</h1>
          <p>Social bookmarking group buying crowded market pivot onboarding freemium prototype ping pong.</p>
        </section>
      </div>
    </div>
    <div class="container">
      <div class="slider is-vertical" data-controller="slider" data-action="keydown@window->slider#switch">
        <section class="slider-slide" data-slider-target="slide" data-index="0">
          <h1>Slide 1</h1>
          <p>Lorem lean startup ipsum product market fit customer development acquihire technical cofounder.</p>
        </section>
        <section class="slider-slide" data-slider-target="slide" data-index="1">
          <h1>Slide 2</h1>
          <p>User engagement A/B testing shrink a market venture capital pitch deck.</p>
        </section>
        <section class="slider-slide" data-slider-target="slide" data-index="2">
          <h1>Slide 3</h1>
          <p>Social bookmarking group buying crowded market pivot onboarding freemium prototype ping pong.</p>
        </section>
      </div>
    </div>
css:
  lang: css
  code: |-
    @import url("/base-styles/style.css");

    .slider {
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }
    .slider.is-horizontal {
      display: -webkit-box;
      display: flex;
      overflow-x: auto;
      -ms-scroll-snap-type: x mandatory;
          scroll-snap-type: x mandatory;
    }
    .slider.is-horizontal .slider-slide {
      -webkit-box-flex: 1;
              flex: 1 0 100%;
      scroll-snap-align: center;
    }
    .slider.is-vertical {
      overflow-y: auto;
      -ms-scroll-snap-type: y mandatory;
          scroll-snap-type: y mandatory;
    }
    .slider.is-vertical .slider-slide {
      scroll-snap-align: start;
      min-height: 100%;
    }

    /**
     * Demo only
     */
    * {
      box-sizing: inherit;
    }

    body {
      background-color: whitesmoke;
      box-sizing: border-box;
      margin: 0;
      padding: 1rem;
    }
    body * + * {
      margin-top: 1rem;
    }

    .container {
      background-color: white;
      border-radius: 3px;
      box-shadow: 0 1px 3px rgba(128, 128, 128, 0.2);
      height: 0;
      margin-left: auto;
      margin-right: auto;
      overflow: hidden;
      padding-bottom: 56.25%;
      position: relative;
      width: 90vw;
    }
    .container > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .slider-slide {
      padding: 1rem;
      text-align: center;
      margin-top: 0;
    }
    .slider-slide:nth-child(2n) {
      background-color: black;
      color: white;
    }
js:
  lang: javascript
  code: |-
    import { Application, Controller } from 'https://cdn.skypack.dev/stimulus';

    class SliderController extends Controller {
      static get targets() {
        return [
          'slide'
        ];
      }
      
      connect() {
        if (this.current !== 0) this.slide();
      }
      
      get current() {
        return +this.data.get('slide') || 0;
      }
      
      set current(val) {
        const clamped = Math.min(this.slideTargets.length - 1, Math.max(0, +val));
        
        if (clamped !== this.current) {
          this.data.set('slide', clamped);
          this.slide();
        }
      }
      
      get direction() {
        const direction = this.data.get('direction');
        
        if (['horizontal', 'vertical'].includes(direction)) {
          return direction;
        }
        
        return 'vertical';
      }
      
      prev() {
        this.current -= 1;
      }
      
      next() {
        this.current += 1;
      }
      
      switch(e) {
        if (e.repeat) {
          return;
        }
        
        // 37: left, 38: up, 39: right, 40: down
        const keyCode = e.keyCode;
        
        if ([37, 38, 39, 40].includes(keyCode)) {
          e.preventDefault();
        }
        
        if (
          keyCode === 37 && this.direction === 'horizontal'
          || keyCode === 38 && this.direction === 'vertical'
        ) {
          this.prev();
        } else if (
          keyCode === 39 && this.direction === 'horizontal'
          || keyCode === 40 && this.direction === 'vertical'
        ) {
          this.next();
        }
      }
      
      slide() {
        const containerStyle = window.getComputedStyle(this.element);
        const containerRect = this.element.getBoundingClientRect();
        const el = this.slideTargets[this.current];
        const rect = el.getBoundingClientRect();
        
        const options = {
          left: rect.left - containerRect.left,
          top: rect.top - containerRect.top,
          behavior: containerStyle.scrollBehavior,
        };
        
        this.element.scrollBy(options);
      }
    }

    const application = Application.start();

    application.register('slider', SliderController);
---
Horizontal and vertical sliders using Stimulus.

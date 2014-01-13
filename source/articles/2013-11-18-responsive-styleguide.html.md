---
title: Responsive styleguide
date: 2013-11-18
tags: presentations
libraries: reveal
published: false
---

Summary of the styleguide which needs to be a certain number of characters long so the rest of the content doesn't display.

<div class="reveal">
  <div class="slides">
    <!-- Act 1: Set up the story -->
    <section>
      <h1>Setting</h1>
      <p>We are see increasing mobile traffic across all of our websites.</p>
      <p>TODO: get images of Google analytics</p>
    </section>
    <section>
      <h1>The protagonist</h1>
      <p>About CUA - medium sized university in the DC area.</p>
      <p>We are a technically able, yet small department, generally of new librarians.</p>
    </section>
    <section>
      <h1>The imbalance</h1>
      <p>Don't need to rely on predefined themes, or Bootstrap (and actually it would be bad because we want our own branding).</p>
      <p>We're too small to maintain quality and consistency, and branding, There's 2 of us.</p>
    </section>
    <section>
      <h1>The balance</h1>
      <p>Reduce, reuse, recycle code, and automate</p>
      <p>TODO: get recycle font icon</p>
    </section>
    <section>
      <h1>The solution</h1>
      <p>Responsive design, with a middle "styleguide"</p>
    </section>
    <!-- Act 2: Develop the action -->
    <section>
      <h1></h1>
      <p>Responsive design is hard, but solutions can be reused</p>
    </section>
    <section>
      <h1>Identify patterns/preplanning</h1>
      <p>Know what software you want to support.</p>
      <p>Use base themes/default markup, so you don't have to maintain markup. Use popular well-maintained themes.</p>
      <p>Scan through the systems to identify visual patterns (SMACSS). In markup things aren't necessarily the same (breadcrumbs)</p>
      <p>Also different software used different patterns (wordpress and omeka uses pager, drupal doesn't)</p>
    </section>
    <section>
      <h1>Styleguide</h1>
      <p>Static site generator (Middleman), that assembles templates, compiles files, minifies</p>
      <p>Styles are automatically documented</p>
      <p>Development/testing/coding/design occurs in one place</p>
    </section>
    <section>
      <h1>Sass/placeholders</h1>
      <p>Sass like template (PHP) for CSS, variables, mixins, nesting, imports</p>
      <p>Extends are silent, if you don't extend them they won't appear, thus reducing the codebase</p>
    </section>
    <section>
      <h1>Other sites</h1>
      <p>We have a "local" folder for local styles, everything else can be copied and pasted. Then in derivative themes we just change the variables/selectors to be what we want.</p>
      <p>We use the same system to build the theme files</p>
    </section>
    <!-- Act 3: Frame the resolution -->
    <section>
      <h1>The crisis</h1>
      <p>We're too small</p>
    </section>
    <section>
      <h1>The solution</h1>
      <p>Simplify the code we have to maintain</p>
    </section>
    <section>
      <h1>The climax</h1>
      <p>Preplanning and Responsive design with a styleguide</p>
    </section>
    <section>
      <h1>The resolution</h1>
      <p>We're able to keep updates manageable</p>
    </section>
  </div>
</div>

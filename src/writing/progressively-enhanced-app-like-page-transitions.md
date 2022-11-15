---
date: 2022-03-22
title: Progressively enhanced app-like page transitions
tags:
  - work
---

Many native apps effectively use page transitions to improve user experience/engagement. When replicating those same transitions on the web one might reach for a single-page application framework like React or Vue. But did you know it's also possible to design those engaging animations using the HTML you already have?

[Sarah Drasner's](https://sarahdrasnerdesign.com/) article about [native-like animations on the web](https://css-tricks.com/native-like-animations-for-page-transitions-on-the-web/) demonstrates it's possible to emulate the smooth page transitions so often found on native apps. Using [nuxt.js](https://nuxtjs.org/), she created a really neat demo travel site.

The demo made heavy use of Vue's `transition` and `transition-group` elements to handle the animations. It keeps the markup of the header the same between pages and applies transforms to make the page display differently. But what about site's that aren't currently using a single-page application framework or don't have the resources to refactor their site? Is is possible to add the same functionality to a site that renders static HTML, using progressive enhancement techniques?

To find out I set myself the goal of recreating [her travel app demo](https://page-transitions.com/) without Vue. I decided to use [Jekyll](https://jekyllrb.com/) since I planned to host the site on Github. And if this technique could work on a simple static site, it could work anywhere.

To actually handle the transitions I decided to use [Turbolinks](https://github.com/turbolinks/turbolinks/), though any PJAX (pushState + Ajax) library could work. I used Turbolinks's events to add `is-loading` and `is-rendering` classes to trigger page exit and enter transitions.

```javascript
document.addEventListener('turbolinks:click', function () {
  document.body.classList.add('is-loading');
});

document.addEventListener('turbolinks:before-render', function (e) {
  e.data.newBody.classList.add('is-rendering');
});

document.addEventListener('turbolinks:load', function () {
  document.body.classList.remove('is-rendering');
});
```

Unfortunately using Turbolinks's default rendering method didn't work to well. Replacing the entire body by setting `innerHTML` disrupted connection between elements in common on different pages. This might not be a problem for sites where the header looks the same on every page, but this demo needed smooth transitions.

To fix this problem I added [morphdom](https://github.com/patrick-steele-idem/morphdom/), which will diff and patch an HTML string with the existing DOM, similar to, but not quite a virtual DOM.

```javascript
Turbolinks.SnapshotRenderer.prototype.assignNewBody = function () {
  morphdom(document.body, this.newBody);
};
```

Normally I'd be a good citizen and avoid overriding the prototype directly, but for a demo I think it's okay to make an exception.

And that's the gist of it. I did make some minor changes to the original code to remove the Vue dependency, but most of the CSS and JavaScript remained exactly the same. Be aware that initializing JavaScript functions on document render doesn't work with PJAX, since after the first page load the document render event never fires. I used [Stimulus](https://stimulusjs.org/) since it is designed to work in these situations, and like Turbolinks is made by Basecamp. Furthermore using a progressive enhancement approach actually simplified some aspects of the code. In particular I was able to replace the JavaScript for the profile chooser on the group page with plain links.

It can be tempting to reach for a JavaScript framework when you want to add app-like behavior on the web, but you can achieve similar results with with a PJAX approach.

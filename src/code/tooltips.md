---
title: Tooltips
date: 2019-06-19
published: false
html:
  lang: html
  code: |-
    <label for="email">Email</label>
    <input id="email" type="email">
    <span role="tooltip">Enter email address</span>
css:
  lang: css
  code: |-
    @import url("/normcore/style.css");

    [role="tooltip"] {
      display: none;
      margin-top: 0;
    }

    :focus + [role="tooltip"] {
      display: block;
    }
js:
  lang: javascript
---
See: http://heydonworks.com/practical_aria_examples

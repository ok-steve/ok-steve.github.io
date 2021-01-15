---
layout: code.njk
title: Inbox zero diagram
date: 2019-09-19
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <div id="diagram"></div>
css:
  lang: css
js:
  lang: javascript
  code: |-
    import flowchart from 'https://cdn.skypack.dev/flowchart.js';

    const code = `
    st=>start: Start
    e=>end:>
    act=>condition: Is is Actionable?

    rem=>condition: Do you need to remember it?
    del=>operation: Delete it!
    save=>operation: Save it!

    youdo=>condition: Do you need to do it?
    deleg=>operation: Delegate it!

    time=>condition: Will it take 2 minutes or less?
    doit=>operation: Do it!
    process=>operation: Process it! (Move to Actions Pending folder; add tags to categorize it, by time range, context, people)

    st->act
    act(no)->rem
    act(yes)->youdo

    rem(no)->del->e
    rem(yes)->save->e

    youdo(no)->deleg->e
    youdo(yes)->time

    time(yes)->doit->e
    time(no)->process->e
    `;

    const diagram = flowchart.parse(code);
    diagram.drawSVG('diagram');
---
A flowchart showing the decision making process of Inbox zero.

---
layout: code.njk
title: Fluid Type (font size, line height, and modular scale combined)
date: 2017-10-25
published: false
tags:
  - code
html:
  lang: html
  code: |-
    <h1>Heading 1</h1>
    <p>Sit odio quibusdam corrupti amet dolorem eaque. Vitae rerum veritatis maiores expedita asperiores. Eveniet atque quidem vero non maxime, eum soluta delectus! Maxime id corporis beatae facilis veniam, vel? Expedita?</p>
    <h2>Heading 2</h2>
    <p>Consectetur consequatur aliquid nostrum nostrum ipsam atque odio aut doloribus minus deleniti! Necessitatibus delectus inventore iste rerum esse, mollitia fugit quod culpa eius ipsam. Sed labore doloribus consequuntur dolores exercitationem?</p>
    <h3>Heading 3</h3>
    <p>Ipsum quo nisi sed quae error rerum neque suscipit? Maxime vitae neque ipsum eum voluptatum. Expedita placeat quod necessitatibus in modi delectus quibusdam quas iste aperiam. Cupiditate consequuntur exercitationem minus?</p>
    <h4>Heading 4</h4>
    <p>Ipsum libero adipisci quas vero ut saepe. Rem deleniti eos natus aut doloribus doloremque quibusdam sed. Iusto voluptatum similique magnam pariatur corporis laboriosam vitae quasi dignissimos ipsam est nemo adipisci.</p>
    <h5>Heading 5</h5>
    <p>Consectetur quidem optio saepe omnis ipsum modi consectetur voluptas ullam dolores beatae eaque rerum sunt amet? Porro veniam libero praesentium illo quibusdam nobis, corrupti dolor at deserunt distinctio earum. Repellat.</p>
    <h6>Heading 6</h6>
    <p>Amet qui quisquam velit voluptatem voluptatem? Eaque adipisicing facere alias fuga earum. Quae alias sequi quos laborum iusto. Quibusdam sint nam reprehenderit quidem at nihil cum exercitationem molestias eligendi fugit.</p>
css:
  lang: css
  code: |-
    * {
      box-sizing: inherit;
      margin: 0;
    }

    * + * {
      margin-top: 20px;
    }
    @media (min-width: 400px) {
      * + * {
        margin-top: calc(7vw - 8px);
      }
    }
    @media (min-width: 800px) {
      * + * {
        margin-top: 48px;
      }
    }

    html {
      font-size: 16px;
      line-height: 20px;
      box-sizing: border-box;
    }
    @media (min-width: 400px) {
      html {
        font-size: calc(4vw + 0px);
      }
    }
    @media (min-width: 800px) {
      html {
        font-size: 32px;
      }
    }
    @media (min-width: 400px) {
      html {
        line-height: calc(7vw - 8px);
      }
    }
    @media (min-width: 800px) {
      html {
        line-height: 48px;
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1;
    }

    h1 {
      font-size: 19.436284208px;
    }
    @media (min-width: 400px) {
      h1 {
        font-size: calc(14.089673244vw - 36.922408768px);
      }
    }
    @media (min-width: 800px) {
      h1 {
        font-size: 75.794977184px;
      }
    }
    * + h1 {
      margin-top: 20.563715792px;
    }
    @media (min-width: 400px) {
      * + h1 {
        margin-top: calc(-0.089673244vw + 20.922408768px);
      }
    }
    @media (min-width: 800px) {
      * + h1 {
        margin-top: 20.205022816px;
      }
    }

    h2 {
      font-size: 18.215824px;
    }
    @media (min-width: 400px) {
      h2 {
        font-size: calc(9.661156vw - 20.4288px);
      }
    }
    @media (min-width: 800px) {
      h2 {
        font-size: 56.860448px;
      }
    }
    * + h2 {
      margin-top: 21.784176px;
    }
    @media (min-width: 400px) {
      * + h2 {
        margin-top: calc(4.338844vw + 4.4288px);
      }
    }
    @media (min-width: 800px) {
      * + h2 {
        margin-top: 39.139552px;
      }
    }

    h3 {
      font-size: 17.072px;
    }
    @media (min-width: 400px) {
      h3 {
        font-size: calc(6.396vw - 8.512px);
      }
    }
    @media (min-width: 800px) {
      h3 {
        font-size: 42.656px;
      }
    }
    * + h3 {
      margin-top: 22.928px;
    }
    @media (min-width: 400px) {
      * + h3 {
        margin-top: calc(7.604vw - 7.488px);
      }
    }
    @media (min-width: 800px) {
      * + h3 {
        margin-top: 53.344px;
      }
    }

    h4 {
      font-size: 16px;
    }
    @media (min-width: 400px) {
      h4 {
        font-size: calc(4vw + 0px);
      }
    }
    @media (min-width: 800px) {
      h4 {
        font-size: 32px;
      }
    }
    * + h4 {
      margin-top: 24px;
    }
    @media (min-width: 400px) {
      * + h4 {
        margin-top: calc(10vw - 16px);
      }
    }
    @media (min-width: 800px) {
      * + h4 {
        margin-top: 64px;
      }
    }

    h5 {
      font-size: 14.9953139644px;
    }
    @media (min-width: 400px) {
      h5 {
        font-size: calc(2.252671884vw + 5.9846264284px);
      }
    }
    @media (min-width: 800px) {
      h5 {
        font-size: 24.0060015004px;
      }
    }
    * + h5 {
      margin-top: 25.0046860356px;
    }
    @media (min-width: 400px) {
      * + h5 {
        margin-top: calc(11.747328116vw - 21.9846264284px);
      }
    }
    @media (min-width: 800px) {
      * + h5 {
        margin-top: 71.9939984996px;
      }
    }

    h6 {
      font-size: 14.0537150557px;
    }
    @media (min-width: 400px) {
      h6 {
        font-size: calc(0.9888220801vw + 10.0984267352px);
      }
    }
    @media (min-width: 800px) {
      h6 {
        font-size: 18.0090033761px;
      }
    }
    * + h6 {
      margin-top: 25.9462849443px;
    }
    @media (min-width: 400px) {
      * + h6 {
        margin-top: calc(13.0111779199vw - 26.0984267352px);
      }
    }
    @media (min-width: 800px) {
      * + h6 {
        margin-top: 77.9909966239px;
      }
    }
js:
  lang: javascript
---
Fluid typography with locks example.

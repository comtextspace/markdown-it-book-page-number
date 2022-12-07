# Book page number plugin for markdown-it

This plagen parses markdown and replaces page number in special format

from

```
 [# 33]
```

to

```
<a href="#pn23" id="pn23" class="book-page-number" data-pn="23">[23]</a>
```

## Installation

With [Yarn](https://yarnpkg.com/):

```
yarn add -D @comtext/markdown-it-book-page-number
```

With npm

```
npm i @comtext/markdown-it-book-page-number
```

## Using

```js
const md = require("markdown-it")();
const mk = require("@comtext/markdown-it-book-page-number");

md.use(mk);

var result = md.render("text [# 23] text");
```

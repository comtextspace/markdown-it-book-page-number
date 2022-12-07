"use strict";

const link_class = "book-page-number";

function processInline(token, state) {
  function str_to_token(str) {
    let m = str.match(/\[\#\s*([^\s]+)[^\]]*\]/);
    if (m === null) {
      let newToken = new state.Token("text", "", 0);
      newToken.content = str;
      return newToken;
    } else {
      let newToken = new state.Token("pagenumber", "", 0);
      newToken.content = m[1];
      return newToken;
    }
  }

  for (let i = 0; i < token.children.length; i++) {
    let child = token.children[i];

    if (child.type === "text") {
      let items = child.content.split(/(\[\#\s*[^\s]+[^\]]*\])/);

      if (items.length == 1) {
        continue;
      }

      let tokens = items.map(str_to_token);
      token.children.splice(i, 1, ...tokens);
      i--;
    }
  }
}

function process(state) {
  for (let i = 0; i < state.tokens.length; i++) {
    let token = state.tokens[i];

    if (token.type === "inline") {
      processInline(token, state);
    }
  }
}

module.exports = function plugin(md, options) {
  md.renderer.rules.pagenumber = function (tokens, idx) {
    let content = tokens[idx].content;

    return `<a href="#pn_${content}" id="pn_${content}" class="${link_class}" data-pn="${content}">[${content}]</a>`;
  };

  md.core.ruler.push("pagenumber", process);
};

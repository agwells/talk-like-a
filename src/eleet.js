// Eleet filter, Copyright 1999, 2002 by Joey Hess under the terms of the GNU GPL.
const sameCap = require("./lib").sameCap;

let from = "abcdefghijklmnopqrstuvwxyz";
from = from + from.toUpperCase();
let to = "4bcd3fgh1jklmn0pqr5tuvwxyz";
to = to + to.toUpperCase();

module.exports = function eleet(initialString) {
  let tweakedString = initialString
    .replace(/porn/g, sameCap("pr0n"))
    .replace(/elite/g, sameCap("l33t"));
  let translatedString = [];
  for (let i = 0; i < tweakedString.length; i++) {
    let c = tweakedString.charAt(i);
    let k = from.indexOf(c);
    if (k === -1) {
      translatedString.push(c);
    } else {
      translatedString.push(to.charAt(k));
    }
  }
  return translatedString.join("");
};

// # These are not in common usage anymore.
// #s:h:|-|:ig;
// #s:l:|_:ig;
// #s:m:/\\/\\:ig;
// #s:n:/\\/:ig;
// #s:w:\\/\\/:ig;
// #s:v:\\/:ig;
// #s:x:><:ig;

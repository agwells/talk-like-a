// Eleet filter, Copyright 1999, 2002 by Joey Hess under the terms of the GNU GPL.

let from = "abcdefghijklmnopqrstuvwxyz";
from = from + from.toUpperCase();
let to = "4bcd3fgh1jklmn0pqr5tuvwxyz";
to = to + to.toUpperCase();

module.exports = function eleet(initialString) {
  let tweakedString = initialString
    .replace(/porn/gi, "pr0n")
    .replace(/elite/gi, "l33t");
  let translatedString = [];
  for (i = 0; i < tweakedString.length; i++) {
    let c = tweakedString.charAt(i);
    let k = from.indexOf(c);
    if (k === -1) {
      translatedString.push(c);
    } else {
      translatedString.push(to.charAt(k));
    }
  }
  return translatedString.join("").replace(/porn/gi);
};

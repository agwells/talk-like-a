/**
 * Eleet filter
 *
 * K3wl hacker slang
 *
 * @copyright (c) 1999, 2002 Joey Hess
 * @license GPL-2+
 * @author Aaron Wells
 */
const { sameCapReplacer, tr } = require('./lib');

let from = 'abcdefghijklmnopqrstuvwxyz';
from = from + from.toUpperCase();
let to = '4bcd3fgh1jklmn0pqr5tuvwxyz';
to = to + to.toUpperCase();

function eleet(initialString) {
  return tr(
    initialString
      .replace(/porn/g, sameCapReplacer('pr0n'))
      .replace(/elite/g, sameCapReplacer('l33t')),
    from,
    to
  );
}

// # These are not in common usage anymore.
// #s:h:|-|:ig;
// #s:l:|_:ig;
// #s:m:/\\/\\:ig;
// #s:n:/\\/:ig;
// #s:w:\\/\\/:ig;
// #s:v:\\/:ig;
// #s:x:><:ig;

module.exports = { eleet };

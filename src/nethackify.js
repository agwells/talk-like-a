/**
 * Nethackify
 *
 * Makes text look like a partially rubbed out engraving in Nethack.
 *
 * @copyright (c) 2019 Aaron Wells
 * @license GPL-2
 * @author Aaron Wells
 */
const getRandFn = require('./lib').getRandFn;

const rubouts = {
  A: '^',
  B: 'Pb[',
  C: '(',
  D: '|)[',
  E: '|FL[_',
  F: '|-',
  G: 'C(',
  H: '|-',
  I: '|',
  K: '|<',
  L: '|_',
  M: '|',
  N: '|\\',
  O: 'C(',
  P: 'F',
  Q: 'C(',
  R: 'PF',
  T: '|',
  U: 'J',
  V: '/\\',
  W: 'V/\\',
  Z: '/',
  b: '|',
  d: 'c|',
  e: 'c',
  g: 'c',
  h: 'n',
  j: 'i',
  k: '|',
  l: '|',
  m: 'nr',
  n: 'r',
  o: 'c',
  q: 'c',
  w: 'v',
  y: 'v',
  ':': '.',
  ';': ',:',
  ',': '.',
  '=': '-',
  '+': '-|',
  '*': '+',
  '@': '0',
  '0': 'C(',
  '1': '|',
  '6': 'o',
  '7': '/',
  '8': '3o',
};
/**
 *
 * @param {string} str
 */
function nethackify(str) {
  const rand = getRandFn(1);
  return str
    .split('')
    .map(function(cOrig) {
      let c = cOrig;
      while (c !== ' ' && rand() % 2 > 0) {
        if (c in rubouts) {
          const options = rubouts[c];
          if (options.length === 1) {
            c = options[0];
          } else {
            c = options[rand() % options.length];
          }
        } else if ("?.,'`-|_".includes(c)) {
          c === ' ';
        } else {
          c === '?';
        }
      }
      return c;
    })
    .join('');
}

module.exports = { nethackify };

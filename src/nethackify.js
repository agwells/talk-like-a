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

const erasures = {
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
  '0': 'C(',
  '1': '|',
  '6': 'o',
  '7': '/',
  '8': '3o',
  ':': '.',
  ';': ',:',
  ',': '.',
  '=': '-',
  '+': '-|',
  '*': '+',
  '@': '0',
  '?': ' ',
  '.': ' ',
  "'": ' ',
  '`': ' ',
  '-': ' ',
  '|': ' ',
  _: ' ',
};

/**
 *
 * @param {string} str
 */
function nethackify(str) {
  const rand = getRandFn(1);
  const modStr = str.split('');
  for (let i = 0; i < Math.floor(str.length / 4); i++) {
    let n = rand() % str.length;
    let c = modStr[n];
    if (c in erasures) {
      const options = erasures[c];
      if (options.length === 1) {
        c = options[0];
      } else {
        c = options[rand() % options.length];
      }
    } else if (!/\s/.test(c)) {
      c = '?';
    }
    modStr[n] = c;
  }
  return modStr.join('');
}

module.exports = { nethackify };

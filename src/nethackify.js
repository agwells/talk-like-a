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
  A: '/\\^-',
  B: 'Pb[3',
  C: '(',
  D: '|)[',
  E: '|FL[_-',
  F: '|-',
  G: 'C(-',
  H: '|-',
  I: '|',
  J: '?',
  K: '|<',
  L: '|_',
  M: '|V',
  N: '|\\',
  O: 'CU()',
  P: 'F|-',
  Q: 'C(),',
  R: 'PF',
  S: '?',
  T: '|',
  U: 'J',
  V: '/\\v',
  W: 'V/\\v',
  X: '/\\',
  Y: '?',
  Z: '/7_',
  a: '?',
  b: '|L',
  c: '?',
  d: 'c|',
  e: 'c-',
  f: '-',
  g: 'c',
  h: 'n|',
  i: ':',
  j: 'i,',
  k: '|',
  l: '|',
  m: 'nr',
  n: 'r',
  o: 'c',
  p: 'o',
  q: 'o',
  r: '?',
  s: '?',
  t: '?',
  u: '?',
  v: '?',
  w: 'v',
  x: '?',
  y: 'v,',
  z: '_-',
  '0': 'C()',
  '1': '|',
  '2': '_',
  '3': '?',
  '4': '-|+',
  '5': '?',
  '6': 'oC(',
  '7': '/',
  '8': '3o?',
  '9': ')?',
  ':': '.',
  ';': ',:',
  ',': '.',
  '=': '-',
  '+': '-|',
  '*': '+',
  '"': "'",
  '@': '0a',
  '!': ':.',
  '|': '!:',
  '#': '/=',
  '%': '/o',
  '&': '8o',
  '?': ' ',
  '.': ' ',
  "'": ' ',
  '`': ' ',
  '-': ' ',
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

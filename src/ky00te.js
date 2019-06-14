/**
 * This program places a very cute (and familiar to FurryMuck fans)
 * accent to any text file.
 *
 * @copyright (c) 1994 Brent E. Edwards
 * @license GPL-2
 * @author Aaron Wells
 */
const { simuLex } = require('./lib');

const CUTE = 'ky00te!';
const FLUFF = '*fluff!*';
const SMILE = '};)';
const PURR = 'purr';
const FUR = 'fur';
const ATTA = 'atta';
const YNNA = 'ynna';
const YSSA = 'yssa';
const ONNA = 'onna';
const WYFFA = 'wyffa';
const LOTTA = 'lotta';
const WYF = ' wyf ';
const WYFF = ' wyff';
const DA = ' da ';
const YER = ' yer';
const YA = ' ya';
const AN = " 'n ";
const TA = ' ta ';
const WEN = " w'en ";
const NA = " na'";
/**
 *
 * @param {() => number} rand
 * @returns {string}
 */
function MEOW(rand) {
  const inRand = rand() % 5;

  switch (inRand) {
    case 0:
    case 1:
    case 2:
      return 'meow';
    case 3:
    case 4:
      return 'mew';
  }
}

/**
 *
 * @param {() => number} fakeRand
 * @returns {string}
 */
function SPACE(fakeRand) {
  if (fakeRand() % 30 < 1) {
    const inRand = fakeRand() % 5;

    switch (inRand) {
      case 0:
        return ' *truffle break!* ';

      case 1:
        return ' *catnap break!* ';

      case 2:
        return ' *purrpurr* ';

      case 3:
        return ' *meow!* ';

      case 4:
        return ' *fluff!* ';
    }
  } else {
    return ' ';
  }
}

/**
 * @type {[string, () => any][]}
 */
const rawRules = [
  ['i', () => 'y'],
  ['I', () => 'Y'],
  ['cks', () => 'x'],
  ['ks', () => 'x'],
  ['cute', () => CUTE],
  ['fluff', () => FLUFF],
  ['smile', () => SMILE],
  ['grin', () => SMILE],
  ['laugh', () => SMILE],
  ['chuckle', () => SMILE],
  ['pr', () => PURR],
  ['p[aeiou]*r', () => PURR],
  ['f[aeiou]+r', () => FUR],
  ['m[aeiou]+(?=$|[^.,s?! ])', (match, { rand }) => MEOW(rand)] /*UN*/,
  ['at a', () => ATTA],
  ['at the', () => ATTA],
  ['in a', () => YNNA],
  ['in the', () => YNNA],
  ['is a', () => YSSA],
  ['is the', () => YSSA],
  ['is so', () => YSSA],
  ['on a', () => ONNA],
  ['on the', () => ONNA],
  ['with a', () => WYFFA],
  ['with the', () => WYFFA],
  ['lot of', () => LOTTA],
  ['(\n| )with($|\b| )', () => WYF],
  ['(\n| )with', () => WYFF],
  ['(\n| )the($|\b| )', () => DA],
  ['(\n| )your', () => YER],
  ['(\n| )you', () => YA],
  ['(\n| )and($|\b| )', () => AN],
  ['(\n| )to($|\b| )', () => TA],
  ['(\n| )when($|\b| )', () => WEN],
  ["n't", () => NA] /*UN*/,
  [' not', () => NA] /*UN*/,
  [`[ \t]`, (match, { rand }) => SPACE(rand)],
  ['r', () => 'rr'],
];

const rules = simuLex.preprocessRules(rawRules);

/**
 *
 * @param {string} originalString
 * @returns {string}
 */
function ky00te(originalString) {
  return simuLex(originalString, rules);
}
module.exports = { ky00te };

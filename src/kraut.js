const simuLex = require('./lib').simuLex;

/**
 * @type {[string, (match: string) => string][]}
 */
const rawRules = [
  ['ing', () => 'ingkt'],
  [' the ', () => ' ze '],
  ['The ', () => 'Ze '],
  [' with ', () => ' mitt '],
  ['With ', () => 'Mitt '],
  ['wr', () => 'w-r-r'],
  ['Wr', () => 'W-r-r'],
  ['R', () => 'R-r-r'],
  ['Yes ', () => 'Jawohl '],
  [' r', () => ' r-r-r'],
  ['Yes\\.', () => 'Jawohl.'],
  ['Yes!', () => 'Jawohl!'],
  ['YES!', () => 'JAWOHL!'],
  [' yes ', () => ' ja '],
  [' yes\\.', () => ' ja.'],
  [' yes!', () => ' yes!'],
  ['No ', () => 'Nein '],
  ['No!', () => 'Nein!'],
  ['No\\?', () => 'Nein?'],
  [' no ', () => ' nein '],
  [' no\\.', () => ' nein.'],
  [' no!', () => ' nein!'],
  [' no\\?', () => ' nein?'],
  ['[Mm]r\\.', () => 'Herr'],
  ['[Mm]rs\\.', () => 'Frau'],
  ['Miss', () => 'Fraulein'],
  [' of ', () => ' uff '],
  ['Of ', () => 'Uff '],
  ['my', () => 'mein'],
  ['My', () => 'Mein'],
  [' and ', () => ' undt '],
  ['And ', () => 'Undt '],
  ['One ', () => 'Ein '],
  [' one', () => ' ein'],
  ['Is ', () => 'Ist '],
  [' is ', () => ' ist '],
  ['ow ', () => 'ow '],
  ['w ', () => 'w '],
  ['sh', () => 'sch'],
  ['Sh', () => 'Sch'],
  ['ch', () => 'ch'],
  ['Ch', () => 'Ch'],
  [' c', () => ' k'],
  [' C', () => ' K'],
  ['v', () => 'f'],
  ['V', () => 'F'],
  [' w', () => ' v'],
  ['W', () => 'V'],
  ['th', () => 'd'],
  ['Th', () => 'D'],
  ['[Jj]ohn', () => 'Johann'],
  ['[Ww]illiam', () => 'Wilhelm'],
  ['[Bb]rad', () => 'Wilhelm'],
  ['[Gg]ary', () => 'Gerhardt'],
  ['[Jj]on', () => 'Hansel'],
  ['([a-f])!', (match) => `${match} Naturlich!`],
];

const rules = simuLex.preprocessRules(rawRules);

/**
 *
 * @param {string} originalString
 */
function kraut(originalString) {
  return simuLex(originalString, rules);
}

module.exports = kraut;
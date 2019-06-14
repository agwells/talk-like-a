/**
 *	Lex filter to transform plain English into Brooklyn English.
 *	No racial or societal slurs are intended.  For amusement only.
 *
 *	Reproduction permitted so long as this notice is retained.
 *
 * @copyright (c) 1986 Daniel Klein.
 * @license GPL
 * @author Aaron Wells
 */
const { simuLex, sameCap, sameCapReplacer } = require('./lib');
// BW [ \t]
// SP [ \t]
// EW [ \t.,;!\?$]

const BW = '[ \\t]';
const SP = '[ \\t]';
const EW = '[ \\t.,;!?$]';

/**
 * For cases where the replacement text needs to have the same first letter
 * as the target text, we can skip the calls dealing with case, and just return
 * the first letter of the replacament.
 *
 * This would be trivial to do in-line in the list of rules, but having it
 * as a function call that takes the full replacement as an argument, makes
 * the rules easier to read.
 *
 * @param {string} replacement
 * @returns {(match: string) => string}
 */
function simpleSameCapReplacer(replacement) {
  const r = replacement.slice(1);
  return function(match) {
    return match[0] + r;
  };
}

/**
 * @type {[string, (match: string, utils: any) => string][]}
 */
const rawRules = [
  ['[ao]ther', (match) => (match[0] === 'a' ? 'adder' : 'udder')],
  ['[Nn]othing', simpleSameCapReplacer("nuttin'")],
  ['[Tt]hin', simpleSameCapReplacer('tin')],
  ['[Tt]hir', simpleSameCapReplacer('toi')],
  ['[Tt]h[ei]', (match) => sameCap(match, `d${match.slice(-1)}`)],
  ['[Tt]hat', sameCapReplacer('dat')],
  [`I'm${SP}going${SP}to`, () => "I'manna"],
  [`going${SP}to`, () => 'gonna'],
  [`want${SP}to`, () => 'wanna'],
  [`t${SP}you`, () => 'tcha'],
  [`[Dd]id${SP}you${SP}[eaiou]`, (match) => match[0] + `'j` + match.slice(-1)],
  [`[Dd]id${SP}you`, simpleSameCapReplacer("d'ja")],
  [`[Yy]ou`, simpleSameCapReplacer('yuh')],
  [`[Hh]ow${SP}are${SP}you`, simpleSameCapReplacer('howahrya')],
  [`[Ww]ith`, simpleSameCapReplacer("wit'")],
  ["[Dd]on't", simpleSameCapReplacer('doan')],
  ["(ldn't|dn't)", () => "n't"],
  ["isn't", () => "ain't"],
  [`er(?=${EW})`, () => 'uh'],
  [`ing(?=${EW})`, () => "in'"],
  [
    `([Ww]ord|[Hh]eard|[BbGgLlPpSs]urg|[CcHh][eu]r[ntv])`,
    (match) => match[0] + 'oi' + match.slice(-1),
  ],
  [`[^Mm]mer[^aeiouhrs]`, (match) => match[0] + 'moi' + match.slice(-1)],
  [`[Oo]re(?=${EW})`, sameCapReplacer('awh')],
  [`[Oo]r`, sameCapReplacer('awh')],
  [`[Oo]f`, sameCapReplacer('uhv')],
  [`tion`, () => `shun`],
  [`(alk|our[st]|or[st])`, (match) => `awh${match.slice(-1)}`],
  ['ause', () => 'awze'],
  ['[Oo]ff', sameCapReplacer('awhf')],
  ['[Ss]tupid', simpleSameCapReplacer('stoopid')],
  [`${BW}under`, () => ' unner'],
  [`${BW}to(?=${EW})`, () => ' tuh'],
  [`[Aa]ctual`, simpleSameCapReplacer('ackshul')],
  [`[a-z]:`, (match) => `${match[0]}, like, uhh:`],
  [`[a-z]\\?`, (match) => `${match[0]}, or what?`],
  [`!`, () => '! Okay?'],
  [`[a-z]\\.`, (match, { expletive }) => `${match}${expletive()}`],
];

const rules = simuLex.preprocessRules(rawRules);

/**
 *
 * @param {string} originalString
 */
function nyc(originalString) {
  let count = 0;
  let which = 0;

  const expletive = function() {
    if (count++ % 4 === 0) {
      return [
        ' Okay?',
        ' Right?',
        ' Yuh got me so fahr?',
        " Ya' dig?",
        ' Yuh with me?',
      ][which++ % 5];
    } else {
      return '';
    }
  };

  return simuLex(originalString, rules, { expletive });
}

module.exports = { nyc };

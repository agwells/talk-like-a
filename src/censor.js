/**
 * Censor filter.
 *
 * @copyright (c) 2002 Joey Hess
 * @license GPL-2+
 * @author Aaron Wells
 */

const tr = require('./lib').tr;

/**
 * List of regexes to censor, encoded in ROT-13 so this program itself won't
 * trigger obscenity filters.
 */
const censoredWords = [
  'ahqr',
  'enaql',
  'gjng',
  'pbpx',
  't-fcbg',
  'anxrq',
  'encr',
  'grng',
  'pbzrvat',
  't\\f+fcbg',
  'avccyr',
  'erne',
  'guebng',
  'pbzvat',
  'tebva',
  'bcravat',
  'fangpu',
  'gvg',
  'pebgpu',
  'ubbgre',
  'beny',
  'fchax',
  'gvggl',
  'penc',
  'ubeal',
  'betl',
  'fcrez',
  'gvggvr',
  'penpx',
  'ubyr',
  'betnfz',
  'fcuvapgre',
  'hgrehf',
  'pernz',
  'uhzc',
  'certanag',
  'fghq',
  'ihyin',
  'phag',
  'unaqwbo',
  'cevpx',
  'fgnss',
  'intvan',
  'phz',
  'urnq',
  'chff',
  'fhpx',
  'ivetva',
  'phzzvat',
  'wvfz',
  'chffl',
  'fjnyybj',
  'ivoengbe',
  'pnzr',
  'xabo',
  'chffvrf',
  'fperj',
  'jbzo',
  'preivk',
  'xvff',
  'chovp',
  'frk',
  'jrg',
  'pureel',
  'ybir',
  'chqraqhz',
  'frkhny',
  'juber',
  'pyvg',
  'ybire',
  'chzc',
  'frrq',
  'kkk',
  'pyvgbevf',
  'ybirq',
  'cnagvrf',
  'frzra',
  'nany',
  'pyvggl',
  'ybnq',
  'crargengr',
  'funsg',
  'nerbyn',
  'pyvznk',
  'ynovn',
  'crargengrq',
  'funt',
  'nff',
  'qevyyrq',
  'ynvq',
  'cravf',
  'funttvat',
  'nffubyr',
  'qrsybjre',
  'yrfovna',
  'crgre',
  'fuvg',
  'obbo',
  'qvpx',
  'yvcf',
  'crpxre',
  'fvrt\\furvy',
  'oernfg',
  'qvyqb',
  'znfgheong',
  'cunyyhf',
  'fyhg',
  'ohgg',
  'rebgvp',
  'znfgheongr',
  'cvff',
  'fyhggvfu',
  'ohggbpx',
  'rerpgvba',
  'znfgheongvat',
  'ebfrohq',
  'fyvg',
  'onyy',
  'rkcbfrq',
  'znzznel',
  'ebq',
  'gbathr',
  'ovgpu',
  'shpx',
  'znzznevrf',
  'ehg',
  'gbby',
  'oybj',
  'snpvny',
];

// De-ROT13 the censored words, and concat them into one RegExp snippet,
// with a "|" alternator between each.
const censorCombined = censoredWords
  .map((word) =>
    tr(word, 'abcdefghijklmnopqrstuvwxyz', 'nopqrstuvwxyzabcdefghijklm')
  )
  .join('|');
// Compile an actual RegExp from the combined string.
// Don't say "CENSOREDed"
const censorRE = new RegExp(`\\b(${censorCombined})(ed)?`, 'ig');

/**
 *
 * @param {string} originalString
 * @returns {string};
 */
function censor(originalString) {
  return originalString.replace(censorRE, 'CENSORED');
}

module.exports = { censor };

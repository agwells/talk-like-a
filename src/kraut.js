const BW = '[      ]';
const EW = '[      .,;!?]';

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

/**
 * @type {[RegExp, (match: string) => string][]}
 */
const rules = rawRules.map(
  /**
   *
   * @param {[string, (match: string) => string]} param0
   * @returns {[RegExp, (match: string) => string]}
   */
  function([regex, replacer]) {
    return [new RegExp(`^${regex}`), replacer];
  },
);

/**
 *
 * @param {string} originalString
 */
function nyc(originalString) {
  let remaining = originalString;
  let out = '';

  // Simulate the way a Lex scanner would do things
  while (remaining.length > 0) {
    /**
     * @type {{match: string, replacer: (match: string) => string}}
     */
    let bestMatch = null;
    let bestMatchLength = 0;

    // Test every rule the remaining text, every time.
    // If multiple rules match, use the one with the longest matching text.
    // If there's a tie for longest matching text, use the rule that appears
    // higher up in the list of rules.
    rules.forEach(function([regex, replacer]) {
      const matches = remaining.match(regex);
      if (matches && matches[0].length > bestMatchLength) {
        bestMatch = { match: matches[0], replacer };
        bestMatchLength = matches[0].length;
      }
    });
    if (bestMatch === null) {
      // If there is no match for the current string, pass the first letter
      // through unchanged.
      out += remaining[0];
      remaining = remaining.slice(1);
    } else {
      remaining = remaining.slice(bestMatch.match.length);
      out += bestMatch.replacer(bestMatch.match);
    }
  }
  return out;
}

module.exports = nyc;

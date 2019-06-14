/**
 * Miscellaneous utility functions
 *
 * @copyright (c) Aaron Wells 2019
 * @author Aaron Wells
 */

/**
 * Generate a predictable but randomish number generator. Specifically, this is
 * the algorithm known as "MINSTD"
 *
 * @see https://en.wikipedia.org/wiki/Lehmer_random_number_generator#cite_ref-6
 * @description
 *
 * Inspired by https://gist.github.com/blixt/f17b47c62508be59987b
 *
 * Returns a rand() function that can be called repeatedly to get the same
 * sorta-random-seeming sequence of integers each time.
 *
 * @param {number} [initialSeed = 1]
 * @returns {() => number}
 */
function getRandFn(initialSeed = 1) {
  let curSeed = initialSeed;
  return function rand() {
    curSeed = (curSeed * 48271) % getRandFn.PSEUDO_RAND_MAX;
    return curSeed;
  };
}
getRandFn.PSEUDO_RAND_MAX = 0x7fffffff;

const STARTS_WITH_UPPER = new RegExp('^[A-Z]');

/**
 *
 * @param {string} letter
 */
function isUpperCase(letter) {
  return STARTS_WITH_UPPER.test(letter);
}

/**
 * A helper function equivalent to the "SSUB/SESUB" macro in the original. It creates
 * a regex replace callback method, which will make sure the replacement text
 * has the same initial capitalization as the original text.
 * @param {string} match
 * @param {string} replacement
 */
function sameCap(match, replacement) {
  if (STARTS_WITH_UPPER.test(match)) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  } else {
    return replacement[0].toLowerCase() + replacement.slice(1);
  }
}

/**
 * Creates a String.prototype.replace() callback method, which will make sure
 * the replacement text has the same initial capitalization as the original text.
 * (Equivalent to SSUB/SESUB macro in the Lexer based scripts)
 *
 * @param {string} replacement
 * @return {(match: string) => string}
 */
function sameCapReplacer(replacement) {
  const lowercaseReplacement =
    replacement[0].toLowerCase() + replacement.slice(1);
  const uppercaseReplacement =
    replacement[0].toUpperCase() + replacement.slice(1);
  return function(match) {
    if (STARTS_WITH_UPPER.test(match)) {
      return uppercaseReplacement;
    } else {
      return lowercaseReplacement;
    }
  };
}

/**
 *
 * @param {string} originalString
 * @param {[RegExp, (match: string, util: any) => string][]} rules
 * @param {any} extraUtils
 * @return {string}
 */
function simuLex(originalString, rules, extraUtils = {}) {
  let remaining = originalString;
  let out = '';
  const rand = getRandFn();

  // Simulate the way a Lex scanner would do things
  while (remaining.length > 0) {
    /**
     * @type {null | {match: string, replacer: (match: string, util: any) => string}}
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
      out += bestMatch.replacer(bestMatch.match, { rand, ...extraUtils });
    }
  }
  return out;
}

simuLex.preprocessRules =
  /**
   *
   * @param {[string, (match: string, util: any) => string][]} rawRules
   * @returns {[RegExp, (match: string, util: any) => string][]}
   */
  function(rawRules) {
    return rawRules.map(function([regex, replacer]) {
      return [new RegExp(`^${regex}`), replacer];
    });
  };

/**
 * Emulates perl's tr/// aka y/// "translate" operator.
 * @see https://perldoc.perl.org/perlop.html#Quote-Like-Operators
 * @param {string} initialString
 * @param {string} searchList
 * @param {string} replacementList
 */
function tr(initialString, searchList, replacementList) {
  return initialString
    .split('')
    .map((c) => {
      let k = searchList.indexOf(c);
      if (k === -1) {
        return c;
      } else {
        return replacementList.charAt(k);
      }
    })
    .join('');
}

module.exports = {
  getRandFn,
  isUpperCase,
  sameCap,
  sameCapReplacer,
  simuLex,
  tr,
};

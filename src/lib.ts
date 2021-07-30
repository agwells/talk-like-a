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
export function getRandFn(initialSeed = 1): () => number {
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
export function isUpperCase(letter: string): boolean {
  return STARTS_WITH_UPPER.test(letter);
}

/**
 * A helper function equivalent to the "SSUB/SESUB" macro in the original. It creates
 * a regex replace callback method, which will make sure the replacement text
 * has the same initial capitalization as the original text.
 * @param {string} match
 * @param {string} replacement
 */
export function sameCap(match: string, replacement: string): string {
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
export function sameCapReplacer(
  replacement: string
): (match: string) => string {
  const lowercaseReplacement =
    replacement[0].toLowerCase() + replacement.slice(1);
  const uppercaseReplacement =
    replacement[0].toUpperCase() + replacement.slice(1);
  return function (match) {
    if (STARTS_WITH_UPPER.test(match)) {
      return uppercaseReplacement;
    } else {
      return lowercaseReplacement;
    }
  };
}

type SimulexUtils = { rand: () => number };
export type SimulexReplacerFn<U extends {} = {}> = (
  match: string,
  util: U & SimulexUtils
) => string;
export type SimulexRule<U extends {} = {}> = [RegExp, SimulexReplacerFn<U>];
export type SimulexRawRule<U extends {} = {}> = [string, SimulexReplacerFn<U>];

/**
 * Simulates the operation of the Lex parser.
 * @param originalString
 * @param rules An array of `[RegExp, replacerFn] tuples. For any
 * string that matches the RegExp, it will transform it using the replacerFn.
 * The replaceFn will be passed a "util" object that contains a seeded prng,
 * and anything from `extraUtils`
 * @param extraUtils
 * @returns
 */
export function simuLex<U extends {} = {}>(
  originalString: string,
  rules: SimulexRule<U>[],
  extraUtils: U = {} as U
): string {
  let remaining = originalString;
  let out = '';
  const rand = getRandFn();

  // Simulate the way a Lex scanner would do things
  while (remaining.length > 0) {
    // Test every rule the remaining text, every time.
    // If multiple rules match, use the one with the longest matching text.
    // If there's a tie for longest matching text, use the rule that appears
    // higher up in the list of rules.
    const [, bestMatch] = rules.reduce(
      ([bestMatchLength, bestMatch], [regex, replacer]) => {
        const matches = remaining.match(regex);
        if (matches && matches[0].length > bestMatchLength) {
          bestMatch = { match: matches[0], replacer };
          bestMatchLength = matches[0].length;
        }
        return [bestMatchLength, bestMatch];
      },
      [
        0,
        null as null | {
          match: string;
          replacer: SimulexReplacerFn<U> | null;
        },
      ]
    );
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
   * Processes an array of partial regexp strings and replacer functions, into
   * instantiated RegExp objects and replacer functions.
   * @param {[string, (match: string, util: any) => string][]} rawRules
   * @returns {[RegExp, (match: string, util: any) => string][]}
   */
  function <U>(rawRules: SimulexRawRule<U>[]): SimulexRule<U>[] {
    return rawRules.map(function ([regex, replacer]) {
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
export function tr(
  initialString: string,
  searchList: string,
  replacementList: string
): string {
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

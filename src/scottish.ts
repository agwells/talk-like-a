/**
 * Fake scottish (dwarven) accent filter, by Adam Borowski, inspired by the
 * character "Durkon" from Order of the Stick by Rich Burlew.  GPL, 2007
 *
 * @copyright (c) 2007 Adam Borowski
 * @license GPL-3+
 * @author Aaron Wells
 */

/**
 * @type {[RegExp, string][]}
 */
const repl = [
  [/\byes\b/g, `aye`],
  [/there/g, `thar`],
  [/eir\b/g, `ar`],
  [/about/g, `aboot`],
  [/\bhe\b/g, `'e`],
  [/them/g, `'em`],
  [/\bhim/g, `'im`],
  [/out of\b/g, `outta`],
  [/of course/g, `'course`],
  [/\bof\b/g, `o'`],
  [/\band\b/g, `an'`],
  [/to\b/g, `ta`],
  [/tog/g, `tag`],
  [/that/g, `tha`],
  [/the/g, `tha`],
  [/wouldn't/g, `wouldn'ta`],
  [/cannot/g, `cannae`],
  [/can't/g, `cannae`],
  [/don't/g, `dinnae`],
  [/'re\b/g, `r`],
  [/for\b/g, `fer`],
  [/ver\b/g, `'er`],
  [/ber\b/g, `b'r`],
  [/every\b/g, `ev'ry`],
  [/en\b/g, `'n`],
  [/\bif\b/g, `if'n`],
  [/enl/g, `'nl`],
  [/eng/g, `'ng`],
  [/ing/g, `in'`],
  [/ment/g, `mn't`],
  [/\bes/g, `'s`],
  [/\bex/g, `'s`],
  [/\bnot\b/g, `na`],
  [/\bno\b/g, `nay`],
  [/n't have/g, `n'tve`],
  [/\bis\b/g, `be`],
  [/\bare\b/g, `be`],
  [/have/g, `haf`],
  [/abl/g, `'bl`],
  [/\byou\b/g, `ye`],
  [/\byour/g, `yer`],
  [/\byou'/g, `yer'`],
  [/noth/g, `nuth`],
  [/\bthis\b/g, `'tis`],
  [/\bhere/g, `'ere`],
  [/doesn't/g, `don't`],
  [/at a\b/g, `atta`],
  [/ith\b/g, `it'`],
  [/ered\b/g, `'red`],
  [/into\b/g, `inta`],
  [/\bbefore/g, `'fore`],
  [/wit' '/g, `wit '`],
  [/wit' t/g, `wit t`],
  [/wit' w/g, `wit w`],
  [/wit' y/g, `wit y`],
  [/get a/g, `git a`],
  [/ally\b/g, `'lly`],
  [/\bmy/g, `me`],
  [/\bi think\b/g, `methinks`],
  [/nay w/g, `na w`],
  [/\bone\b/g, `'un`],
  [/\b'un a/g, `one a`],
  [/at ta\b/g, `atta`],
  [/ot ta\b/g, `otta`],
  [/\bisn't\b/g, `ain't`],
  [/\bso th/g, `s'th`],
  [/ned\b/g, `n'd`],
  [/\bbecause/g, `'cause`],
].reduce(
  /**
   *
   * @param {[RegExp, string][]} acc
   * @param {[RegExp, string]} origRegex
   * @return {[RegExp, string][]}
   */
  function makeUpperCaseVariations(acc, origRegex) {
    const [regex, replaceWith] = origRegex;
    const variants = [origRegex];
    const regexText = regex.source;

    /**
     * @type {[RegExp, string]}
     */
    const initialUpper = [
      new RegExp(
        // TODO: replace with a lookbehind assertion once there's broader
        // browser support.
        regexText.replace(
          /^(\\b)?([a-z])/,
          (match, boundary, firstLetter) =>
            (boundary || '') + firstLetter.toUpperCase()
        ),
        'g'
      ),
      replaceWith.replace(/^.*?[a-z]/, (match) => match.toUpperCase()),
    ];
    variants.push(initialUpper);

    /**
     * @type {[RegExp, string]}
     */
    const allUpper = [
      new RegExp(
        // TODO: replace with a lookbehind assertion once there's broader
        // browser support.
        regexText
          .replace(/[a-z]/g, (match) => match.toUpperCase())
          .replace(/\\B/g, '\\b'),
        'g'
      ),
      replaceWith.replace(/[a-z]/g, (match) => match.toUpperCase()),
    ];
    variants.push(allUpper);

    return [...acc, ...variants];
  },
  []
);

/**
 *
 * @param {string} initialString
 */
function scottish(initialString) {
  return repl.reduce(
    (modString, [regex, replaceWith]) => modString.replace(regex, replaceWith),
    initialString
  );
}

module.exports = { scottish };

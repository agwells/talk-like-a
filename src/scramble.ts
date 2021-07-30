/**
 * Scramble the "inner" letters of each word in the input into a random order,
 * and output the result. Non-word (that is, non-alphabetical) characters, and
 * the first and last letters of each word, are left alone.
 *
 * @copyright (c) 2009-07-11 Andrew J. Buehler.
 * @license GPL-3+
 * @author Aaron Wells
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const getRandFn = require('./lib').getRandFn;

const all_one_letter = /^(.)\1*$/;

/**
 * randomly reorders all the letters of a string
 *
 * @param {string} toScramble
 * @param {() => number} rand
 */
function scramble_string(toScramble, rand) {
  if (all_one_letter.test(toScramble)) {
    return toScramble; // can't scramble a string which consists entirely of one letter!
  }
  let scrambled;
  do {
    let tmpstr = toScramble.split('');
    scrambled = [];
    while (tmpstr.length) {
      let i = rand() % tmpstr.length;
      scrambled.push(tmpstr[i]);
      tmpstr.splice(i, 1);
    }
  } while (toScramble === scrambled.join(''));

  return scrambled.join('');
}

/**
 *
 * @param {string} originalString
 * @return '';
 */
function scramble(originalString) {
  const rand = getRandFn();
  // Scramble the middle letters of words.
  // TODO: Use a lookbehind assertion here, once there's wider browser support
  return originalString.replace(
    /[A-Za-z][A-Za-z]{2,}(?=[A-Za-z])/g,
    (match) => match[0] + scramble_string(match.slice(1), rand)
  );
}

module.exports = { scramble };

/**
 * Swedish Chef filter. Bork Bork Bork!
 *
 * @copyright (c) 1999 Joey Hess
 * @license GPL-2+
 * @author Aaron Wells
 */

/**
 * Note that the order of the commands in this program is very important!
 *
 * @param {string} initialString
 * @returns {string}
 */
function chef(initialString) {
  // This whole function will be just a chain of
  // string.replace() calls.
  return (
    initialString

      // // Change 'e' at the end of a word to 'e-a', but don't mess with the word
      // // "the".
      .replace(/(\w+)e(\b)/g, function(whole, p1, p2) {
        if (p1.toLowerCase() === 'th') {
          return whole;
        } else {
          return `${p1}e-a${p2}`;
        }
      })

      // Stuff that happens at the end of a word.
      .replace(/en(\b)/g, 'ee$1')
      .replace(/th(\b)/g, 't$1')

      // Stuff that happens if not the first letter of a word.
      .replace(/(\w)f/g, '$1ff')

      // Change 'o' to 'u' and at the same time, change 'u' to 'oo'. But only
      // if it's not the first letter of the word.
      .replace(/[ou]/g, (match) => (match === 'o' ? 'u' : 'o'))
      .replace(/(\b)([ou])/g, (whole, p1, p2) => (p1 + p2 === 'o' ? 'u' : 'o'))
      // # Note that this also handles doubling "oo" at the beginning of words.
      .replace(/o/g, 'oo')
      // # Have to double "Oo" seperatly.
      .replace(/(\b)O(\w)/g, '$1Oo$2')
      // # Fix the word "bork", which will have been mangled to "burk"
      // # by above commands. Note that any occurrence of "burk" in the input
      // # gets changed to "boork", so it's completly safe to do this:
      .replace(/\b([Bb])urk\b/g, '$1ork')

      // # Stuff to do to letters that are the first letter of any word.
      .replace(/\be/g, 'i')
      .replace(/\bE/g, 'I')

      // # Stuff that always happens.
      .replace(/tiun/g, 'shun') // this actually has the effect of changing "tion" to "shun".
      .replace(/the/g, 'zee')
      .replace(/The/g, 'Zee')
      .replace(/[vVwW]/g, (match) => {
        switch (match) {
          case 'v':
            return 'f';
          case 'V':
            return 'F';
          case 'w':
            return 'v';
          case 'W':
            return 'V';
        }
      })

      // # Stuff to do to letters that are not the last letter of a word.
      .replace(/a(?!\b)/g, 'e')
      .replace(/A(?!\b)/g, 'E')

      .replace(/en/g, 'un') // this actually has the effect of changing "an" to "un".
      .replace(/En/g, 'Un') // this actually has the effect of changing "An" to "Un".
      .replace(/eoo/g, 'oo') // this actually has the effect of changing "au" to "oo".
      .replace(/Eoo/g, 'Oo') // this actually has the effect of changing "Au" to "Oo".

      // # Change "ow" to "oo".
      .replace(/uv/g, 'oo')

      // # Change 'i' to 'ee', but not at the beginning of a word,
      // # and only affect the first 'i' in each word.
      .replace(/(\b\w[a-hj-zA-HJ-Z]*)i/g, '$1ee')

      // # Special punctuation of the end of sentances but only at end of lines.
      .replace(/([.?!])$/gm, '$1\nBork Bork Bork!')
  );
}

module.exports = { chef };

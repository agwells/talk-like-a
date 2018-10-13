// Swedish Chef filter. Bork Bork Bork!
// Copyright 1999 by Joey Hess under the terms of the GNU GPL.

/**
 * Note that the order of the commands in this program is very important!
 *
 * @param {string} initialString
 * @returns {string}
 */
function chef(initialString) {
	// This whole function will be just a chain of
	// string.replace() calls.
	return initialString

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
	.replace(/o|u/g, ou => ou === 'o' ? 'u' : 'o')
	.replace(/(\b)([uo])/g, (whole, p1, p2) => p1 + p2 === 'o' ? 'u' : 'o')
	// # Note that this also handles doubling "oo" at the beginning of words.
	.replace('o', 'oo')
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
	.replace('tiun', 'shun') // this actually has the effect of changing "tion" to "shun".
	.replace('the', 'zee')
	.replace('The', 'Zee')
	.replace('v', 'f')
	.replace('V', 'F')
	.replace('w', 'v')
	.replace('W', 'V')

	// # Stuff to do to letters that are not the last letter of a word.
	.replace(/a(?!\b)/g, 'e')
	.replace(/A(?!\b)/, 'E')

	.replace('en', 'un') // this actually has the effect of changing "an" to "un".
	.replace('En', 'Un') // this actually has the effect of changing "An" to "Un".
	.replace('eoo', 'oo') // this actually has the effect of changing "au" to "oo".
	.replace('Eoo', 'Oo') // this actually has the effect of changing "Au" to "Oo".

	// # Change "ow" to "oo".
	.replace('uv', 'oo')

	// # Change 'i' to 'ee', but not at the beginning of a word,
	// # and only affect the first 'i' in each word.
	.replace(/(\b\w[a-hj-zA-HJ-Z]*)i/g, '$1ee')

	// # Special punctuation of the end of sentances but only at end of lines.
	.replace(/([.?!])$/gm, '$1\nBork Bork Bork!')
}
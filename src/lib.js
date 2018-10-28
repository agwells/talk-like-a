/**
 * Generate a predictable but randomish number generator. Specifically, this is
 * the algorithm known as "MINSTD"
 * @see https://en.wikipedia.org/wiki/Lehmer_random_number_generator#cite_ref-6
 *
 * Inspired by https://gist.github.com/blixt/f17b47c62508be59987b
 *
 * Returns a rand() function that can be called repeatedly to get the same
 * sorta-random-seeming sequence of integers each time.
 *
 * @returns {function(): number}
 */
function getRandFn() {
  let seed = 1;
  return function rand() {
    seed = (seed * 48271) % 0x7fffffff;
    return seed;
  };
}

module.exports = { getRandFn };

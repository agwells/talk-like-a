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
 * @param {number} [seed = 1]
 * @returns {function(): number}
 */
function getRandFn(seed = 1) {
  return function rand() {
    seed = (seed * 48271) % getRandFn.PSEUDO_RAND_MAX;
    return seed;
  };
}
getRandFn.PSEUDO_RAND_MAX = 0x7fffffff;

module.exports = { getRandFn };

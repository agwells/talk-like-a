/**
 * jibberish -- run filters in random order
 *
 * @copyright (c) 1999 Joey Hess
 * @license GPL-2+
 * @author Aaron Wells
 */
const { getRandFn } = require('./lib');

const { eleet } = require('./eleet');
const { b1ff } = require('./b1ff');
const { chef } = require('./chef');
const { jethro } = require('./jethro');
const { upsidedown } = require('./upsidedown');
const { klaus } = require('./klaus');
const { cockney } = require('./cockney');
const { pirate } = require('./pirate');
const { nyc } = require('./nyc');
const { ken } = require('./ken');
const { ky00te } = require('./ky00te');
const { rasterman } = require('./rasterman');
const { newspeak } = require('./newspeak');
const { studly } = require('./studly');
const { censor } = require('./censor');
const { spammer } = require('./spammer');

/**
 *
 * @param {string} originalString
 * @returns {string}
 */
function jibberish(originalString) {
  const rand = getRandFn();

  const all = [
    eleet,
    b1ff,
    chef,
    jethro,
    upsidedown,
    klaus,
    cockney,
    pirate,
    nyc,
    ken,
    ky00te,
    rasterman,
    newspeak,
    studly,
    censor,
    spammer,
  ];

  // # shuffle order
  // #srand;
  for (let i = 0; i < all.length; i++) {
    const n = rand() % all.length;
    const was = all[i];
    all[i] = all[n];
    all[n] = was;
  }

  // # start the pipe...
  const mutators = all.slice(0, 4 + (rand() % 5));

  return originalString
    .split(/\n(?!$)/)
    .map((line) => mutators.reduce((newLine, fn) => fn(newLine), line))
    .join('\n');

  // # This could be optimized: take the last program off the pipeline,
  // # open the pipeline as standard input, then exec that last program.
  // #
  // # But you have to ask yourself: how important is it to optimize
  // # the generation of jibberish?
}
module.exports = { jibberish };

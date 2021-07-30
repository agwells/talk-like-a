/**
 * jibberish -- run filters in random order
 *
 * @copyright (c) 1999 Joey Hess
 * @license GPL-2+
 * @author Aaron Wells
 */
import { getRandFn } from './lib';

import { eleet } from './eleet';
import { b1ff } from './b1ff';
import { chef } from './chef';
import { jethro } from './jethro';
import { upsidedown } from './upsidedown';
import { klaus } from './klaus';
import { cockney } from './cockney';
import { pirate } from './pirate';
import { nyc } from './nyc';
import { ken } from './ken';
import { ky00te } from './ky00te';
import { rasterman } from './rasterman';
import { newspeak } from './newspeak';
import { studly } from './studly';
import { censor } from './censor';
import { spammer } from './spammer';

/**
 *
 * @param {string} originalString
 * @returns {string}
 */
export function jibberish(originalString: string): string {
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

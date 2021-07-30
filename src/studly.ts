/**
 * stUdLy cAPs, after emacs studly.el -- the commented line is just
 * to remind diehards how it *should* be done ;)
 *
 * @copyright (c) Nick Phillips <nwp@lemon-computing.com>
 * @license "Just for reference, you may do whatever you like with this file."
 * @author Aaron Wells
 */

import { isUpperCase } from './lib';

/**
 *
 * @param {string} initialString
 */
export function studly(initialString: string): string {
  return initialString
    .split('')
    .map((c, offset) => {
      if (offset % 4 !== 2) {
        return c;
      } else {
        return isUpperCase(c) ? c.toLowerCase() : c.toUpperCase();
      }
    })
    .join('');
}

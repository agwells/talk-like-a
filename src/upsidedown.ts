/**
 * Flips text upside down. Stand on your head and squint to read the output.
 *
 * @copyright (c) 2000 Joey Hess <joey@kitenet.net>
 * @license GPL-2+
 * @author Aaron Wells
 */
import { tr } from './lib';

/**
 *
 * @param {string} initialString
 */
export function upsidedown(initialString: string): string {
  return tr(
    initialString.split('').reverse().join('').replace(/"/g, `''`),
    '[]{}<>()' +
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz' +
      '123456789' +
      ",!.?`'",
    '][}{><)(' +
      'V8)d3j9HIfK7WNOdbjS+nAMXhZ' +
      'eq)paj6y!fk7wuodbjsfn^mxhz' +
      'l2Eh59L86' +
      "`i'%,,"
  )
}

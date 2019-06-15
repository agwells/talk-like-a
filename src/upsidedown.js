/**
 * Flips text upside down. Stand on your head and squint to read the output.
 *
 * @copyright (c) 2000 Joey Hess <joey@kitenet.net>
 * @license GPL-2+
 * @author Aaron Wells
 */
const tr = require('./lib').tr;

/**
 *
 * @param {string} initialString
 */
function upsidedown(initialString) {
  return tr(
    // TODO: This is a redundant split and re-join, because tr's going to do
    // that too.
    initialString
      .toLowerCase()
      .split('\n')
      .map((line) =>
        line
          .split('')
          .reverse()
          .join('')
      )
      .join('\n')
      .replace(/"/g, `''`),
    '[]{}<>()' + 'abcdefghijklmnopqrstuvwxy' + '123456789' + ",!.?`'",
    '][}{><)(' + 'eq)paj6y!fk7wuodbjsfn^mxh' + 'l2Eh59L86' + "`i'%,,"
  ).replace(/k/g, '>|');
}

module.exports = { upsidedown };

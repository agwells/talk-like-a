/**
 * stUdLy cAPs, after emacs studly.el -- the commented line is just
 * to remind diehards how it *should* be done ;)
 *
 * @copyright Nick Phillips <nwp@lemon-computing.com>
 * @author Aaron Wells
 */

const isUpperCase = require('./lib').isUpperCase;

/**
 *
 * @param {string} initialString
 */
function studly(initialString) {
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

module.exports = { studly };

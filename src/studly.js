// # stUdLy cAPs, after emacs studly.el -- the commented line is just
// # to remind diehards how it *should* be done ;)
// #
// # just for reference, you may do whatever you like with this file.
// #
// # -- nwp@lemon-computing.com

// for (my $offset = 0; defined(my $c = getc); $offset++) {
//     (($c + $offset) % 4) != 2 and print($c) or $c =~ tr/[A-Za-z]/[a-zA-Z]/, print $c;
// }

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

module.exports = studly;

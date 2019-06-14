/**
 * Elmer Fudd
 *
 * @copyright (c) 2001 Joey Hess
 * @license GPL-2+
 * @author Aaron Wells
 */

function fudd(initialString) {
  return initialString
    .replace(/[rl]/g, 'w')
    .replace(/qu/g, 'qw')
    .replace(/th\b/g, 'f')
    .replace(/th\B/g, 'd')
    .replace(/n\./g, 'n, uh-hah-hah-hah.')
    .replace(/[RL]/g, 'W')
    .replace(/Qu/g, 'Qw')
    .replace(/QU/g, 'QW')
    .replace(/TH\b/g, 'F')
    .replace(/TH\B/g, 'D')
    .replace(/Th/g, 'D')
    .replace(/N\./g, 'N, uh-hah-hah-hah.');
}

module.exports = { fudd };

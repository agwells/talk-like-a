/**
 * nethackify
 * tries to write text ala nethack
 *
 * Wiped out text like can be found in nethack.
 *
 * @copyright (c) 2004 G�kan Seng� <gurkan@linuks.mine.nu>
 * @license GPL-2
 * @author Aaron Wells
 */
const getRandFn = require('./lib').getRandFn;

const NORMAL__ = 'ABCDEFGHIKLMNOPQRTUVWZbdeghjklmnoqwy:;01678';
const NETHACK1 = '^P(|||C||||||CFCP|J/V/|cccni||nrccvv.,C|o/3';
const NETHACK2 = '?b?)F-(-?<_??(?(F???/??|??????r???????(???o';
const NETHACK3 = ' [ [L       \\                              ';
const NETHACK4 = '    [              \\                       ';
const NETHACK5 = '    _               \\                      ';

/**
 *
 * @param {string} str
 */
function nethackify(str) {
  const modStr = str.split('');
  const myrandom = getRandFn(1);
  for (let i = 0; i < modStr.length; i++) {
    for (let c = 0; c < NORMAL__.length; c++) {
      if (NORMAL__[c] === modStr[i]) {
        switch (myrandom() % 5) {
          case 4:
            if (NETHACK5[c] != ' ') modStr[i] = NETHACK5[c];
          case 3:
            if (NETHACK4[c] != ' ') modStr[i] = NETHACK4[c];
          case 2:
            if (NETHACK3[c] != ' ') modStr[i] = NETHACK3[c];
            break;
          case 1:
            if (NETHACK2[c] != ' ') modStr[i] = NETHACK2[c];
            break;
          case 0:
            modStr[i] = NETHACK1[c];
            break;
          default:
            break;
        }
      }
    }
  }
  return modStr.join('');
}

module.exports = { nethackify };

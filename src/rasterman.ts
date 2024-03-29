/**
 * Makes text look like it came from the keyboard of Carsten Haitzler.
 *
 * @copyright (c) 1997 Zachary Beane
 * @license GPL-2
 * @author Aaron Wells
 */
import { getRandFn } from './lib';

const $row = '!qwertyuiop!asdfghjkl!zxcvbnm!';

/**
 *
 * @param {string} originalString
 * @returns {string}
 */
export function rasterman(originalString: string): string {
  const rng = getRandFn();
  const fakeRand = () => (rng() % 100) / 100;

  function swap($aref: string[], $n: number, $m: number) {
    if (
      $n >= 0 &&
      $n < $aref.length &&
      $m >= 0 &&
      $m < $aref.length &&
      $aref[$n].match(/[a-z ]/) !== null &&
      $aref[$m].match(/[a-z ]/) !== null
    ) {
      let $tmp = $aref[$n];
      $aref[$n] = $aref[$m];
      $aref[$m] = $tmp;
    }
  }

  function insert_adjacent(
    $aref: string[],
    $pos: number,
    $let: string
  ): number {
    let $newlet = get_adjacent($let);

    if (!$newlet) {
      return 0;
    }

    $aref.splice($pos + 1, 0, $newlet);
    return 1;
  }

  function get_adjacent($let: string): string | false {
    if ($let.match(/[a-z]/) === null) {
      return false;
    }

    let $i = $row.indexOf($let);
    let $before = $row[$i - 1];
    let $after = $row[$i + 1];

    if ($before === '!' || (fakeRand() < fakeRand() && $after !== '!')) {
      return $after;
    } else {
      return $before;
    }
  }

  return originalString
    .split('\n')
    .map((originalLine) => {
      let line = originalLine
        .toLowerCase()
        .replace(/\byou\b/g, 'u')
        .replace(/\bpeople\b/g, 'ppl')
        .replace(/\bthrough\b/g, 'thru')
        .replace(/\bthough\b/g, 'tho')
        .replace(/\bnope\b/g, 'nup')
        .replace(/\baustralia\b/g, 'oz')
        .replace(/\bfilm\b/g, 'flim')
        .replace(/\bsucks\b/g, 'sux')
        .replace(/\benough\b/g, 'enuff')
        .replace(/\ba lot\b/g, 'a shitload')
        .replace(/\bstuff\b/g, 'shit')
        .replace(/, /g, '.. ')
        .replace(/\.$/g, '...');
      let $lets = line.split('');
      let $strlen = line.length - 1;
      for (let $x = 0; $x < $strlen; $x++) {
        if (fakeRand() < 0.01) {
          swap($lets, $x, $x + 1);
          continue;
        }
        if (fakeRand() < 0.1 && $lets[$x] === ' ') {
          swap($lets, $x - 1, $x - 2);
          continue;
        }
        if (fakeRand() < 0.01) {
          const $i = insert_adjacent($lets, $x, $lets[$x]);
          $strlen += $i;
          continue;
        }
        if (fakeRand() < 0.01) {
          $lets.splice($x, 1);
          $strlen--;
          continue;
        }
      }
      return $lets.join('');
    })
    .join('\n');
}

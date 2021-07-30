/**
 * translate from and to KennySpeak
 * Licensed unter the Artistic License:
 * http://www.perl.com/language/misc/Artistic.html
 *
 * @copyright (c) 2001, 2002 Christian Garbs <mitch@cgarbs.de>, http://www.cgarbs.de
 *                  Alan Eldridge <alane@geeksrus.net>
 * @author KennySpeak invented by Kohan Ikin <syneryder@namesuppressed.com>
 *                        http://www.namesuppressed.com/kenny/
 * @license Artistic
 * @author Aaron Wells
 */
import { tr } from './lib';

// ##### Generate KennySpeak encoding table
function generateKenny() {
  let $kenny: Record<string, string> = {};

  let $a: number, $b: number, $c: number;
  $a = $b = $c = 0;
  'abcdefghijklmnopqrstuvwxyz'.split('').forEach(($char) => {
    let $foo = tr(`${$a}${$b}${$c}`, '012', 'mpf');
    // # lower case characters
    $kenny[$char] = $foo;
    // # upper case characters
    $kenny[$char.toUpperCase()] = $foo[0].toUpperCase() + $foo.slice(1);
    $c++;
    if ($c == 3) {
      $c = 0;
      $b++;
      if ($b == 3) {
        $b = 0;
        $a++;
      }
    }
  });

  return $kenny;
}

const kennyTranslationTable = generateKenny();

/**
 *
 * @param {string} originalString
 * @returns {string}
 */
export function kenny(originalString: string): string {
  return originalString.replace(
    /[a-zA-Z]/g,
    (match) => kennyTranslationTable[match]
  );
}

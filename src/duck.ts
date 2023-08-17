/**
 * Duck filter.
 *
 * @copyright 2023 Aaron Wells
 * @license Public domain
 * @author Aaron Wells
 */

import { sameCap } from './lib';

export function duck(initialString: string): string {
  return initialString.replace(/[a-zA-Z]+/g, (match) =>
    sameCap(match, match.length <= 3 ? 'qua' : 'quack')
  );
}

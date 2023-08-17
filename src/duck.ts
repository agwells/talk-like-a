/**
 * Duck filter.
 * 
 * @copyright 2023 Aaron Wells
 * @license Public domain
 * @author Aaron Wells
 */

import { sameCap } from './lib';

export function duck(initialString: string): string {
    return initialString.split(' ').map(word => sameCap(word, 'quack')).join(' ');
}
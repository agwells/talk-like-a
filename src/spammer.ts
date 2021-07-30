/**
 * Talk like a spammer.
 *
 * Doesn't always generate proper engrish, but then neither do
 * spammers.
 *
 * Licensed under the GPL.
 *
 * @copyright (c) 2002 Joey Hess <joeyh@debian.org>
 * @license GPL-2+
 * @author Aaron Wells
 */
const { getRandFn } = require('./lib');

/**
 *
 * @param {string} originalString
 */
function spammer(originalString) {
  const prng = getRandFn();
  const rand = (max) => {
    const seed = prng();
    return max === 0 ? 0 : seed % max;
  };

  function randPct() {
    return (prng() % 100) / 100;
  }

  /**
   *
   * @param {...string} strings
   */
  function oneOf(...strings) {
    return strings[rand(strings.length)];
  }

  /**
   *
   * @param {string} str
   */
  function line_of_yelling(str) {
    const $lines = str.split('\n');
    const $n = rand($lines.length);
    $lines[$n] = $lines[$n].toUpperCase();
    return $lines.join('\n');
  }

  function for_free() {
    return (
      oneOf('100%', 'completely', 'totally', 'absolutely') +
      ' ' +
      oneOf('f', 'F') +
      'ree'
    );
  }

  let $hits = 0;
  let $spam = '';

  if (randPct() > 0.75) {
    $hits++;
    $spam += 'Dear Friend, ';
  } else if (randPct() > 0.9) {
    $hits++;
    $spam +=
      'Below is the result of your feedback form' +
      oneOf(':', '.', '..') +
      '\n';
  } else if (randPct() > 0.75) {
    $hits++;
    $spam += 'This message is not spam!\n';
  }

  /**
   * @type {[RegExp, string|((...match: string[]) => string)][]}
   */
  const replacers = [
    [
      /^(Subject:\s+.*)/g,
      (...match) => match[1] + ' '.repeat(rand(20) + 40) + rand(1000000),
    ],
    [/free\b/gi, for_free],
    [
      /(email|message|e-mail|mail)\b/i,
      `$1 (sent in compliance with regulations)`,
    ],
    [/(join|register|order|apply)/gi, `$1 today`],
    [/money/i, `big bucks`],
    [/check\b/i, `check or money order`],
    [/(amazing|atonishing|neat|interesting)/gi, `AMAZING`],
    [/guarantee\b/gi, `GUARANTEE`],
    [/(profits|money)/gi, `PROFITS`],
    [
      /(no questions asked|quiet|confidential|secret)\b/gi,
      `NO QUESTIONS ASKED`,
    ],
    [/refund\b/i, `full refund`],
    [/free\b/gi, `FREE`],
    [/\b(full|complete|fully)\b/gi, `100% GUARANTEED`],
    [/(spam|UCE)\b/gi, () => oneOf('bulk', 'direct', 'mass') + ' email'],
    [/spammer/gi, `businessman`],
    [/(call|phone|contact)\b/gi, `CALL NOW`],
    [/business\b/gi, `online business`],
    [/online\b/gi, `online business opportunities`],
    [/number\b/gi, `social security number`],
    [/addresses\b/gi, `addresses on cd`],
    [/cdrom\b/gi, `addresses on cd`],
    [/click\b/gi, `click here`],
    [/viagra/gi, () => oneOf('VIAGRA', 'natural viagra', 'herbal viagra')],
    [/\btraffic\b/gi, () => (randPct() > 0.6 ? 'more web traffic' : 'traffic')],
    [/targeted/gi, `targeted traffic`],
    [/limited/gi, `LIMITED TIME OFFER`],
    [/buy\b/gi, `buy direct`],
    [/profit\b/gi, `PURE PROFIT`],
    [/opportunity/gi, `once in a lifetime opportunity`],
    [/stock\b/gi, `STOCK PICK`],
    [/access\b/gi, `INSTANT ACCESS`],
    [/(diploma|credential)s?/gi, `college diploma$a`],
    [/(penis|breast)/gi, `larger $1`],
    [/\b(work|job)\b/gi, `home employment`],
    [/experience\b/gi, `no experience needed!`],
    [/printer\b/gi, `printer (toner cartridge)`],
    [/(income|money|savings?)\b/gi, `you income`],
    [/(amazing|amazed|atonished|interesting)/gi, `be amazed`],
    [/(\$\d+\.?\d*)/gi, `for only $1!`],
    [/natural/gi, `completly natural`],
    [/obligation/gi, `no obligation`],
    [/vacation\b/gi, () => oneOf('dream', 'special', 'free') + ' vacation'],
    [/sign up\b/gi, `sign up today`],
    [/cell (phone)?\b/gi, `free cell phone`],
    [
      /(offer|trial|membership|website|quote|installation|sample|dvd|preview|leads)\b/gi,
      `free $1`,
    ],
    [/\bvalue/gi, `outstanding value`],
    [/shipping/gi, `shopping spree`],
    [/winning/gi, `WINNING`],
    [/winner\b/gi, `WINNER`],
    [/promotion\b/gi, `special promotion`],
    [/password\b/gi, `free password`],
    [/\bcash\b/gi, `extra cash`],
    [/cancel\b/gi, `cancel at any time`],
    [/\bearn\b/gi, `earn up to`],
    [
      /(movies|pics|photos|videos)/gi,
      (match) =>
        oneOf('hundreds', 'thousands', 'millions', 'tons') + ' of ' + match,
    ],
    [/\bporn\b/gi, `free porn`],
    [
      /\blegal\b/gi,
      () => oneOf('absolutely', 'perfectly', 'totall', '100%') + ' legal',
    ],
    [/(drugs|medications|pharmacy)/gi, `online $1`],
    [/asset/gi, `hidden asset`],
    [/\bsave\b/gi, `save thousands`],
    [/partner/gi, `marketing partner`],
    [/unlimited/gi, `UNLIMITED`],
    [/\bprice\b/gi, `low price`],
    [/galleries\b/gi, `huge galleries`],
    // 		# Convert phone numbers to 800 numbers.
    [
      /(?:(?:1-)?[0-9]{3}-)?([0-9]{3}-[0-9]{4})/g,
      (...matches) => '1-' + oneOf('800', '888') + '-' + matches[1],
    ],
    // 		# de-http:// urls
    [/http:\/\//gi, ``],
  ];

  // An array to keep track of which replacers get used.
  const results = replacers.map(() => 0);
  $spam += originalString
    // Simulate perl's "while (<>)"; drop the last empty string if the input
    // ends with a "\n"
    .split(/\n(?!$)/)
    .map((line) => {
      let lineSoFar = line;
      replacers.forEach((replacer, i) => {
        // @ts-ignore
        const changedLine = lineSoFar.replace(replacer[0], replacer[1]);
        if (changedLine !== lineSoFar) {
          results[i] = 1;
          lineSoFar = changedLine;
        }
      });

      // 	# Cute things that don't cause real hits.
      lineSoFar = lineSoFar.replace(
        /\.(com|org|net|edu)\b/gi,
        () => '.' + oneOf('info', 'biz', 'name')
      );
      if (randPct() > 0.66) {
        lineSoFar = lineSoFar.replace(
          /([Ee])nglish/g,
          (...matches) => matches[1] + `ngrish`
        );
      }
      return lineSoFar;
    })
    .join('\n');

  $hits += results.filter((x) => x > 0).length;

  if (randPct() > 0.5) {
    // # random line breaks make spam look
    // # more professional
    // # or is it just written in Notepad?
    $spam = $spam.replace(/ /g, () => (randPct() > 0.95 ? '\n' : ' '));
  } else if (randPct() > 0.75) {
    // # I write my spam in MS WORD!
    $spam = $spam.replace(/\n/g, ' ');
  } else {
    $spam = line_of_yelling($spam);
  }

  if (randPct() > 0.8 || $hits < 5) {
    $spam +=
      '\nThis is a ' +
      oneOf('one', '1') +
      ' time ' +
      oneOf('email', 'e-mail', 'offer') +
      oneOf('!', '.');
    $hits++;
  }

  if (randPct() > 0.7 || $hits < 5) {
    $spam +=
      '\n' +
      oneOf('-'.repeat(78), '~'.repeat(70), '---', '', '', '', '\n\n\n\n') +
      '\n' +
      oneOf(
        'To remove your address from ',
        'To be removed from',
        'To get off from',
        'To unsubscribe from',
        'To receive no further notices on',
        'If you did not opt in for',
        'To be removed from future mailings to'
      ) +
      ' ' +
      oneOf('this mailing list', 'these mails') +
      ' ' +
      oneOf('please ', '') +
      oneOf('reply', 'send an email', 'write back') +
      ' ' +
      oneOf('with a subject of', 'and put in the subject the word') +
      ' ' +
      oneOf('REMOVE', '"remove"') +
      oneOf('!', '.', '.') +
      '\n';
    $hits++;
  }

  // # Desperate to make it look like a spam now, I insert arbitrary
  // # junk.
  while ($hits < 5) {
    if (randPct() > 0.66) {
      $spam = line_of_yelling($spam);
      $hits++;
    } else if (randPct() > 0.5) {
      // # Insert a spam phrase after the end of a sentence.
      const spam_phrases = [
        'FREE CONSULATATION',
        'INSTANT ACCESS',
        'PURE PROFIT',
        'STOCK PICK',
        'VIAGRA',
        'WINNER',
        'WINNING',
        'LIMITED TIME OFFER',
        'extra cash',
        'CALL NOW',
        'Once in a lifetime opportunity',
        'Cancel at any time',
        'No experience needed',
        'No obligation',
        'Save millions',
        'Be amazed',
        for_free().replace(/^[a-z]/, (match) => match.toUpperCase()),
      ];
      $spam = $spam.replace(/\.\s+([A-Z])/s, (...matches) => {
        $hits++;
        return '. ' + oneOf(...spam_phrases) + '! ' + matches[1];
      });
    } else if (randPct() > 0.75) {
      // # large hexadecimal block
      const hex = 'ABCDEF0123456789';
      const end = rand(9) + 70;
      for (let i = 1; i <= end; i++) {
        $spam += hex[rand(16)];
      }
      $spam += '\n';
      $hits++;
    } else if (randPct() > 0.75) {
      $spam += oneOf('SSPLTM ', '{%RAND%} ');
      $hits++;
    }
  }

  $spam = $spam.replace(/\n/g, '\r\n');
  return `${$spam}\n`;
}

module.exports = { spammer };

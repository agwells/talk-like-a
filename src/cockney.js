/**
 * Lex filter to transform plain English into Cockney English.
 * No racial or societal slurs are intended.  For amusement only.
 *
 * Reproduction permitted so long as this notice is retained.
 *
 * @copyright (c) 1986 Daniel Klein.
 * @license GPL
 * @author Aaron Wells
 */

const { getRandFn } = require('./lib.js');

/**
 *
 *
 * @param {string} initialString
 * @return {string}
 */
function cockney(initialString) {
  const I_rand = getRandFn();
  function I() {
    if (I_rand() % 5 === 1) {
      return 'Oy';
    } else {
      return 'I';
    }
  }

  let b_count = 0;
  let b_which = 0;
  function bloody() {
    if (b_count++ % 2 === 0) {
      switch (b_which++ % 4) {
        case 0:
          return ' bloody';
        case 1:
          return " flinkin'";
        case 2:
          return " bleedin'";
        case 3:
          return " soddin'";
      }
    }
    return '';
  }

  const dintI_rand = getRandFn();

  /**
   * Every other sentence that contains "I/we went/had/did", tag "..., didn't I/we?"
   * on the end.
   *
   * @param {number} offset
   * @param {string} fullstring
   * @returns
   */
  function dintI(offset, fullstring) {
    let sentence = fullstring
      .substr(0, offset + 1)
      .match(/(?:^|(?:\w|')[.?])([^.?]+)$/);

    if (sentence && sentence.length && sentence[1]) {
      let sentenceStr = sentence[1].trim();

      // Find out if the sentence contains an "I" phrase
      /** @type {false | string} */
      let iOrWe = false;
      const indexOfI = sentenceStr.search(/\b(I|Oy) did\b/);
      if (indexOfI !== -1) {
        iOrWe = 'I';
      }
      // Find out if the sentence contains a "we" phrase.
      // If it has both "I" and "we", then use whichever came first
      // in the sentence (because that's most likely to be the subject
      // of the sentence's action, so it makes the most sense for it to
      // agree with the final phrase.)
      const indexOfWe = sentenceStr.search(/\b[Ww]e\s(?:went|had|did)\b/);
      if (indexOfWe !== -1 && (!iOrWe || indexOfWe < indexOfI)) {
        iOrWe = 'we';
      }
      if (iOrWe && dintI_rand() % 2 === 0) {
        // Find the full text of the preceeding sentence.

        switch (iOrWe) {
          case 'I':
            return ", didn'I?";
          case 'we':
            return ", din't we?";
        }
      }
    }
    return '.';
  }

  const pooped_rand = getRandFn();
  function pooped() {
    switch (pooped_rand() % 3) {
      case 0:
        return 'knackered';
      case 1:
        return 'shagged out';
      default:
        return 'done in';
    }
  }

  return (
    initialString
      // Half the time, insert a mild swear after "the"
      .replace(/\b[Tt]he\b/g, (match) => `${match}${bloody()}`)
      // steal => nick
      .replace(/\bSteal\b/g, 'Nick')
      .replace(/\bsteal\b/g, 'nick')
      // stole => nicked
      .replace(/\bStole\b/g, 'Nicked')
      .replace(/\bstole\b/g, 'nicked')
      // tired => (slang)
      .replace(/\btired\b/g, () => pooped())
      // You see => Y'see
      .replace(/([Yy])ou\s+(?=[^aeiouy])/g, "$1'")
      // and => 'n'
      .replace(/\band\b/g, "'n'")
      // were/was => wuz
      .replace(/\b(?:were|was)\b/g, 'wuz')
      // hello => 'ullo
      .replace(/Hello/g, "'Ullo")
      .replace(/hello/g, "'ullo")
      // h- => '-
      .replace(/\b[Hh]/g, "'")
      // your => yer
      .replace(/\b([Yy])our\b/g, '$1er')
      // it => i'
      .replace(/\bit\b/g, "i'")
      // go => gow
      .replace(/\bgo\b/g, 'gow')
      // my => me
      .replace(/\bmy\b/g, 'me')
      // this/that
      .replace(/\b(?:this|that)\b/g, '$&')
      // I went/had/did => I did
      .replace(/\bI\s(?:went|had|did)\b/g, () => 'I did')
      // I => Oy (sometimes)
      .replace(/\bI\b/g, () => I())
      // What are => Wotta (eos)
      .replace(/([Ww])hat\s+are\b/g, '$1otta')
      // -other => -uvver
      .replace(/(\b|[MmNnRr])other/g, '$1uvver')
      // mouth/south => mouf/souf
      .replace(/([MmSs])outh/g, '$1owf')
      // couth/youth => coof/yoof
      .replace(/([cYy])outh/, '$1oof')
      // -uth => -uf
      .replace(/([^o]u)th/g, '$1f')
      // th- => f- (except "this", "that", and "the-")
      .replace(/\bth(?!e|is\b|at\b)/g, 'f')
      // ath/eth/ith/oth => af/ef/if/of
      .replace(/([AaEeIiOo])th(?![em])/g, '$1f')
      // oothe => oove
      .replace(/oothe/g, 'oove')
      // eithe/eethe => eeve
      .replace(/e[ei]the/g, 'eeve')
      // ooth/eeth => oof/eef
      .replace(/(oo|ee)th/g, '$1f')
      // athe/ethe/ithe => avve/evve/ivve
      .replace(/([aei])the/g, '$1vve')
      // th => v (except "this", "that", and "the")
      .replace(/\Bth|\bth(?!(e|at|is)\b)/g, 'v')
      // -ime => -oime
      .replace(/ime\b/g, 'oime')
      // -ake/-ame => -ike/-ime
      .replace(/a([km])e\b/g, 'i$1e')
      // -old- => -owld-
      .replace(/([^r][Oo])ld/g, '$1wld')
      // -ond-/-und- => -unn-
      .replace(/([^AaEeIiOoUu])[uo]nd\B/g, '$1unn')
      // -ing => -in' (eos)
      .replace(/ing\b/g, "in'")
      // getter -> ge'er
      .replace(/([^dg])get+(?!h)/g, "$1ge'")
      // ail => aiw
      .replace(/ail/g, 'aiw')
      // any => enny
      .replace(/any/g, 'enny')
      // -ray/-say => -righ/-sigh
      .replace(/([rSs])ay\b/g, '$1igh')
      // way => why
      .replace(/way/g, 'why')
      // -bit/-hit => -bi'/-hi'
      .replace(/([BbHh])it\b/g, "$1i'")
      // -ait => -ite
      .replace(/ait\b/g, 'ite')
      // -ize- => -oize-
      .replace(/([^e])ize(?!n)/g, '$1oize')
      // -ight => -oit
      .replace(/([^e])ight/g, '$1oit')
      // (sentence)? -> (sentence), roit?
      .replace(/(\w|')\?/g, (match, p1) => {
        return p1 + ', roit?';
      })
      // (sentence). -> (sentence), din't I?
      .replace(
        /(\w|')\./g,
        (match, p1, offset, fulltext) => p1 + dintI(offset, fulltext)
      )
  );
}

module.exports = { cockney };

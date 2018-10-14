/*
 *	Lex filter to transform plain English into Cockney English.
 *	No racial or societal slurs are intended.  For amusement only.
 *
 *	Copyright 1986 by Daniel Klein.
 *
 *	Reproduction permitted so long as this notice is retained.
 */

/**
 *
 *
 * @param {string} initialString
 * @return {string}
 */
function cockney(initialString) {
  let I_count = 0;
  function I() {
    if (I_count++ % 5 === 1) {
      return "Oy";
    } else {
      return "I";
    }
  }

  let b_count = 0;
  let b_which = 0;
  function bloody() {
    if (b_count++ % 2 === 0) {
      switch (b_which++ % 4) {
        case 0:
          return " bloody";
        case 1:
          return " flinkin'";
        case 2:
          return " bleedin'";
        case 3:
          return " soddin'";
      }
    }
    return "";
  }

  let did = 0;

  function set_did(val) {
    did = val;
  }

  function clear_did() {
    did = 0;
  }

  let dintI_count = 0;
  function dintI() {
    try {
      if (dintI_count++ % 2 === 0) {
        if (did == 1) {
          return ", didn'I?";
        } else if (did == 2) {
          return ", din't we?";
        }
      }
      return ".";
    } finally {
      clear_did();
    }
  }

  let pooped_count = 0;
  function pooped() {
    switch (pooped_count++ % 3) {
      case 0:
        return "knackered";
      case 1:
        return "shagged out";
      default:
        return "done in";
    }
  }
  // void expletive()
  // {
  // /*
  // Blimey
  // Stright a light
  // 'Strewth
  // Cor blimey
  // */
  // }

  return (
    initialString
      // Half the time, insert a mild swear after "the"
      .replace(/\b[Tt]he\b/g, match => `${match}${bloody()}`)
      // steal => nick
      .replace(/\bSteal\b/g, "Nick")
      .replace(/\bsteal\b/g, "nick")
      // stole => nicked
      .replace(/\bStole\b/g, "Nicked")
      .replace(/\bstole\b/g, "nicked")
      // tired => (slang)
      .replace(/\btired\b/g, () => pooped())
      // You see => Y'see
      .replace(/([Yy])ou\s+(?=[^aeiouy])/g, "$1'")
      // and => 'n'
      .replace(/\band\b/g, "'n'")
      // were/was => wuz
      .replace(/\b(?:were|was)\b/g, "wuz")
      // hello => 'ullo
      .replace(/Hello/g, "'Ullo")
      .replace(/hello/g, "'ullo")
      // h- => '-
      .replace(/\b[Hh]/g, "'")
      // your => yer
      .replace(/\b([Yy])our\b/g, "$1er")
      // it => i'
      .replace(/\bit\b/g, "i'")
      // go => gow
      .replace(/\bgo\b/g, "gow")
      // my => me
      .replace(/\bmy\b/g, "me")
      // this/that
      .replace(/\b(?:this|that)\b/g, "$&")
      // We went/had/did => affects end-sentence "didn't I/we?"
      // TODO: This won't work in non-lexer mode...
      .replace(/\b[Ww]e\s(?:went|had|did)\b/g, match => {
        set_did(2);
        return match;
      })
      // I went/had/did => I did
      // TODO: Also sets end-sentence "didn't I/w", but that won't
      // work in non-lexer mode...
      .replace(/\bI\s(?:went|had|did)\b/g, () => {
        set_did(1);
        // return I() + " did";
        return "I did";
      })
      // I => Oy (sometimes)
      .replace(/\bI\b/g, () => I())
      // What are => Wotta (eos)
      .replace(/([Ww])hat\s+are\b/g, "$1otta")
      // -other => -uvver
      .replace(/(\b|[MmNnRr])other/g, "$1uvver")
      // mouth/south => mouf/souf
      .replace(/([MmSs])outh/g, "$1owf")
      // couth/youth => coof/yoof
      .replace(/([cYy])outh/, "$1oof")
      // -uth => -uf
      .replace(/([^o]u)th/g, "$1f")
      // th- => f- (except "this", "that", and "the-")
      .replace(/\bth(?!e|is\b|at\b)/g, "f")
      // ath/eth/ith/oth => af/ef/if/of
      .replace(/([AaEeIiOo])th(?![em])/g, "$1f")
      // oothe => oove
      .replace(/oothe/g, "oove")
      // eithe/eethe => eeve
      .replace(/e[ei]the/g, "eeve")
      // ooth/eeth => oof/eef
      .replace(/(oo|ee)th/g, "$1f")
      // athe/ethe/ithe => avve/evve/ivve
      .replace(/([aei])the/g, "$1vve")
      // th => v (except "this", "that", and "the")
      .replace(/\Bth|\bth(?!(e|at|is)\b)/g, "v")
      // -ime => -oime
      .replace(/ime\b/g, "oime")
      // -ake/-ame => -ike/-ime
      .replace(/a([km])e\b/g, "i$1e")
      // -old- => -owld-
      .replace(/([^r][Oo])ld/g, "$1wld")
      // -ond-/-und- => -unn-
      .replace(/([^AaEeIiOoUu])[uo]nd\B/g, "$1unn")
      // -ing => -in' (eos)
      .replace(/ing\b/g, "in'")
      // getter -> ge'er
      .replace(/([^dg])get+(?!h)/g, "$1ge'")
      // ail => aiw
      .replace(/ail/g, "aiw")
      // any => enny
      .replace(/any/g, "enny")
      // -ray/-say => -righ/-sigh
      .replace(/([rSs])ay\b/g, "$1igh")
      // way => why
      .replace(/way/g, "why")
      // -bit/-hit => -bi'/-hi'
      .replace(/([BbHh])it\b/g, "$1i'")
      // -ait => -ite
      .replace(/ait\b/g, "ite")
      // -ize- => -oize-
      .replace(/([^e])ize(?!n)/g, "$1oize")
      // -ight => -oit
      .replace(/([^e])ight/g, "$1oit")
      // (sentence)? -> (sentence), roit?
      .replace(/(\w|')\?/g, (match, p1) => {
        clear_did();
        return p1 + ", roit?";
      })
      // (sentence). -> (sentence), din't I?
      .replace(/(\w|')\./g, (match, p1) => p1 + dintI())
  );
}

module.exports = { default: cockney };

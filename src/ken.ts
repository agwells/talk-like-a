/**
 * ken:
 * will turn English into Cockney, featuring (dubious) rhyming slang for a lot
 * of computer terminology.
 *
 * ken is named after Ken the Chirpy Cockney Character from the Viz Comic (tm),
 * who speaks somewhat like that.
 *
 * @copyright (c) Stephen K Mulrine <smulrine%cs.strath.ac.uk@nsfnet-relay.ac.uk>
 * @copyright (c) 2019 Aaron Wells (JavaScript port)
 * @license GPL-2+
 * @author Aaron Wells
 */

const { simuLex } = require('./lib');

/**
 * @type {[string, () => any][]}
 */
const rawRules = [
  ['stairs', () => 'apples and pears'],
  ['Downstairs', () => 'Down the apples and pears'],
  ['downstairs', () => 'down the apples and pears'],
  ['Upstairs', () => 'Up the apples and pears'],
  ['upstairs', () => 'up the apples and pears'],
  ['[Mm]outh', () => 'North and South'],
  ['[Ff]ace', () => 'Boat Race'],
  ['[Tt]rouble', () => 'Barney Rubble'],
  [
    'wife',
    (match, { rand }) => {
      switch (rand() % 2) {
        case 0:
          return 'trouble and strife';
        case 1:
          return 'ole lady';
      }
    },
  ],
  ['Road', () => 'Frog and Toad'],
  [' road', () => ' frog and toad'],
  ['pub ', () => 'rub-a-dub '],
  [' bar ', () => ' boozer '],
  [' husband', () => ' ole man'],
  ['Party', () => 'Knees-up'],
  ['party', () => 'knees-up'],
  ['Parties', () => 'Knees-ups'],
  ['parties', () => 'knees-ups'],
  ['My', () => 'Me'],
  [' my', () => ' me'],
  ['Your', () => 'Yer'],
  ['your', () => 'yer'],
  ['You are ', () => 'Yer '],
  ['you are ', () => 'yer '],
  ['You', () => 'Yer'],
  ['you', () => 'yer'],
  ['Those', () => 'Them'],
  ['those', () => 'them'],
  [' those', () => ' them'],
  ['\\(those', () => '(them'],
  [
    'The ',
    (match, { rand }) => {
      switch (rand() % 5) {
        case 0:
          return "The bleedin' ";
        default:
          return match;
      }
    },
  ],
  ['The', (match) => match],
  [
    ' the ',
    (match, { rand }) => {
      switch (rand() % 5) {
        case 0:
          return " the bleedin' ";
        default:
          return match;
      }
    },
  ],
  ['[ (]the', (match) => match],
  [
    'the ',
    (match, { rand }) => {
      switch (rand() % 5) {
        case 0:
          return " the bleedin' ";
        default:
          return match;
      }
    },
  ],
  ['[Tt]his', (match) => match],
  ['[ (]this', (match) => match],
  ['[Tt]hat', (match) => match],
  ['[ (]that', (match) => match],
  ['Thus', () => 'So'],
  [' thus', () => ' so'],
  ['\\(thus', () => '(so'],
  ['thus', () => 'so'],
  ['[Tt]han', (match) => match],
  ['[ (]than', (match) => match],
  ['Who', (match) => match],
  ['who', (match) => match],
  [' old ', () => ' ole '],
  [' to ', () => ' ter '],
  ["Aren't you ", () => 'Aintcha '],
  ["aren't you ", () => 'aintcha '],
  ["Aren't", () => "Ain't"],
  ["aren't", () => "ain't"],
  ["Isn't", () => "Ain't"],
  ["isn't", () => "ain't"],
  ['Are not ', () => "Ain't"],
  ['are not ', () => "ain't "],
  ['Is not ', () => "Ain't "],
  [' is not ', () => " ain't "],
  ['What is th', () => 'Woss'],
  ['what is th', () => 'woss'],
  ['What are you ', () => 'Wotcher '],
  ['what are you ', () => 'wotcher '],
  ['What you are', () => 'Wotcher'],
  ['what you are', () => 'wotcher'],
  ["What you're", () => 'Wotcher'],
  ["what you're", () => 'wotcher'],
  ['What are your', () => 'Wotcher'],
  ['what are your', () => 'wotcher'],
  ['What do you ', () => 'Wotcher '],
  ['what do you ', () => 'wotcher '],
  ['What do your', () => 'Wotcher'],
  ['what do your', () => 'wotcher'],
  [' H[aeu]llo', () => ' Wotcher'],
  [' h[aeu]llo', () => ' wotcher'],
  ['What', () => 'Wot'],
  ['what', () => 'wot'],
  ['Were', () => 'Was'],
  ['were', () => 'was'],
  ['Bother', () => 'Ars'],
  ['bother', () => 'ars'],
  ['Mother', () => 'Muvver'],
  ['Other', () => 'Uvver'],
  ['other', () => 'uvver'],
  ['Father', () => 'Favver'],
  ['father', () => 'favver'],
  ['Rather', () => 'Ravver'],
  ['rather', () => 'ravver'],
  ['Weather', () => 'Wevver'],
  ['weather', () => 'wevver'],
  ['Leather', () => 'Levver'],
  ['leather', () => 'levver'],
  ['Wither', () => 'Wivver'],
  ['wither', () => 'wivver'],
  ['Either', () => 'Eever'],
  ['either', () => 'eever'],
  ['With', () => 'Wiv'],
  ['with', () => 'wiv'],
  ['Anything', () => 'Anyfink'],
  ['anything', () => 'anyfink'],
  ['Something', () => 'Sumfink'],
  ['something', () => 'sumfink'],
  ['Nothing', () => 'Nuffink'],
  ['nothing', () => 'nuffink'],
  ['guitars', () => 'spoons'],
  ['guitar', () => 'spoons'],
  ['drums', () => 'spoons'],
  ['drum', () => 'spoons'],
  ['trumpets', () => 'spoons'],
  ['trumpet', () => 'spoons'],
  ['violins', () => 'spoons'],
  ['violin', () => 'spoons'],
  ['clarinets', () => 'spoons'],
  ['clarinet', () => 'spoons'],
  ['trombones', () => 'spoons'],
  ['trombone', () => 'spoons'],
  ['oboes', () => 'spoons'],
  ['oboe', () => 'spoons'],
  ['flutes', () => 'spoons'],
  ['flute', () => 'spoons'],
  ['tubas', () => 'spoons'],
  ['tuba', () => 'spoons'],
  ['Data', () => 'Info'],
  ['data', () => 'info'],
  ['Directory', () => 'Lockup'],
  ['directory', () => 'lockup'],
  ['Directories', () => 'Lockups'],
  ['directories', () => 'lockups'],
  [
    '[Pp]rocess',
    (match, { rand }) => {
      switch (rand() % 2) {
        case 0:
          return 'Queen Bess';
        case 1:
          return "Rudolf 'Ess";
      }
    },
  ],
  ['[Cc]omputer', () => 'French Tutor'],
  ['[Bb]yte', () => 'Jimmy White'],
  ['[Ff]iles', () => 'Nobby Stiles'],
  ['[Ff]ile', () => 'Royal Mile'],
  ['[Ll]anguage', () => "'Am Sandwich"],
  ['[Zz]ero', () => 'Emperor Nero'],
  ['[Jj]ob', () => 'Uncle Bob'],
  ['[Ss]hell', () => 'Bow Bell'],
  ['[Ss]ave', () => "Chas'n'Dave"],
  ['[Ll]oad', () => 'Old Kent Road'],
  ['[Mm]ouse', () => "Doll's 'Ouse"],
  ['[Bb]uffer', () => 'Sausage Stuffer'],
  ['[Kk]eyboard', () => 'Henry Ford'],
  ['[Mm]anual', () => 'Cocker Spaniel'],
  ['[Ss]creen', () => 'James Dean'],
  ['[Pp]rinter', () => "'Arold Pinter"],
  ['[Pp]lotter', () => 'Pansy Potter'],
  ['[Cc]ompiler', () => 'Martin Tyler'],
  ['[Ss]tring', () => 'Emperor Ming'],
  ['[Bb]rain', () => 'Michael Caine'],
  [
    '[Pp][Aa][Ss][Cc][Aa][Ll]',
    (match, { rand }) => {
      switch (rand() % 2) {
        case 0:
          return 'Pall Mall';
        case 1:
          return 'Roald Dahl';
      }
    },
  ],
  ['[Aa][Ll][Gg][Oo][Ll]', () => 'Johnny Ball'],
  ['[Ff][Oo][Rr][Tt][Rr][Aa][Nn]', () => 'Manfred Mann'],
  ['[Cc][Oo][Bb][Oo][Ll]', () => 'Albert Hall'],
  ['[Jj]ava', () => 'Wot a palavah'],
  ['W[aA][pP]', () => 'Pony and trap'],
  [' wap', () => ' pony and trap'],
  ['Stopped', () => "'Ad the mockers put on"],
  ['stopped', () => "'ad the mockers put on"],
  ['Stopping', () => 'Putting the mockers on'],
  ['stopping', () => 'putting the mockers on'],
  ['stops', () => 'puts the mockers on'],
  ['stop', () => 'put the mockers on'],
  ['STOP', () => 'Put The Mockers On'],
  ['[Ll]ondoner', () => 'Cockney'],
  [
    'friend',
    (match, { rand }) => {
      switch (rand() % 3) {
        case 0:
          return 'mucker';
        case 1:
          return 'mate';
        case 2:
          return 'china';
      }
    },
  ],
  ['a h', () => "an '"],
  ['A h', () => "An '"],
  [' h', () => " '"],
  [' H', () => " '"],
  [' C-', () => ' Bruce Lee-'],
  [
    ' C ',
    (match, { rand }) => {
      switch (rand() % 4) {
        case 0:
          return ' Bruce Lee ';
        case 1:
          return ' Circus Flea ';
        case 2:
          return ' Bumble Bee ';
        case 3:
          return ' Door Key ';
      }
    },
  ],
  [' C\\.', () => ' Circus Flea.'],
  ['Th', () => 'F'],
  ['Wh', () => 'W'],
  ['wh', () => 'w'],
  ['aw', () => 'or'],
  [' [BbKkMmPpRrSsWw]ing', (match) => match],
  [' [Bb]ring', (match) => match],
  [' [Ss]ting', (match) => match],
  [' [Ss]wing', (match) => match],
  [' [CcFfSs]ling', (match) => match],
  [' Thing', () => ' Fing'],
  [' thing', () => ' fing'],

  ['ing ', () => "in' "],
  [
    '\\. ',
    (match, { rand }) => {
      switch (rand() % 32) {
        case 0:
          return ". I'll get out me spoons. ";
        case 1:
          return ". Yer can't 'ave a knees-up wivout a joanna. ";
        case 2:
          return '. Cor blimey guv, would I lie to you. ';
        case 3:
          return ". I'll make us all a nice cup of tea. ";
        default:
          return match;
      }
    },
  ],
  [
    '\\? ',
    (match, { rand }) => {
      switch (rand() % 3) {
        case 0:
          return ', mate? ';
        case 1:
          return ', guv? ';
        case 2:
          return ', squire? ';
      }
    },
  ],
  [
    '! ',
    (match, { rand }) => {
      switch (rand() % 6) {
        case 0:
          return ', cor blimey! ';
        case 1:
          return '! Struth! ';
        case 2:
          return ', guv! ';
        case 3:
          return '! Honest guv! ';
        case 4:
          return ', mate! ';
        case 5:
          return match;
      }
    },
  ],
];

const rules = simuLex.preprocessRules(rawRules);

function ken(originalString) {
  return simuLex(originalString, rules);
}

module.exports = { ken };

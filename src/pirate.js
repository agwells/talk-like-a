/**
 * Talk like a pirate
 *
 * @copyright (c) 2003 Dougal Campbell
 * @license GPL-2
 * @author Aaron Wells
 */
const getRandFn = require('./lib').getRandFn;

/**
 *
 * @param {string} originalString
 * @returns {string}
 */
function pirate(originalString) {
  const fakeRand = getRandFn();
  // In the original Perl filter, each line is processed on its own.
  return originalString
    .split('\n')
    .map((line) =>
      line
        .replace(/\bmy\b/g, 'me')
        .replace(/\bboss\b/g, 'admiral')
        .replace(/\bmanager\b/g, 'admiral')
        .replace(/\b[Cc]aptain\b/g, "Cap'n")
        .replace(/\bmyself\b/g, 'meself')
        .replace(/\byour\b/g, 'yer')
        .replace(/\byou\b/g, 'ye')
        .replace(/\bfriend\b/g, 'matey')
        .replace(/\bfriends\b/g, 'maties')
        .replace(/\bco[-]?worker\b/g, 'shipmate')
        .replace(/\bco[-]?workers\b/g, 'shipmates')
        .replace(/\bearlier\b/g, 'afore')
        .replace(/\bold\b/g, 'auld')
        .replace(/\bthe\b/g, "th'")
        .replace(/\bof\b/g, "o'")
        .replace(/\bdon\'t\b/g, "dern't")
        .replace(/\bdo not\b/g, "dern't")
        .replace(/\bnever\b/g, "no nay ne'er")
        .replace(/\bever\b/g, "e'er")
        .replace(/\bover\b/g, "o'er")
        .replace(/\bYes\b/g, 'Aye')
        .replace(/\bNo\b/g, 'Nay')
        .replace(/\bdon\'t know\b/g, 'dinna')
        .replace(/\bhadn\'t\b/g, "ha'nae")
        .replace(/\bdidn\'t\b/g, "di'nae")
        .replace(/\bwasn\'t\b/g, "weren't")
        .replace(/\bhaven\'t\b/g, "ha'nae")
        .replace(/\bfor\b/g, 'fer')
        .replace(/\bbetween\b/g, 'betwixt')
        .replace(/\baround\b/g, "aroun'")
        .replace(/\bto\b/g, "t'")
        .replace(/\bit\'s\b/g, "'tis")
        .replace(/\bIt\'s\b/g, 'It be')
        .replace(/\bwoman\b/g, 'wench')
        .replace(/\blady\b/g, 'wench')
        .replace(/\bwife\b/g, 'lady')
        .replace(/\bgirl\b/g, 'lass')
        .replace(/\bgirls\b/g, 'lassies')
        .replace(/\bguy\b/g, 'lubber')
        .replace(/\bman\b/g, 'lubber')
        .replace(/\bfellow\b/g, 'lubber')
        .replace(/\bdude\b/g, 'lubber')
        .replace(/\bboy\b/g, 'lad')
        .replace(/\bboys\b/g, 'laddies')
        .replace(/\bchildren\b/g, 'minnows')
        .replace(/\bkids\b/g, 'minnows')
        .replace(/\bhim\b/g, 'that scurvey dog')
        .replace(/\bher\b/g, 'that comely wench')
        .replace(/\bhim\.\b/g, 'that drunken sailor')
        .replace(/\bHe\b/g, 'The ornery cuss')
        .replace(/\bShe\b/g, 'The winsome lass')
        .replace(/\bhe\'s\b/g, 'he be')
        .replace(/\bshe\'s\b/g, 'she be')
        .replace(/\bwas\b/g, "were bein'")
        .replace(/\bHey\b/g, 'Avast')
        .replace(/\bher\.\b/g, 'that lovely lass')
        .replace(/\bfood\b/g, 'chow')
        .replace(/\broad\b/g, 'sea')
        .replace(/\broads\b/g, 'seas')
        .replace(/\bstreet\b/g, 'river')
        .replace(/\bstreets\b/g, 'rivers')
        .replace(/\bhighway\b/g, 'ocean')
        .replace(/\bhighways\b/g, 'oceans')
        .replace(/\bcar\b/g, 'boat')
        .replace(/\bcars\b/g, 'boats')
        .replace(/\btruck\b/g, 'schooner')
        .replace(/\btrucks\b/g, 'schooners')
        .replace(/\bSUV\b/g, 'ship')
        .replace(/\bmachine\b/g, 'contraption')
        .replace(/\bairplane\b/g, 'flying machine')
        .replace(/\bjet\b/g, 'flying machine')
        .replace(/\bdriving\b/g, 'sailing')
        .replace(/\bdrive\b/g, 'sail')
        .replace(/\bwith\b/g, "wi'")
        .replace(/\bam\b/g, 'be')
        .replace(/\bis\b/g, 'be')
        .replace(/\bare\b/g, 'be')
        .replace(/\bwas\b/g, 'be')
        .replace(/\bwere\b/g, 'be')
        .replace(/\bwere\b/g, 'be')
        .replace(/ing\b/g, "in'")
        .replace(/ings\b/g, "in's")
        .replace(/(\.( |\t|$))/g, (...match) => avast(fakeRand, match[1], 3))
        // Greater chance after exclamation
        .replace(/([!\?]( \t|$))/g, (...match) => avast(fakeRand, match[1], 2))
        .replace(/\Br\B/g, () => roll(fakeRand))
    )
    .join('\n');
}
/**
 *
 * @param {() => number} fakeRand
 * @returns {string}
 */
function roll(fakeRand) {
  if (fakeRand() % 2 > 0) {
    return 'r'.repeat((fakeRand() % 5) + 1);
  } else {
    return 'r';
  }
}

/**
 *
 * @param {() => number} fakeRand
 * @param {string} stub
 * @param {number} chance
 * @returns {string}
 */
function avast(fakeRand, stub, chance) {
  const shouts = [
    `, avast${stub}`,
    `${stub} Ahoy!`,
    `, and a bottle of rum!`,
    `, by Blackbeard's sword${stub}`,
    `, by Davy Jones' locker${stub}`,
    `${stub} Walk the plank!`,
    `${stub} Aarrr!`,
    `${stub} Yaaarrrrr!`,
    `, pass the grog!`,
    `, and dinna spare the whip!`,
    `, with a chest full of booty${stub}`,
    `, and a bucket o' chum${stub}`,
    `, we'll keel-haul ye!`,
    `${stub} Shiver me timbers!`,
    `${stub} And hoist the mainsail!`,
    `${stub} And swab the deck!`,
    `, ye scurvey dog${stub}`,
    `${stub} Fire the cannons!`,
    `, to be sure${stub}`,
    `, I'll warrant ye${stub}`,
    `${stub} Arr, me hearty!`,
  ];

  if (fakeRand() % chance === 1) {
    return shouts[fakeRand() % shouts.length] + ' ';
  } else {
    return stub;
  }
}

module.exports = { pirate };

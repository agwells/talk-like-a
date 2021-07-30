/**
 * lolcatz filtur
 *
 * As seen in internet gifs everywhere.
 *
 * @copyright (c) 2013 Joey Hess
 * @licens GPL-2+
 * @author Aaron Wells
 */

function LOLCAT(initialString) {
  return (
    initialString
      .toLowerCase()
      // order is important
      .replace(/can i/g, 'i can')
      .replace(/\bi\'ve/g, 'i')
      .replace(/\ba\s+/g, '') // nuke "a"
      .replace(/cheese/g, 'cheez')
      .replace(/\brock\b/g, 'rawk')
      .replace(/ese\b/g, 'ees')
      .replace(/s\'s\b/g, 's')
      .replace(/\'s\b/g, 's')
      .replace(/er\b/g, 'r')
      .replace(/ture\b/g, 'chur')
      .replace(/day/g, 'dai')
      .replace(/\bok\b/g, 'k')
      .replace(/\boks\b/g, 'ks')
      .replace(/boy/g, 'boi')
      .replace(/tion/g, 'shun')
      .replace(/ight/g, 'ite')
      .replace(/innocent/g, 'innozent')
      .replace(/ph/g, 'f')
      .replace(/es/g, 'ez')
      .replace(/ed\b/g, 'd')
      .replace(/ns/g, 'nz')
      .replace(/ks/g, 'kz')
      .replace(/ds/g, 'dz')
      .replace(/se/g, 'ze')
      .replace(/zs/g, 's')
      .replace(/sz/g, 'z')
      .replace(/ss/g, 's')
      .replace(/cc/g, 'cs')
      .replace(/ck/g, 'k')
      .replace(/oa/g, 'o')
      .replace(/\bcat/g, 'kat')
      .replace(/ive\b/g, 'iv')
      .replace(/ake/g, 'aek')
      .replace(/ed\b/g, 'd')
      .replace(/ing\b/g, 'in')
      .replace(/sion/g, 'shun')
      .replace(/\bam\b/g, 'iz')
      .replace(/\bhave\b/g, 'has')
      .replace(/\bwho/g, 'hoo')
      .replace(/\bwake\b/g, 'waek')
      .replace(/\bone\b/g, '1')
      .replace(/\btwo\b/g, '2')
      .replace(/\bto\b/g, '2')
      .replace(/\btoo\b/g, '2')
      .replace(/\bthree\b/g, '3')
      .replace(/\bfour\b/g, '4')
      .replace(/\bfor\b/g, '4')
      .replace(/\bfore\b/g, '4')
      .replace(/\bfive\b/g, '5')
      .replace(/\bsix\b/g, '6')
      .replace(/\bseven\b/g, '7')
      .replace(/\beight\b/g, '8')
      .replace(/\bnine\b/g, '9')
      .replace(/\bten\b/g, '10')
      .replace(/god/g, 'ceilin cat')
      .replace(/jezus/g, 'jebus')
      .replace(/kitty/g, 'kitteh')
      .replace(/saturdai/g, 'katurdai')
      .replace(/allah/g, 'invisible man')
      .replace(/delicious/g, 'delishus')
      .replace(/\bdoctor\b/g, 'docta')
      .replace(/\bdr\b/g, 'docta')
      .replace(/\bgay\b/g, 'ghey')
      .replace(/\bgood\b/g, 'gud')
      .replace(/\bever/g, 'evr')
      .replace(/\bpage\b/g, 'paeg')
      .replace(/cheezburgr/g, 'cheezburger') // fix up to canonical form
      .replace(/es/g, 'ez')
      .toUpperCase()
  );
}

module.exports = { LOLCAT };

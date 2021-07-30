/**
 *	newspeak.l, version 1.1.
 *	Lex filter to transform plain English into NewSpeak.
 *	Copyright (c) 1991 Jamie Zawinski <jwz@jwz.org>.
 *
 *      Permission to use, copy, modify, distribute, and sell this
 *      software and its documentation for any purpose is hereby granted
 *      without fee, provided that the above copyright notice appear in
 *      all copies and that both that copyright notice and this
 *      permission notice appear in supporting documentation.  No
 *      representations are made about the suitability of this software
 *      for any purpose.  It is provided "as is" without express or
 *      implied warranty.
 *
 *	There are some design notes near the end.  Suggestions and
 *	improvements to this code are more than welcome.
 *	Hail Big Brother!
 *
 * @copyright 1991 Jamie Zawinski <jwz@jwz.org>
 * @license MIT-like
 * @author Aaron Wells
 */
const { sameCapReplacer: CAP, sameCap, simuLex } = require('./lib');

/**
 *
 * @param {string} replacement
 */
function WCAP(replacement) {
  /**
   * @param {string} match
   */
  function wcap(match) {
    return match[0] + sameCap(match.slice(1), replacement);
  }

  return wcap;
}

/**
 *
 * @param {string} str1
 * @param {string} str2
 */
function COMP(str1, str2) {
  /**
   * @param {string} match
   */
  function comp(match) {
    return sameCap(match, str1) + sameCap(match, str2);
  }

  return comp;
}

/**
 *
 * @param {string} str1
 * @param {string} str2
 */
function WCOMP(str1, str2) {
  /**
   * @param {string} match
   */
  function wcomp(match) {
    return (
      match[0] + sameCap(match.slice(1), str1) + sameCap(match.slice(1), str2)
    );
  }

  return wcomp;
}

/**
 * @type {[string, string][]}
 */
const expansions = [
  ['YOUNG', /(([Yy]oung|[Ss]mall|[Ll]ittle){W})/.source],
  ['DEAD', /(([Dd]ead|[Dd]eceased){W})/.source],
  ['THE', /([Tt]he{W}?)/.source],
  ['ANDOR', /({W}(([Aa]nd)|([Oo]r)){W}?)/.source],
  [
    'COLOR',
    /(red|green|blue|yellow|cyan|magenta|purple|orange|mauve|pink|turquoise|brown|gr[ae]y)/
      .source,
  ],
  ['EW', /({W}|{ES}|')/.source],
  ['W', /(([ 	]?\n[ 	]*)|[ 	]|[\"'`])/.source],
  ['ES', /[.,;:!?/]/.source],
];

// %%

// %{
// 	/******************************
// 	 *	    PLUSwords	      *
// 	 ******************************/
// %}
/**
 * @type {[string, (null | ((...matches: string[]) => any))][]}
 */
const rawRules = [
  [/[Qq]uite{EW}(?=[A-Za-z][A-Za-z])/.source, CAP('plus')],
  [/[Rr]ather{EW}(?=[A-Za-z][A-Za-z][A-Za-z])/.source, CAP('plus')],
  [/[Kk]ind{EW}of{EW}(?=[A-Za-z][A-Za-z][A-Za-z])/.source, CAP('plus')],
  [/[Kk]inda{EW}(?=[A-Za-z][A-Za-z][A-Za-z])/.source, CAP('plus')],
  [/[Mm]ore{W}than{W}a{W}(little|bit){W}/.source, CAP('plus')],
  [/[Pp]ro-/.source, CAP('plus')],

  [/[Hh]undreds{W}of{W}[Tt]housands/.source, null],
  [/[Hh]undreds{ANDOR}[Tt]housands/.source, null],
  [/[Hh]undreds{W}if{W}not{W}[Tt]housands/.source, null],
  [/[Tt]housands/.source, null],
  [/[Mm]illions/.source, CAP('doubleplusmany')],

  [/[Dd]ozens/.source, CAP('many')],
  [/[Hh]undreds/.source, CAP('plusmany')],

  [/([Bb]right|[Ll]ight|[Ii]ntense){W}(?={COLOR})/.source, CAP('plus')],
  [/([Dd]im|[Ff]aded|[Dd]ark|[Pp]ale){W}(?={COLOR})/.source, CAP('plusun')],
  [/([Dd]im|[Ff]aded|[Dd]ark|[Pp]ale)/.source, CAP('unlight')],

  [/[Ee]very/.source, (match) => match],
  [/[Vv]ery{W}/.source, null],
  [/[Rr]eally{W}/.source, null],
  [/[Tt]erribly{W}/.source, null],
  [/[Aa]wesome({W})?/.source, null],
  [/[Aa]wfully{W}/.source, CAP('doubleplus')],

  [/[Ww]hopping{EW}/.source, CAP('plusbig')],

  [/O\.K\./.source, null],
  [/[Aa]ll({W})?[Rr]ight/.source, null],
  [/[Oo][Kk][Aa][Yy]/.source, CAP('plusgood')],
  [/{W}OK(?={W})/.source, WCAP('plusgood')],

  [/([Tt]oo|[Oo]verly|[Tt]hat){W}[Mm]uch/.source, CAP('plusmuch')],

  [/{W}[Bb]ad(?={EW})/.source, WCAP('ungood')],
  [/{W}[Pp]oor(?={EW})/.source, WCAP('ungood')],
  [/{W}[Ll]ame(?={EW})/.source, WCAP('ungood')],
  [/{W}[Pp]itiful(?={EW})/.source, WCAP('ungood')],
  [/{W}[Nn]asty(?={EW})/.source, WCAP('plusungood')],
  [/{W}[Hh]orrid(?={EW})/.source, WCAP('doubleplus ungood')],
  [/{W}[Hh]orrible(?={EW})/.source, WCAP('doubleplus ungood')],
  [/{W}[Aa]wful(?={W})/.source, WCAP('doubleplus ungood')],
  [/{W}[Ee]vil(?={W})/.source, WCAP('doubleplus ungood')],

  // %{
  // 	/******************************
  // 	 *	     Titles	      *
  // 	 ******************************/
  // %}

  [/{W}[Ss]ir(?={EW})/.source, WCAP('citizen')],
  [/{W}[Mm]r\.(?={EW})/.source, WCAP('brother')],
  [/[Mm]ister(?={EW})/.source, CAP('brother')],
  [/[Mm]adame?/.source, CAP('sister')],
  [/{W}[Mm]iss(?={EW})/.source, WCAP('sister')],
  [/[Mm]a'?am(?={EW})/.source, CAP('sister')],
  [/{W}[Mm]r?s\.(?={EW})/.source, WCAP('sister')],
  [/Mrs(?={EW})/.source, CAP('sister')],

  [/{YOUNG}?[Cc]hildren/.source, CAP('young citizens')],
  [/{YOUNG}?[Bb]oys{ANDOR}[Gg]irl(?=s)/.source, CAP('young citizens')],
  [
    /{YOUNG}?([Kk]id|[Gg]irl|[Bb]oy|[Cc]hild)(?={EW})/.source,
    CAP('young citizen'),
  ],

  [/[Ff]ellow/.source, CAP('citizen')],

  [/[Nn]on{W}?-?citizen/.source, CAP('unperson')],
  [/[Nn]on{W}?-?member/.source, CAP('unperson')],
  [/[Cc]riminal(?=s?)/.source, CAP('unperson')],
  [/{DEAD}(man|woman)/.source, CAP('unperson')],
  [/{DEAD}(men|women)/.source, CAP('unpersons')],

  [/[Ii]n{W}[Pp]erson/.source, (match) => match],

  [/{W}[Uu]ser/.source, WCOMP('party ', 'worker')],
  [/[Ss]tudent/.source, COMP('party ', 'worker')],
  [/[Cc]itizen(?=s?{EW})/.source, COMP('party ', 'worker')],
  [/[Pp]erson(?=s?{EW})/.source, COMP('party ', 'worker')],
  [/[Pp]eople/.source, COMP('party ', 'workers')],

  [/[Ss]enator/.source, null],
  [/[Cc]ongressman/.source, null],
  [/[Ss]upervisor/.source, null],
  [/[Pp]rofessor/.source, () => 'Inner Party Member'],
  [/[Pp]rof\.(?={EW})/.source, () => 'Inner Party Member'],
  [/[Pp]rof(?={EW})/.source, () => 'Inner Party Member'],

  [/Representative(?=s?)/.source, () => 'Inner Party Member'],
  [/representatives/.source, () => 'Inner Party Members'],

  [/[Ww]hite{W}[Cc]ollar/.source, null],
  [/[Uu]pper{W}[Cc]lass/.source, COMP('inner ', 'party')],
  [/[Mm]iddle{W}[Cc]lass/.source, CAP('party')],
  [/[Bb]lue{W}[Cc]ollar/.source, null],
  [/[Ww]orking{W}[Cc]lass/.source, null],
  [/[Ll]ower{W}[Cc]lass/.source, CAP('prole')],
  [/([Ff]ool|[Ii]diot)(?=s?{EW})/.source, CAP('prole')],
  [/[Ss]tupidity/.source, CAP('proleness')],

  // %{
  // 	/******************************
  // 	 *	  Organizations       *
  // 	 ******************************/
  // %}

  [
    /[Aa]?{W}([Ww]hite{W}[Hh]ouse|[Gg]ovt\.?|[Gg]overnment){W}([Ss]ource|[Oo]fficial|[Ss]pokes(man|woman|person))/
      .source,
    CAP('an Inner Party Member'),
  ],
  [/{THE}?[Rr]epublican{W}[Pp]arty/.source, COMP('mini', 'luv')],
  [/{THE}?[Dd]emocratic{W}[Pp]arty/.source, COMP('mini', 'plenty')],

  [/{THE}?Congress/.source, () => 'MiniPax'],
  [/{THE}?[Ss]enate/.source, () => 'MiniPax'],
  [/{THE}?[Hh]ouse{W}[Oo]f{W}[Rr]epresentatives/.source, () => 'MiniPax'],
  [/{THE}?[Ss]tate{W}[Dd]epartment/.source, () => 'MiniPax'],
  [/{THE}?[Ss]tate{W}[Dd]ept\.?/.source, () => 'MiniPax'],
  [/{THE}?[Dd]efen[cs]e{W}[Dd]epartment/.source, null],
  [/{THE}?[Dd]efen[cs]e{W}[Dd]ept\.?/.source, null],
  [/{THE}?[Ww]ar{W}[Dd]epartment/.source, null],
  [/{THE}?[Ww]ar{W}[Dd]ept\.?/.source, null],
  [/{THE}?[Hh]ouse{W}of{W}[Cc]ommons/.source, null],
  [/{THE}?Pentagon/.source, null],
  [/{THE}?[Ff]eds/.source, null],
  [/{THE}?FCC/.source, null],
  [/{THE}?D[Oo]D/.source, null],
  [/{THE}D\.[Oo]\.D./.source, null],
  [/{THE}?[Ss]ecret{W}[Ss]ervice/.source, COMP('mini', 'luv')],
  [/{THE}?White{W}House/.source, null],
  [/{THE}?Kremlin/.source, () => 'MiniTrue'],
  [/{THE}?(CIA|NSA|FBI|MI-?5)(?={EW})/.source, () => 'MiniTrue'],
  [/{THE}?(C\.I\.A\.|N\.S\.A\.|F\.B\.I\.)(?={EW})/.source, () => 'MiniTrue'],
  [/{THE}?[Aa]rchive(?=s?)/.source, COMP('mini', 'rec')],
  [/{THE}?[Ll]ibrary/.source, COMP('mini', 'rec')],
  [/{THE}?[Ll]ibraries/.source, COMP('mini', 'recs')],

  [/[Tt]hought{W}[Pp]olice|[Nn]azis?/.source, COMP('think', 'pol')],
  [/[Vv]ice{W}[Ss]quad/.source, COMP('sex', 'pol')],
  [/PMRC|P\.M\.R\.C\./.source, COMP('sex', 'pol')],

  [/[Oo]fficer/.source, CAP('minister')],

  [/{THE}?[Dd]epartment{EW}of{EW}./.source, null],
  [/{THE}?[Dd]ept\.?{EW}of{EW}./.source, null],
  [/{THE}?[Uu]niversity{EW}of{EW}./.source, null],
  [/{THE}?[Uu]niv\.?{EW}of{EW}./.source, null],
  [/{THE}?[Dd]ept\.?{EW}of{EW}./.source, null],
  [/{THE}?([Ss]ub-?)?[Cc]omm?itt?ee{EW}(of|on){EW}./.source, null],
  [
    /{THE}?[Ss]chool{EW}of{EW}(.)/.source,
    (fullMatch, firstParen) => {
      if (/[a-zA-Z]/.test(firstParen)) {
        return 'Mini' + firstParen.toUpperCase();
      } else {
        return 'Ministry of ' + firstParen;
      }
    },
  ],
  [/[Dd]epartment/.source, null],
  [/[Uu]niversity/.source, CAP('ministry')],
  [/[Uu]niv\.?(?={W})/.source, CAP('ministry')],
  [/[Dd]ept\.?(?={W})/.source, CAP('ministry')],
  [/([Ss]ub-?)?[Cc]omm?itt?ee/.source, CAP('ministry')],

  [/{THE}[Pp]roject(?={EW})/.source, CAP('the Three Year Plan')],
  [/[Oo]ur{W}[Pp]roject(?={EW})/.source, CAP('our Three Year Plan')],
  [/[Bb]udget/.source, () => 'Three Year Plan'],
  [/[Pp]roject(?={ES})/.source, () => 'Three Year Plan'],

  [
    /{W}({THE}|([aa]{W}))[Pp]roject/.source,
    (match) => match[0] + 'the Three Year Plan',
  ],

  [
    /[A-Za-z]+'[Ss](?={W}(law|Law|LAW|book|Book|BOOK|rule|Rule|RULE){EW})/
      .source,
    () => "Goldstein's",
  ],

  // %{
  // 	/******************************
  // 	 *	     Actions	      *
  // 	 ******************************/
  // %}

  [/[Ii]n{W}love{EW}/.source, CAP('SexCriming')],
  [/[Ll]ove{W}you(?={EW})/.source, CAP('love Big Brother')],
  [/[Ll]ove{W}me(?={EW})/.source, CAP('love Big Brother')],

  [/[Cc]loning/.source, null],
  [/[Rr]eproduction/.source, null],
  [/[Cc]elibacy/.source, null],
  [/[Pp]rocreation/.source, COMP('good', 'sex')],

  [/[Cc]elibate/.source, null],
  [/[Pp]rocreate/.source, COMP('good', 'sexwise')],

  [/[Tt]elevisions?/.source, null],
  [/TVs?/.source, null],
  [/[Tt]\.[Vv]\.s?/.source, null],
  [/[Rr]adios?/.source, null],
  [/[Nn]ews{W}?[Pp]apers?/.source, null],
  [/[Jj]ournalism/.source, null],
  [/[Mm]ovies?/.source, null],
  [/[Rr]ock{EW}?-?(and|&|'?n'?){EW}?-?[Rr]oll({W}[Mm]usic)?/.source, null],
  [
    /(([Rr]ock|[Cc]lassical|[Ii]ndustrial|[Pp]op|[Dd]ance|[Rr]ap){W})?[Mm]usic/
      .source,
    null,
  ],
  [/[Tt]unes/.source, null],
  [/[Mm]oney/.source, null],
  [/[Cc]ash/.source, null],
  [/[Cc]omic{W}[Bb]ooks?/.source, null],
  [/([Ss]tar{W}?)?[Tt]rek/.source, COMP('prole', 'feed')],

  [/[Pp]eace{W}[Mm]ovement/.source, null],
  [/[Pp]eace{W}[Pp]rotest/.source, null],
  [/[Aa]nti{EW}[Ww]ar/.source, null],
  [/([Pp]assive{W})?[Rr]esistance/.source, null],
  [/[Cc]reativity/.source, null],
  [/[Tt]reason/.source, null],
  [/[Rr]esearch/.source, COMP('crime', 'think')],
  // %{
  // 	/******************************
  // 	 *	     Religion	      *
  // 	 ******************************/
  // %}

  [/[Jj]esus{W}[Cc]hrist/.source, null],
  [/[Jj]esus/.source, null],
  [/{THE}?[Bb]uddh?a/.source, null],
  [/[Mm]ohamm?ed/.source, null],
  [/[Mm]artin{W}[Ll]uther{W}[Kk]ing/.source, null],
  [/J\.?\ ?R\.?\ \"?Bob\"?\ Dobbs/.source, () => 'doubleplus crimethinker'],

  [/([Jj]esse{W})?[Hh]elms/.source, null],
  [/([RrDd]on(ald)?{W})?[Rr]ea?gan/.source, null],
  [/[Gg]eorge{W}[Gg]uscoria/.source, () => 'doubleplus goodthinker'],

  [/[Jj]ewish/.source, COMP('crime', 'thinkwise')],
  [/[Jj]ew/.source, null],
  [/[Cc]hristian/.source, null],
  [/[Mm]oslem/.source, null],
  [/[Bb]uddhist/.source, null],
  [/[Aa]thiest/.source, null],
  [/[Aa]gnostic/.source, COMP('crime', 'thinker')],

  [/[Ff]aith/.source, COMP('belly', 'feel')],

  // %{
  // 	/******************************
  // 	 *	      Places	      *
  // 	 ******************************/
  // %}

  [/[Ee]ngland|{THE}?[Uu]nited{W}[Kk]ingdom/.source, null],
  [/({THE}?[Uu]nited{W}[Ss]tates{W}[Oo]f{W})?[Aa]merica/.source, null],
  [/{THE}?[Uu]nited{W}[Ss]tates|USA|U\.S\.A\.|[Cc]anada/.source, null],
  [/[Gg]ermany|[Ii]srael|[Ee]urope/.source, () => 'Oceania'],

  [/Iranian|Iraqu?i|Libyan|Russian|African|Egyptian/.source, () => 'Eurasian'],
  [/Iran|Iraq|Libya|Russia|Africa|Egypt/.source, null],
  [/([Ss]audi{W})?Arabia|{THE}?Soviet{W}Union/.source, () => 'Eurasia'],
  [/[Ss]oviet/.source, () => 'Eurasian'],

  [/[Cc]hinese|[Jj]apanese|[Tt]aiwanese/.source, null],
  [/[Pp]hillipino|[Ii]ndian|[Aa]ustralian|[Mm]exican/.source, null],
  [/[Nn]icaraguan|[Ss]alvadori?an/.source, () => 'Eastasian'],
  [/China|[Jj]apan|[Tt]aiwan|{THE}?[Pp]hillipines|[Ii]ndia/.source, null],
  [
    /[Aa]ustralia|[Mm]exico|[Nn]icaragua|[Ee]l{W}[Ss]alvador/.source,
    () => 'Eastasia',
  ],

  [/[Kk]uwaiti/.source, () => 'Eurasian'],
  [/[Kk]uwait/.source, () => 'The Malabar Front'],

  // %{
  // 	/******************************
  // 	 * Miscellaneous Translations *
  // 	 ******************************/
  // %}

  [/{W}[Ff]aster/.source, WCAP('plus speedful')],
  [/{W}[Ss]lower/.source, WCAP('plus unspeedful')],
  [/{W}[Ff]ast/.source, WCAP('speedful')],
  [/{W}[Ss]low/.source, WCAP('unspeedful')],

  [/[Mm]odern/.source, CAP('plusnew')],
  [/[Aa]ncient/.source, CAP('plusunnew')],
  [/{W}old(?={W})/.source, WCAP('plusunnew')],

  [/[Hh]appiness/.source, CAP('joyfulness')],
  [/[Hh]appy/.source, CAP('joyful')],
  [/[Qq]uick/.source, CAP('speedful')],
  [/{W}[Ss]peedy/.source, WCAP('speedful')],
  [/[Hh]eavy/.source, CAP('weightful')],
  [/[Hh]eavill?y/.source, CAP('weightfully')],
  [/[Ss]ick(ly)?/.source, CAP('unhealthful')],

  [/[Gg]ross/.source, null],
  [/[Ss]ickening/.source, null],
  [/[Ff]oul/.source, null],
  [/[Pp]utrid/.source, null],
  [/[Dd]isgusting/.source, COMP('crime', 'thinkful')],

  [/[Ss]mash/.source, null],
  [/[Cc]rush/.source, null],
  [/[Oo]bliterate/.source, null],
  [/[Aa]nnihilate/.source, null],
  [/[Nn]eutralize/.source, null],
  [/[Dd]emolish/.source, null],
  [/[Dd]estroy/.source, CAP('unbuild')],

  [/[Ii]nanimate/.source, CAP('unlifeful')],
  [/[Ss]ociety|[Cc]ulture/.source, () => 'IngSoc'],
  [/[A-Za-z]+isi?m(?={EW})/.source, () => 'Goldsteinism'],
  [/[A-Za-z]+ist(?={EW})/.source, () => 'Goldsteinist'],

  [/{W}[Dd]ead/.source, WCAP('unlifeful')],
  [/{W}[Dd]eath/.source, WCAP('unlife')],
  [/{W}[Ll]ie/.source, WCAP('untruth')],
  [/{W}[Ff]alsehood/.source, WCAP('untruth')],
  [/{W}[Mm]istake(?={EW})/.source, WCAP('untruth')],
  [/{W}[Ww]hisper/.source, WCAP('unshout')],
  [/{W}[Pp]roud/.source, WCAP('prideful')],

  [/[Ff]alse/.source, CAP('untrue')],
  [/[Dd]ark/.source, CAP('unlight')],
  [/[Bb]lack/.source, CAP('unwhite')],
  [/[Ff]orbidden/.source, CAP('unallowed')],
  [/[Ff]orbid/.source, CAP('unallow')],
  [/[Ff]ailure/.source, CAP('unsuccess')],
  [/[Ff]ail(?={EW})/.source, CAP('unwin')],

  [/[Ss]tatistics?(?={EW})/.source, CAP('propaganda')],
  [/{W}[Aa]n{W}[Aa]nn?ouncement/.source, WCAP('a NewsFlash')],
  [/[Aa]nn?ouncement/.source, () => 'NewsFlash'],
  [/[Ii]nstructions?/.source, () => 'B. B. DayOrder'],

  [/[Aa]lmost|[Nn]early/.source, CAP('within measurable distance of')],
  [/[Ff]unny/.source, CAP('humorful')],

  [/[Dd]oom/.source, CAP('unsave')],
  [/[Cc]haos/.source, CAP('unorder')],
  [/[Cc]haotic/.source, CAP('unorderful')],
  [/[Ee]nslaved/.source, CAP('protected')],
  [/[Ee]nslave/.source, CAP('protect')],
  [/[Dd]angerous/.source, CAP('unsafewise')],
  [/[Dd]anger/.source, CAP('unsafe')],
  [/([Bb]lind{W})?[Oo]bedience/.source, COMP('ing', 'soc')],
  [/\"?[Nn]ew{W}[Ww]orld{W}[Oo]rder\"?/.source, () => 'IngSoc'],

  [/[Pp]rivacy/.source, null],
  [/[Ii]ndividuality/.source, COMP('own', 'life')],

  [/IMHO/.source, () => 'for the love of Big Brother'],

  [/[Ee]motion(al|s)?/.source, null],
  [/[Cc]onviction/.source, null],
  [/[Bb]elie(f|ve)/.source, null],
  [/[Aa]ccept(ance)?/.source, COMP('belly', 'feel')],

  [/[Dd]emocracy/.source, null],
  [/[Ll]iberty/.source, null],
  [/[Ff]reedom/.source, null],
  [/[Jj]ustice/.source, null],
  [/{THE}?[Aa]merican{W}[Ww]ay/.source, null],
  [/[Ss]ubversion/.source, null],
  [/[Pp]assion/.source, COMP('crime', 'think')],

  [/[Oo]bscenity/.source, null],
  [/[Pp]ornography/.source, null],
  [/[Oo]rgasm/.source, null],
  [/[Ee]rotica/.source, COMP('sex', 'crime')],
  [/[Ss]exy/.source, null],
  [/[Oo]bscene/.source, null],
  [/[Pp]ornographic/.source, null],
  [/[Ee]rotic/.source, COMP('sex', 'crimeful')],

  [/[Cc]ritic(?=s?{W})/.source, COMP('crime', 'thinker')],

  [/[Ii]nfant{W}[Mm]ortality/.source, COMP('inf', 'mort')],

  [/[Ff]amilies/.source, null],
  [/[Pp]arents/.source, COMP('family ', 'units')],
  [/[Mm]other{ANDOR}[Ff]ather/.source, null],
  [/[Bb]rother{ANDOR}[Ss]ister/.source, COMP('family ', 'unit')],
  [/{W}[Pp]arent(?=s?{EW})/.source, WCOMP('family ', 'unit')],
  [/[Ff]amily/.source, COMP('family ', 'unit')],

  [/God(?={EW})/.source, () => 'Big Brother'],
  [/[Pp]res(ident|\.)({W}([Bb]ush|[Rr]eagan))?/.source, () => 'Big Brother'],
  [/[Pp]rime{W}[Mm]inister/.source, () => 'Big Brother'],

  [
    /([Gg][Nn][Uu]{W}([Ee]macs|EMACS){W})?[Gg]eneral{W}[Pp]ublic{W}[Ll]icense/
      .source,
    () => 'NewSpeak Dictionary',
  ],

  [
    /(questioning|murder|ass?ass?ination)(?={ES})/.source,
    () => 'interrogation',
  ],

  [/[Ss]keptic(?={EW})/.source, CAP('unperson')],
  [/[Ss]illy/.source, CAP('foolhardy')],
  [/{W}[A-Za-z][A-Za-z]?illy/.source, (match) => match],
  [/[Ss]outhern|[Ss]outherly/.source, CAP('southwise')],
  [/[Nn]orthern|[Nn]ortherly/.source, CAP('northwise')],
  [/[Ee]astern|[Ee]easterly/.source, CAP('eastwise')],
  [/[Ww]estern|[Ww]esterly/.source, CAP('westwise')],
  [/[Pl]leasant/.source, CAP('goodwise')],
  [/[Vv]iolent/.source, CAP('unpeacewise')],
  [/[Vv]iolence/.source, CAP('unpeaceness')],
  [/[Ii]ndifference/.source, CAP('uncarefulness')],
  [/[Ii]ndifferent/.source, CAP('uncareful')],
  [/[Bb]elly/.source, CAP('abdomen')],
  [/[Cc]omic/.source, CAP('humorwise')],
  [/{W}[Uu]nless/.source, WCAP('lest')],
  [/usually/.source, () => 'usualwise'],

  [/[Gg]uerillas/.source, COMP('party ', 'workers')],

  [/[Ww]ar(?={EW})/.source, CAP('engagement')],
  [/[Dd]efen[cs]e(?={EW})/.source, CAP('peace')],
  [/[Ii]nvasion/.source, CAP('liberation')],

  // %{
  // 	/******************************
  // 	 *     Syllable Rewriting     *
  // 	 ******************************
  // 	isn't ___	is un___
  // 	not the ___	the un___
  // 	not my ___	my un___
  // 	anti___		un___ 		(etc...)
  // 	___cally	___wise
  // 	___ally		___wise
  // 	___lly		___wise
  // 	___ly		___wise
  // 	___aic		___wise
  // 	___lic		___wise
  // 	___nnic		___wise
  // 	<VOWEL>tric	___wise
  // 	___ic		___wise
  // 	<VOWEL>ous	___ful
  // 	<CONSONANT>ous	___eful
  // 	___less		un___ful

  //          */
  // %}

  [/[Ii]sn't{W}my{W}/.source, CAP('is my un')],
  [/[Ii]s{W}not{W}my{W}/.source, CAP('is my un')],
  [/[Ii]sn't{W}[Tt]he{W}/.source, CAP('is the un')],
  [/[Ii]s{W}not{W}[Tt]he{W}/.source, CAP('is the un')],
  [/[Ii]sn't{W}[Ii]n{W}[Tt]he{W}/.source, CAP('is in the un')],
  [/[Ii]s{W}not{W}[Ii]n{W}[Tt]he{W}/.source, CAP('is in the un')],
  [/[Ii]t'?s{W}not{W}[Tt]he{W}/.source, CAP("it's the un")],
  [/[Ii]sn't{W}/.source, CAP('is un')],
  [/[Ii]s{W}not{W}/.source, CAP('is un')],
  [/[Nn]ot{W}[Tt]he{W}/.source, CAP('the un')],
  [/[Nn]ot{W}[Mm]y{W}/.source, CAP('my un')],
  [/[Nn]ot{W}[Aa]{W}/.source, CAP('an un')],
  [/[Nn]ot{W}have{W}/.source, CAP('has un')],
  [/[Nn]ot{W}be{W}/.source, CAP('be un')],
  [/[Nn]ot{W}[Oo]nly(?={W})/.source, CAP('unonly')] /* avoid "unonwise" */,

  [/[Aa]{W}[Nn]ot{W}/.source, null],
  [/[Aa]{W}[Nn]on-?/.source, (match) => match[0] + 'n' + match[1] + 'un'],

  // %{
  // /*	{W}[Nn]ot{W}	|	*/
  // %}
  [/{W}[Ii]l-?(?=[a-z][a-z])/.source, WCAP('un')],
  [/{W}[Aa]nti-?/.source, null],
  [/{W}[Nn]on-?/.source, WCAP('un')],

  [/robably|ventually|[Oo]bvious|[Bb]asic|{W}[Oo]nly|otally/.source, null],
  [
    /[Aa]rctic|holic|{EW}ally|{EW}[Aa]pply|{W}[Tt]opic/.source,
    (match) => match,
  ],

  [/{W}([Tt]raf|[Pp]aci|[Ss]peci)fi(?=c{W})/.source, (match) => match],
  [/{W}(ma|tra)gi(?=c{W})/.source, (match) => match],
  [/{W}(pub|cyc|re|fro|gar)li(?=c{W})/.source, (match) => match],
  [/{W}(eth|cli|to)ni(?=c{W})/.source, (match) => match],
  [/{W}(E|cle|met|cit)ri(?=c{W})/.source, (match) => match],
  [/{W}(ch|ep|tr?op|t|mus|stat|att)i(?=c{W})/.source, (match) => match],
  [/{W}only(?={W})/.source, (match) => match],
  [/{W}[Aa]tlantic/.source, (match) => match],

  [/[ \t\n][drstwDRSTW]ally/.source, (match) => match[0] + match[1] + 'ally'],

  [/[a-z]ically(?={W})/.source, (match) => match[0] + 'wise'],
  [/[a-z]ally(?={W})/.source, (match) => match[0] + 'wise'],
  [/[a-z][a-z]lly(?={W})/.source, (match) => match[0] + match[1] + 'wise'],
  [
    /[a-z][a-z][a-z]ly(?={W})/.source,
    (match) => match[0] + match[1] + match[2] + 'wise',
  ],
  [/[a-z]ical(?={W})/.source, (match) => match[0] + 'wise'],

  [
    /[a-km-qs-z]aic(?={EW})/.source,
    (match) => match[0] + 'wise',
  ] /* not laic, raic */,
  [/[a-z]lic(?={EW})/.source, (match) => match[0] + 'lwise'],
  [/[a-z]nnic(?={EW})/.source, (match) => match[0] + 'nwise'],
  [/[a-z][aeiou]tric(?={EW})/.source, (match) => match[0] + match[1] + 'twise'],
  [/[a-z]tric(?={EW})/.source, (match) => match[0] + 'wise'],
  [/[a-z]ic(?={EW})/.source, (match) => match[0] + 'wise'],
  [/[a-z]lly(?={EW})/.source, (match) => match[0] + 'wise'],
  [/[a-z]ly(?={EW})/.source, (match) => match[0] + 'wise'],

  [
    /[aeiouy][^aeiouy]ous(?={EW})/.source,
    (match) => match[0] + match[1] + 'ful',
  ],
  [/[^aeiouy]ous(?={EW})/.source, (match) => match[0] + 'eful'],
  [/[^e]ous(?={EW})/.source, (match) => match[0] + 'ful'],

  [
    /([A-Za-z])+less(?={EW})/.source,
    (match) => sameCap(match.slice(0, -4), 'Un' + match.slice(0, -4) + 'ful'),
  ],

  [
    /.  /.source,
    (match) => match,
    // (match) => {
    //   printf('%s', yytext);
    //   fcounter &= 15;
    //   if (14 == fcounter++) printf('(fnord)  ');
    // },
  ],

  [
    /[.,!?]\"([^\n\".!]+[.!])?\n(?=[\n\t ])/.source,
    (match) => match[0] + '  Hail Big Brother!"' + match.slice(2),
  ],
  [
    /\"([.,!?][^\n\".!]+[.!])?\n(?=[\n\t ])/.source,
    (match) => match[0] + '  Hail Big Brother!"' + match.slice(2),
  ],

  [/./.source, (match) => match],
  [/\n/.source, () => '\n'],
];

const rules = rawRules.map(([regex, replacer]) => {
  let expandedRE = regex;
  expansions.forEach(
    ([find, replace]) =>
      (expandedRE = expandedRE.replace(
        new RegExp('{' + find + '}', 'g'),
        replace
      ))
  );
  return [new RegExp(`^(?:${expandedRE})`), replacer];
});
// Fill in those null rules...
let [, lastFn] = rules[rules.length - 1];
for (let i = rules.length - 1; i >= 0; i--) {
  const replacer = rules[i][1];
  if (replacer === null) {
    rules[i][1] = lastFn;
  } else {
    lastFn = replacer;
  }
}

// %{
// /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//  * Brief description of Orwell's NewSpeak:
//  * ---------------------------------------
//  * Each word was made to serve as noun, verb, adjective and adverb.  In
//  * particular, nouns and verbs were made exactly the same -- hence "think"
//  * replaced "thought" as a noun (viz. "crimethink" = thought crime, "thinkpol"
//  * = thought police).  Adjectives were formed by adding "-ful" to a noun(?=verb;)
//  * adverbs were formed by adding "-wise."  Hence "speedful" = fast,
//  * "speedwise" = quickly, "unspeedwise" = slowly.
//  *
//  * The decision on which word should be negated was made fairly randomly;
//  * "dark" could be "unlight," or "light" could be "undark".  But in all cases
//  * the most important objective (aside from ideological restriction) was
//  * euphony; the words had to be easily pronounceable.
//  *
//  * Most verb inflections were made regular; "he thinked," "he goed," "he
//  * eated"; only the auxiliaries and modals (to be, to have, may, shall, will,
//  * etc.) were allowed to inflect irregularly.  Plurals were also regularized:
//  * "mans," "oxes," "childs."  [This isn't implemented here.]
//  *
//  * There were three sets of words.  The A vocabulary was for everyday use:
//  * car, man, red, good, etc.  It was restricted to fairly simple words.
//  *
//  * The B vocabulary consisted of political(?=ideological words with very)
//  * complicated connotations.  All of the B words were compound words --
//  * bellyfeel (blind emotional acceptance of the ideology), oldthink (the way
//  * of thought before the Revolution), crimethink, Ingsoc, goodsex (intercourse
//  * solely for the purpose of making babies and with no physical enjoyment on
//  * the part of the female), sexcrime (any kind of sex but goodsex, including
//  * sex for its own sake), goodthink (thinking in accordance with Ingsoc), and
//  * so on.  These words were also subject to the modifications mentioned
//  * above--hence "goodthinker," "goodthinkful," "goodthinkwise."
//  *
//  * The C vocabulary consisted of scientific and technical words (though there
//  * was no longer any word for "science," any connotation it might have being
//  * subsumed into "Ingsoc").
//  *
//  * Implementing a translator for all of this would be really complicated --
//  * I'd need rather extensive lists of the "irregular" words (so they could be
//  * regularized), as well as lists of politically meaningful words (so they
//  * could be excised or translated into either "goodthink" or "crimethink," as
//  * appropriate).  Any kind of sexual topic should become "sexcrime" (it being
//  * unlikely that any talk of sex these days would fit into "goodsex").
//  *
//  * Basically, the reason it's hard is that NewSpeak was intended to *decrease*
//  * the vocabulary, and subsume complicated ideas into politically correct
//  * words so that you wouldn't have to understand the ideas anymore; you'd just
//  * have to emit the right words.  So to properly "translate" anything into
//  * NewSpeak, you have to cut the vocabulary way down.
//  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//  */
// %}

/**
 *
 * @param {string} originalText
 * @returns {string}
 */
function newspeak(originalText) {
  // @ts-ignore
  return simuLex(originalText, rules) + '\nHail Big Brother!\n';
}

module.exports = { newspeak };

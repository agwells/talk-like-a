/**
 * Hillbilly text filter.
 *
 * @copyright (c) 1993 Duane Paulson <ci922@cleveland.freenet.edu> "dap"
 * @copyright (c) 2019 Aaron Wells (JavaScript port)
 * @license GPL-2+
 * @author Aaron Wells
 */
const sameCapReplacer = require('./lib').sameCapReplacer;

/**
 * @param {string} originalString
 * @returns {string}
 */
function jethro(originalString) {
  return (
    originalString
      // {SW}[Gg]reetings{EW}	|
      // {SW}[Hh]i{EW}		|
      // {SW}[Hh]ello{EW}	SESUB("Howdy");
      .replace(/\b(?:[Gg]reetings|[Hh]i|[Hh]ello)\b/g, sameCapReplacer('Howdy'))
      // {SW}[Bb]ye{EW}		|
      // {SW}[Gg]oodbye{EW}	SESUB("Y'all come back now, heah?");
      .replace(
        /\b(?:[Bb]ye|[Gg]oodbye)\b/g,
        sameCapReplacer("Y'all come back now, heah?")
      )
      // {SW}[Hh]ear{EW}	SESUB("Heah");
      .replace(/\b[Hh]ear\b/g, sameCapReplacer('Heah'))
      // {SW}[Cc]ar{EW}		|
      // {SW}[Aa]uto{EW}		|
      // {SW}[Aa]utomobile{EW}	SESUB("Gasoline buggy");
      .replace(
        /\b(?:[Cc]ar|[Aa]uto|[Aa]utomobile)\b/g,
        sameCapReplacer('Gasoline  buggy')
      )
      // {SW}[Rr]elax{EW}	SESUB("Set a spell -- put yore feet up");
      .replace(
        /\b[Rr]elax\b/g,
        sameCapReplacer('Set a spell -- put your feet up')
      )
      // [Ss]wimming{BW}pool	SUB("Cement pond");
      .replace(/\b[Ss]wimming\s+pool/g, sameCapReplacer('Cement pond'))
      // [Pp]ool{BW}table	SUB("Fancy eatin table");
      .replace(/\b[Pp]ool\s+table/g, sameCapReplacer('Fancy eating table'))
      // [Pp]ool{BW}cue		|
      // [Cc]ue{BW}stick		SUB("Fancy pot passer");
      .replace(
        /\b(?:[Pp]ool\s+cue|[Cc]ue\s+stick)/g,
        sameCapReplacer('Fancy pot passer')
      )
      // {SW}[Bb][r]?oil{EW}	|
      // {SW}[Bb]ake{EW}		|
      // {SW}[Ff]ry{EW}		|
      // {SW}[Ss]aute{EW}	|
      // {SW}[Cc]ook{EW}	SESUB("Whomp up")
      .replace(
        /\b(?:[Bb]r?oil|[Bb]ake|[Ff]ry|[Ss]autee?|[Cc]ook)\b/g,
        sameCapReplacer('Whomp up')
      )
      // {SW}[Bb][r]?oiling{EW}	|
      // {SW}[Bb]akeing{EW}	|
      // {SW}[Ff]rying{EW}	|
      // {SW}[Ss]auteing{EW}	|
      // {SW}[Cc]ooking{EW}	SESUB("Whompin up");
      .replace(
        /\b(?:[Bb]r?oiling|[Bb]akeing|[Ff]rying|[Ss]autee?ing|[Cc]ooking)\b/g,
        sameCapReplacer('Whomping up')
      )
      // {SW}[Bb][r]?oiled{EW}	|
      // {SW}[Bb]aked{EW}	|
      // {SW}[Ff]ryed{EW}	|
      // {SW}[Ss]auted{EW}	|
      // {SW}[Cc]ooked{EW}	SESUB("Done whomped up");
      .replace(
        /\b(?:[Bb]r?oiled|[Bb]aked|[Ff]r[yi]ed|[Ss]autee?d)\b/g,
        sameCapReplacer('Done whomped up')
      )
      // {SW}[Bb][r]?oils{EW}	|
      // {SW}[Bb]akes{EW}	|
      // {SW}[Ff]rys{EW}		|
      // {SW}[Ss]autes{EW}	|
      // {SW}[Cc]ooks{EW}	SESUB("Whomps up");
      .replace(
        /\b(?:[Bb]r?oils|[Bb]akes|[Ff]r(?:y|ie)s|[Ss]autee?s|[Cc]ooks)\b/g,
        sameCapReplacer('Whomps up')
      )
      // {SW}[Gg]roceries{EW}	|
      // {SW}[Ff]ood{EW}		SESUB("Vittles");
      .replace(/\b(?:[Gg]roceries|[Ff]ood)\b/g, sameCapReplacer('Vittles'))
      // [Ss]alad		SUB("Slaw");
      .replace(/[Ss]alad/g, sameCapReplacer('Slaw'))
      // [Vv]egetable		SUB("Green");
      .replace(/[Vv]egetable/g, sameCapReplacer('Green'))
      // [Pp]otato		SUB("Tater");
      .replace(/[Pp]otato/g, sameCapReplacer('Tater'))
      // {SW}[Tt]omato		SSUB("Tuhmater");
      .replace(/\b[Tt]omato/g, sameCapReplacer('Tuhmater'))
      // {SW}[Rr]hubarb{EW}	SESUB("Pie plant");
      .replace(/\b[Rr]hubarb\b/g, sameCapReplacer('Pie plant'))
      // {SW}[Ll]iquor{EW}	|
      // {SW}[Ww]hisk[e]?y{EW}	|
      // {SW}[Ss]cotch{EW}	|
      // {SW}[Bb]ourbon{EW}	|
      // {SW}[Gg]in{EW}		|
      // {SW}[Vv]odka{EW}	|
      // {SW}[Tt]equila{EW}	|
      // {SW}[Ll]iqueur{EW}	SESUB("Rheumatiz medcin");
      .replace(
        /\b(?:[Ll]iqu(?:o|eu)r|[Ww]hiske?y|[Ss]cotch|[Bb]ourbon|[Gg]in|[Vv]odka|[Tt]equila)\b/g,
        sameCapReplacer('Rheumatiz medcin')
      )
      // {SW}[Bb]ooze{EW}	SESUB("Corn likker");
      .replace(/\b[Bb]ooze\b/g, sameCapReplacer('Corn likker'))
      // {SW}[Cc]ocktail{EW}	|
      // {SW}[Mm]ixed{BW}drink{EW} SESUB("Waste of good likker");
      .replace(
        /\b(?:[Cc]ocktail|[Mm]ixed\s+drink)\b/g,
        sameCapReplacer('Waste of good likker')
      )
      // {SW}[Bb]ar{EW}		SESUB("Dance hall");
      .replace(/\b[Bb]ar\b/g, sameCapReplacer('Dance hall'))
      // {SW}[Bb]ars{EW}		SESUB("Dance halls");
      .replace(/\b[Bb]ars\b/g, sameCapReplacer('Dance halls'))
      // {SW}[Ss]aloon		|
      // {SW}[Cc]ocktail{BW}lounge SESUB("Dance hall");
      .replace(
        /\b(?:[Ss]aloon|[Cc]ocktail\s+lounge)/g,
        sameCapReplacer('Dance hall')
      )
      // {SW}[Ww]hore		|
      // {SW}[Pp]rostitute	|
      // {SW}[Ss]lut		SSUB("Dance hall girl");
      .replace(
        /\b(?:[Ww]hore|[Pp]rostitute|[Ss]lut)/g,
        sameCapReplacer('Dance hall girl')
      )
      // {SW}[Ss]ecret{BW}agent{EW} |
      // {SW}[Ss]py{EW}		|
      // {SW}007{EW}		SESUB("Double nought spy");
      .replace(
        /\b(?:[Ss]ecret\s+agent|[Ss]py|007)\b/g,
        sameCapReplacer('Double nought spy')
      )
      // {SW}[Zz]ero{EW}		SESUB("Nought");
      .replace(/\b[Zz]ero\b/g, sameCapReplacer('Nought'))
      // {SW}[Pp]ants{EW}	SESUB("Trousers");
      .replace(/\b[Pp]ants\b/g, sameCapReplacer('Trousers'))
      // {SW}[Jj]eans{EW}	|
      // {SW}[Dd]ungarees{EW}	|
      // {SW}[Ll]evi[']?s{EW}	SESUB("Overhalls");
      .replace(
        /\b([Jj]eans|[Dd]ungarees|[Ll]evi'?s)\b/g,
        sameCapReplacer('Overhalls')
      )
      // {SW}[Ss]hoe		SSUB("High-button shoe");
      .replace(/\b[Ss]hoe/g, sameCapReplacer('High-button shoe'))
      // {SW}[Jj]acket		SSUB("Coat");
      .replace(/\b[Jj]acket/g, sameCapReplacer('Coat'))
      // {SW}[Ss]hotgun		SSUB("Fowlin piece");
      .replace(/\b[Ss]hotgun/g, sameCapReplacer('Fowlin piece'))
      // {SW}[Rr]evolver		|
      // {SW}[Gg]un		SSUB("Shootin iron");
      .replace(/\b([Rr]evolver|[Gg]un)/g, sameCapReplacer('Shooting iron'))
      // {SW}[Rr]ifle		SSUB("Ozark longrifle");
      .replace(/\b[Rr]ifle/g, sameCapReplacer('Ozark longrifle'))
      // {SW}[Ll]ibrar[yi]	SSUB("Liberry");
      .replace(/\b[Ll]ibrar[yi]/g, sameCapReplacer('Liberry'))
      // [Ww]ash			SUB("Warsh");
      .replace(/[Ww]ash/g, sameCapReplacer('Warsh'))
      // [Ff]amily		SUB("Fambly");
      .replace(/[Ff]amily/g, sameCapReplacer('Fambly'))
      // [Ff]ry{BW}pan		|
      // [Ff]rying{BW}pan	|
      // [Ss]aute{BW}pan		SUB("Skillet");
      .replace(
        /(?:[Ff]ry|[Ff]rying|[Ss]autee?)\s+pan/g,
        sameCapReplacer('Skillet')
      )
      // {SW}[Aa]nimal		SSUB("Critter");
      .replace(/\b[Aa]nimal/g, sameCapReplacer('Critter'))
      // {SW}FBI{EW}		|
      // {SW}F.B.I.{EW}		|
      // {SW}CIA{EW}		|
      // {SW}C.I.A.{EW}		|
      // {SW}ATF{EW}		|
      // {SW}A.T.F.{EW}		|
      // {SW}IRS{EW}		|
      // {SW}I.R.S.{EW}		|
      // {SW}SS{EW}		|
      // {SW}S.S.{EW}		|
      // {SW}[Ss]elective{BW}[Ss]ervice{EW} |
      // {SW}[Ss]elective{BW}[Ss]ervice{BW}[Ss]ystem{EW} |
      // {SW}[Ss]ecret{BW}[Ss]ervice{EW} SESUB("Revanooers");
      .replace(
        /\b(FBI|F\.B\.I\.|CIA|C\.I\.A\.|ATF|A\.T\.F\.|IRS|I\.R\.S\.|SS|S\.S\.|[Ss]elective\s+[Ss]ervice(\s+[Ss]ystem)?|[Ss]ecret\s+[Ss]ervice)\b/g,
        sameCapReplacer('Revanooers')
      )
      // {SW}[Pp]olice		|
      // {SW}[Pp]oliceman	|
      // {SW}[Ss]heriff		|
      // {SW}[Dd]eputy		|
      // {SW}[Dd]eputy{BW}[Ss]heriff |
      // {SW}[Mm]arshall		|
      // {SW}[Dd]eputy{BW}[Mm]arshall |
      // {SW}[Pp]ark{BW}[Rr]anger |
      // {SW}[Tt]exas{BW}[Rr]anger |
      // {SW}[Hh]ighway{BW}[Pp]atrol SSUB("Constable");
      .replace(
        /\b([Pp]olice((wo)?man)?|[Dd]eputy(\s+([Ss]heriff|[Mm]arshall))?|[Ss]heriff|[Mm]arshall|[Pp]ark\s+[Rr]anger|[Hh]ighway\s+[Pp]atrol)\b/g,
        sameCapReplacer('Constable')
      )
      // {SW}[Mm]other		|
      // {SW}[Mm][ao]mm[ay]? 	|
      // {SW}[Mm]ommie		|
      // {SW}[Mm]om		SSUB("Maw");
      .replace(
        /\b([Mm]other|[Mm][ao]mm[ay]|[Mm]ommie|[Mm]om)/g,
        sameCapReplacer('Maw')
      )
      // {SW}[Mm]a{EW}		SESUB("Maw");
      .replace(/\b[Mm]a\b/g, sameCapReplacer('Maw'))
      // {SW}[Ff]ather		SSUB("Paw");
      .replace(/\b([Ff]ather|[Dd]addy)/g, sameCapReplacer('Paw'))
      // {SW}[Dd]ad{EW}		|
      // {SW}[Dd]addy		|
      // {SW}[Pp]a{EW}		|
      // {SW}[Pp][ao]p{EW}	|
      // {SW}[Pp][ao]pp[ay]?{EW} SESUB("Paw");
      .replace(
        /\b([Dd]addy|([Dd]ad|[Pp]a|[Pp][ao]p|[Pp][ao]pp[ay])\b)/g,
        sameCapReplacer('Paw')
      )
      // {SW}[Gg]randmother{EW}	|
      // {SW}[Gg]randma[w]?{EW}	SESUB("Granny");
      .replace(/\b[Gg]rand(mother|maw?)\b/g, sameCapReplacer('Granny'))
      // {SW}[Gg]randfather{EW}	|
      // {SW}[Gg]ran[d]{1,2}ad[d]?[y]?{EW} |
      // {SW}[Gg]randpop{EW}	|
      // {SW}[Gg]randpa[w]?{EW}	SESUB("Grampy");
      .replace(
        /\b([Gg]randfaher|[Gg]rand{1,2}ad(dy)?|[Gg]randpop|[Gg]randpaw?)\b/g,
        sameCapReplacer('Grampy')
      )
      // {SW}[Mm]y{EW}		SESUB("Mah");
      .replace(/\b[Mm]y\b/g, sameCapReplacer('Mah'))
      // {SW}them{EW}		SESUB("em");
      .replace(/\bthem\b/g, 'em')
      // [Dd]og			SUB("Dawg");
      .replace(/[Dd]og/g, sameCapReplacer('Dawg'))
      // [Ll]awyer		|
      // [Ll]egal{BW}counc[ei]l	|
      // [Ll]egal{BW}councillor	|
      // [Aa]ttorney		|
      // [Aa]ttorney{BW}[Aa]t{BW}[Ll]aw SUB("City slicker");
      .replace(
        /([Ll]awyer|[Ll]egal\s+counc[ei]l|[Llegal]\s+councillor|[Aa]ttorney(\s+[Aa]t\s+[Ll]aw)?)/g,
        'City slicker'
      )
      // {SW}[Tt]han{EW}		SESUB("Then");
      .replace(/\b[Tt]han\b/g, sameCapReplacer('Then'))
      // [Cc]haracterize		SUB("Show");
      .replace(/[Cc]haracteri[zs]e/g, sameCapReplacer('Show'))
      // {SW}[Vv]ery{EW}		|
      // {SW}[Ee]xtremely{EW}	|
      // {SW}[Rr]eally{EW}	|
      // {SW}[Rr]eal{EW}		SESUB("Right");
      .replace(
        /\b([[Vv]ery|[Ee]xtremely|[Rr]eal(ly)?)\b/g,
        sameCapReplacer('Right')
      )
      // {SW}[Hh]aven't{EW}	|
      // {SW}[Ii]sn't{EW}	|
      // {SW}[Aa]ren't{EW}	SESUB("Aint");
      .replace(/\b([Hh]aven't|[Ii]sn't|[Aa]ren't)\b/g, sameCapReplacer('Aint'))
      // {SW}[Ss]aid{EW}		|
      // {SW}[Ss]ays{EW}		SESUB("Sez");
      .replace(/\b([Ss]aid|[Ss]ays)\b/g, sameCapReplacer('Sez'))
      // {SW}[Aa]re{EW}		SESUB("Is");
      .replace(/\b[Aa]re\b/g, sameCapReplacer('Is'))
      // {SW}[Ss]hould{EW}	SESUB("Ortta");
      .replace(/\b[Ss]hould\b/g, sameCapReplacer('Ortta'))
      // {SW}[Pp]erhaps{EW}	|
      // {SW}[Mm]aybe{EW}	SESUB("Mebbe");
      .replace(/\b([Pp]erhaps|[Mm]aybe)\b/g, sameCapReplacer('Mebbe'))
      // {SW}[Ss]ick{EW}		SESUB("Ailin'");
      .replace(/\b[Ss]ick\b/g, sameCapReplacer('Ailing'))
      // {SW}I'm{BW}not{EW}	SESUB("I aint");
      .replace(/\bI'm{BW}not\b/g, 'I aint')
      // {SW}[Ss]cared{EW}	SESUB("A-skeert");
      .replace(/\b[Ss]cared\b/g, sameCapReplacer('A-skeert'))
      // {SW}[Ss]care		SSUB("Skeer");
      .replace(/\b[Ss]care/g, sameCapReplacer('Skeer'))
      // {SW}[Hh]ave{EW}		SESUB("Got");
      .replace(/\b[Hh]ave\b/g, sameCapReplacer('Got'))
      // {SW}[Pp]ossess{EW}	SESUB("Have");
      .replace(/\b[Pp]ossess\b/g, sameCapReplacer('Have'))
      // {SW}[Hh]elp		SSUB("Hep");
      .replace(/\b[Hh]elp/g, sameCapReplacer('Hep'))
      // {SW}[Tt]ired{EW}	SESUB("Tuckered out");
      .replace(/\b[Tt]ired\b/g, sameCapReplacer('Tuckered out'))
      // {SW}[Cc]ompletely{EW}	SESUB("Plumb");
      .replace(/\b[Cc]ompletely\b/g, sameCapReplacer('Plumb'))
      // {SW}[Dd]runk{EW}	SESUB("A mite woozy");
      .replace(/\b[Dd]runk\b/g, sameCapReplacer('A mite woozy'))

      // {SW}[Yy]es{EW}		SESUB("Yep");
      .replace(/\b[Yy]es\b/g, sameCapReplacer('Yep'))
      // {SW}[Nn]o{EW}		SESUB("Nope");
      .replace(/\b[Nn]o\b/g, sameCapReplacer('Nope'))

      // {SW}[Ii]t{BW}is{EW}	SESUB("Tis");
      .replace(/\b[Ii]t\s+is\b/g, sameCapReplacer('Tis'))
      // {SW}[Aa]t{BW}all{EW}	*(yytext+1)=(char)'A'; SESUB("A tall");
      .replace(/\b[Aa]t\s+all\b/g, sameCapReplacer('A tall'))
      // {SW}[Aa]m{EW}		|
      // {SW}[Ww]as{EW}		|
      // {SW}[Ww]ere{EW}		SESUB("Wuz");
      .replace(/\b([Aa]m|[Ww]as|[Ww]ere)\b/g, sameCapReplacer('Wuz'))
      // {SW}[Ww]asn't{EW}	SESUB("Wasunt");
      .replace(/\b[Ww]asn't\b/g, sameCapReplacer('Wasunt'))
      // {SW}[Ww]ants		SSUB("Is after");
      .replace(/\b[Ww]ants\b/g, sameCapReplacer('Is after'))
      // {SW}[Ww]anted{EW}	SESUB("Was after");
      .replace(/\b[Ww]anted\b/g, sameCapReplacer('Was after'))
      // {SW}[Ww]anting{EW}	SESUB("Hankering after");
      .replace(/\b[Ww]anting\b/g, sameCapReplacer('Hankering after'))
      // {SW}[Dd]oesn't{EW}	|
      // {SW}[Dd]on't{EW}	SESUB("Dasent");
      .replace(/\b([Ddoesn't|[Dd]on't)\b/g, sameCapReplacer('Dasent'))
      // {SW}[Yy]ou'll{EW}	SESUB("Y'all will");
      .replace(/\b[Yy]ou'll\b/g, sameCapReplacer("Y'all will"))
      // {SW}[Mm]ore{EW}		SESUB("Mo");
      .replace(/\b[Mm]ore\b/g, sameCapReplacer('Mo'))
      // tial			SUB("shul");
      .replace(/\Btial/g, 'shul')
      // cious			SUB("shus");
      .replace(/\Bcious/g, 'shus')
      // ious			SUB("yus");
      .replace(/\Bious/g, 'yus')
      // tion			SUB("shun");
      .replace(/\Btion/g, 'shun')
      // {SW}[Cc]an{EW}		SESUB("C'n");
      .replace(/\b[Cc]an\b/g, sameCapReplacer("C'n"))
      // {SW}[Yy]ou{EW}		SESUB("Y'all");
      .replace(/\b[Yy]ou\b/g, sameCapReplacer("Y'all"))
      // {SW}[Tt]he{EW}		SESUB("Duh");
      .replace(/\b[Tt]he\b/g, sameCapReplacer('Duh'))
      // ing			SUB("in");
      .replace(/\Bing\b/g, "in'")
      // {SW}[Tt]oo{EW}		SESUB("Besides");
      .replace(/\b[Tt]oo\b/g, sameCapReplacer('Besides'))
      // {SW}[Tt]o{EW}		SESUB("Tuh");
      .replace(/\b[Tt]o\b/g, sameCapReplacer('Tuh'))
      // {SW}[Aa][n]?{EW}	SESUB("Ah");
      .replace(/\b[Aa][n]?\b/g, sameCapReplacer('Ah'))
      // {SW}[Oo]f{EW}		SESUB("Uv");
      .replace(/\b[Oo]f\b/g, sameCapReplacer('Uv'))
      // {SW}I{EW}		SESUB("Ah");
      .replace(/\bI\b/g, 'Ah')
      // {SW}I'm{EW}		SESUB("Ahm a");
      .replace(/\bI'm\b/g, 'Ahm a')
      // {SW}I'll{EW}		SESUB("Ahl");
      .replace(/\bI'll\b/g, 'Ahl')
      // {SW}I'd{EW}		SESUB("Ah wood");
      .replace(/\bI'd\b/g, 'Ah wood')
      // n't			*(yytext)=(char)'u'; SUB("unt");
      .replace(/\Bn't\b/g, 'unt')
      // 're			SUB(" is");
      .replace(/\B're\b/g, ' is')
      // 've			SUB(" done");
      // TODO: lookbehind
      //      .replace(/(?<=\w)'ve\b/g, ' done')
      .replace(/(\w)'ve\b/g, (match, before) => before + ' done')
      // eed{EW}			ECHO;
      // ed{EW}			ESUB("d");
      // Commented out because it kind of detracts
      // .replace(/(?:(eed)|ed)\b/g, (all, keep) => keep || 'd')
      // {SW}[Oo]wn{EW}		|
      // {SW}[Tt]own{EW}		|
      // {SW}[Dd]own{EW}		|
      // {SW}[Gg]own{EW}		|
      // {SW}[Bb]rown{EW}	ECHO;
      // wn{EW}			ESUB("ed");
      // Rather than list exceptions, it's easier to just list the few irregular
      // verbs in common usage that we actually want to apply this rule to.
      .replace(/[Ff]lown/g, sameCapReplacer('Flied'))
      .replace(
        /([Bb]lo|[Gg]ro|[Ss]ho|[Tt]hro|[Kk]no|\b[Ss]o|\b[Mm]o|[Ss]a|[Dd]ra|[Ss]e)wn\b/g,
        (all, match) => match + 'wed'
      )
      // re{EW}			|
      // er{EW}			ESUB("uh");
      // {SW}[Hh]er{EW}		ECHO;
      // TODO: lookbehind
      //      .replace(/(\Bre|(?<!\b[Hh])\Ber)\b/g, 'uh')
      .replace(/(?:(\b[Hh]er)|re|er)\b/g, (all, keep) => keep || 'uh')
      // {SW}[Ff]or{EW}		SESUB("Fer");
      .replace(/\b[Ff]or\b/g, sameCapReplacer('Fer'))
      // {SW}[Bb]elow{EW}	|
      // {SW}[Kk]now{EW}		|
      // {SW}[Tt]hrow{EW}	|
      // {SW}[Gg]row{EW}		|
      // {SW}[Hh]ow{EW}		|
      // {SW}[Nn]ow{EW}		|
      // {SW}[Bb]row{EW}		|
      // {SW}[Ss]how{EW}		ECHO;
      // ow{EW}			ESUB("er");
      // TODO: lookbehind
      //      .replace(/(?<!\b([Bb]el|[Kk]n|[Tt]hr|[GgBb]r|[HhNn]|[Ss]h))ow\b/g, 'er')
      .replace(
        /(?:(\b(?:[Bb]elow|[Kk]now|[Tt]hrow|[Gg]row|[Hh]ow|[Nn]ow|[Bb]row|[Ss]how))|ow)\b/g,
        (all, keep) => keep || 'er'
      )
      // {SW}[Oo]ur{EW}		|
      // {SW}[Oo]r{EW}		SESUB("Ore");
      .replace(/\b([Oo]ur|[Oo]r)\b/g, sameCapReplacer('Ore'))
      // {SW}[Yy]our		SSUB("Yore");
      .replace(/\b[Yy]our/g, sameCapReplacer('Yore'))
      // [Ee]very		SUB("Ever");
      .replace(/[Ee]very/g, sameCapReplacer('Ever'))
      // !			SUB(". Ye DAWGies!!!");
      .replace(/!(?=(\s|$))/gm, '. Ye DAWGies!!!')
  );
}

module.exports = { jethro };

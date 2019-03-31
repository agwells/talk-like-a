// %{
//  /*
//  **   jethro  v. 1.00 06/10/93
//  **   Duane Paulson <ci922@cleveland.freenet.edu> "dap"
//  **   Hillbilly text filter. Compile with lex, then C.
//  **   syntax will be:
//  **	  jethro <input_file >output_file.
//  **   Public domain. Use at your own risk. Y'all come back now, heah?
//  */
//  /*************************************************************************
// 				REVISION LOG
//  when      ver   who  change
//  --------  ----  ---  -----------------------------------------------------
//  06/10/93  1.00  dap  Initial release.
//  8.May.94  1.10  beg  Fixed for HP-UX
//  *************************************************************************/
// char WhAt[]="@(#)Duane Paulson's hillbilly text filter. (jethro)\n@(#)$Header: jethro.l,v 1.1 94/05/08 23:41:58 bgriffin Final $"
// ;

//  /* jethro.l */
// %e 7000
// %k 5000
// %p 9000
// %n 2000
// %a 9000
// %o 7000

// SW	[\n \"(]
// EW	[\n ".",\"!?):;]
// BW	[\n ]
// #define PUTLAST unput(*(yytext+strlen(yytext)-1));
// #define SUB(A) fprintf(yyout, "%c%s", *A|(*yytext&32), A+1);
// #define SSUB(A) fprintf(yyout, "%c%c%s", *yytext, *A|(*(yytext+1)&32), A+1);
// #define SESUB(A) fprintf(yyout, "%c%c%s", *yytext, *A|(*(yytext+1)&32), A+1); PUTLAST;
// #define ESUB(A) fprintf(yyout, "%c%s", *A|(*yytext&32), A+1); PUTLAST;

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
      .replace(/\b(?:[Gg]reetings|[Hh]i|[Hh]ello)\b/g, sameCap("Howdy"))
      // {SW}[Bb]ye{EW}		|
      // {SW}[Gg]oodbye{EW}	SESUB("Y'all come back now, heah?");
      .replace(
        /\b(?:[Bb]ye|[Gg]oodbye)\b/g,
        sameCap("Y'all come back now, heah?")
      )
      // {SW}[Hh]ear{EW}	SESUB("Heah");
      .replace(/\b[Hh]ear\b/g, sameCap("Heah"))
      // {SW}[Cc]ar{EW}		|
      // {SW}[Aa]uto{EW}		|
      // {SW}[Aa]utomobile{EW}	SESUB("Gasoline buggy");
      .replace(
        /\b(?:[Cc]ar|[Aa]uto|[Aa]utomobile)\b/g,
        sameCap("Gasoline  buggy")
      )
      // {SW}[Rr]elax{EW}	SESUB("Set a spell -- put yore feet up");
      .replace(/\b[Rr]elax\b/g, sameCap("Set a spell -- put your feet up"))
      // [Ss]wimming{BW}pool	SUB("Cement pond");
      .replace(/\b[Ss]wimming\s+pool/g, sameCap("Cement pond"))
      // [Pp]ool{BW}table	SUB("Fancy eatin table");
      .replace(/\b[Pp]ool\s+table/g, sameCap("Fancy eating table"))
      // [Pp]ool{BW}cue		|
      // [Cc]ue{BW}stick		SUB("Fancy pot passer");
      .replace(
        /\b(?:[Pp]ool\s+cue|[Cc]ue\s+stick)/g,
        sameCap("Fancy pot passer")
      )
      // {SW}[Bb][r]?oil{EW}	|
      // {SW}[Bb]ake{EW}		|
      // {SW}[Ff]ry{EW}		|
      // {SW}[Ss]aute{EW}	|
      // {SW}[Cc]ook{EW}	SESUB("Whomp up")
      .replace(
        /\b(?:[Bb]r?oil|[Bb]ake|[Ff]ry|[Ss]autee?|[Cc]ook)\b/g,
        sameCap("Whomp up")
      )
      // {SW}[Bb][r]?oiling{EW}	|
      // {SW}[Bb]akeing{EW}	|
      // {SW}[Ff]rying{EW}	|
      // {SW}[Ss]auteing{EW}	|
      // {SW}[Cc]ooking{EW}	SESUB("Whompin up");
      .replace(
        /\b(?:[Bb]r?oiling|[Bb]akeing|[Ff]rying|[Ss]autee?ing|[Cc]ooking)\b/g,
        sameCap("Whomping up")
      )
      // {SW}[Bb][r]?oiled{EW}	|
      // {SW}[Bb]aked{EW}	|
      // {SW}[Ff]ryed{EW}	|
      // {SW}[Ss]auted{EW}	|
      // {SW}[Cc]ooked{EW}	SESUB("Done whomped up");
      .replace(
        /\b(?:[Bb]r?oiled|[Bb]aked|[Ff]r[yi]ed|[Ss]autee?d)\b/g,
        sameCap("Done whomped up")
      )
      // {SW}[Bb][r]?oils{EW}	|
      // {SW}[Bb]akes{EW}	|
      // {SW}[Ff]rys{EW}		|
      // {SW}[Ss]autes{EW}	|
      // {SW}[Cc]ooks{EW}	SESUB("Whomps up");
      .replace(
        /\b(?:[Bb]r?oils|[Bb]akes|[Ff]r(?:y|ie)s|[Ss]autee?s|[Cc]ooks)\b/g,
        sameCap("Whomps up")
      )
      // {SW}[Gg]roceries{EW}	|
      // {SW}[Ff]ood{EW}		SESUB("Vittles");
      .replace(/\b(?:[Gg]roceries|[Ff]ood)\b/g, sameCap("Vittles"))
      // [Ss]alad		SUB("Slaw");
      .replace(/[Ss]alad/g, sameCap("Slaw"))
      // [Vv]egetable		SUB("Green");
      .replace(/[Vv]egetable/g, sameCap("Green"))
      // [Pp]otato		SUB("Tater");
      .replace(/[Pp]otato/g, sameCap("Tater"))
      // {SW}[Tt]omato		SSUB("Tuhmater");
      .replace(/\b[Tt]omato/g, sameCap("Tuhmater"))
      // {SW}[Rr]hubarb{EW}	SESUB("Pie plant");
      .replace(/\b[Rr]hubarb\b/g, sameCap("Pie plant"))
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
        sameCap("Rheumatiz medcin")
      )
      // {SW}[Bb]ooze{EW}	SESUB("Corn likker");
      .replace(/\b[Bb]ooze\b/g, sameCap("Corn likker"))
      // {SW}[Cc]ocktail{EW}	|
      // {SW}[Mm]ixed{BW}drink{EW} SESUB("Waste of good likker");
      .replace(
        /\b(?:[Cc]ocktail|[Mm]ixed\s+drink)\b/g,
        sameCap("Waste of good likker")
      )
      // {SW}[Bb]ar{EW}		SESUB("Dance hall");
      .replace(/\b[Bb]ar\b/g, sameCap("Dance hall"))
      // {SW}[Bb]ars{EW}		SESUB("Dance halls");
      .replace(/\b[Bb]ars\b/g, sameCap("Dance halls"))
      // {SW}[Ss]aloon		|
      // {SW}[Cc]ocktail{BW}lounge SESUB("Dance hall");
      .replace(/\b(?:[Ss]aloon|[Cc]ocktail\s+lounge)/g, sameCap("Dance hall"))
      // {SW}[Ww]hore		|
      // {SW}[Pp]rostitute	|
      // {SW}[Ss]lut		SSUB("Dance hall girl");
      .replace(
        /\b(?:[Ww]hore|[Pp]rostitute|[Ss]lut)/g,
        sameCap("Dance hall girl")
      )
      // {SW}[Ss]ecret{BW}agent{EW} |
      // {SW}[Ss]py{EW}		|
      // {SW}007{EW}		SESUB("Double nought spy");
      .replace(
        /\b(?:[Ss]ecret\s+agent|[Ss]py|007)\b/g,
        sameCap("Double nought spy")
      )
      // {SW}[Zz]ero{EW}		SESUB("Nought");
      .replace(/\b[Zz]ero\b/g, sameCap("Nought"))
      // {SW}[Pp]ants{EW}	SESUB("Trousers");
      .replace(/\b[Pp]ants\b/g, sameCap("Trousers"))
      // {SW}[Jj]eans{EW}	|
      // {SW}[Dd]ungarees{EW}	|
      // {SW}[Ll]evi[']?s{EW}	SESUB("Overhalls");
      .replace(/\b([Jj]eans|[Dd]ungarees|[Ll]evi'?s)\b/g, sameCap("Overhalls"))
      // {SW}[Ss]hoe		SSUB("High-button shoe");
      .replace(/\b[Ss]hoe/g, sameCap("High-button shoe"))
      // {SW}[Jj]acket		SSUB("Coat");
      .replace(/\b[Jj]acket/g, sameCap("Coat"))
      // {SW}[Ss]hotgun		SSUB("Fowlin piece");
      .replace(/\b[Ss]hotgun/g, sameCap("Fowlin piece"))
      // {SW}[Rr]evolver		|
      // {SW}[Gg]un		SSUB("Shootin iron");
      .replace(/\b([Rr]evolver|[Gg]un)/g, sameCap("Shootin iron"))
      // {SW}[Rr]ifle		SSUB("Ozark longrifle");
      .replace(/\b[Rr]ifle/g, sameCap("Ozark longrifle"))
      // {SW}[Ll]ibrar[yi]	SSUB("Liberry");
      .replace(/\b[Ll]ibrar[yi]/g, sameCap("Liberry"))
      // [Ww]ash			SUB("Warsh");
      .replace(/[Ww]ash/g, sameCap("Warsh"))
      // [Ff]amily		SUB("Fambly");
      .replace(/[Ff]amily/g, sameCap("Fambly"))
      // [Ff]ry{BW}pan		|
      // [Ff]rying{BW}pan	|
      // [Ss]aute{BW}pan		SUB("Skillet");
      .replace(/(?:[Ff]ry|[Ff]rying|[Ss]autee?)\s+pan/g, sameCap("Skillet"))
      // {SW}[Aa]nimal		SSUB("Critter");
      .replace(/\b[Aa]nimal/g, sameCap("Critter"))
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
        sameCap("Revanooers")
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
        sameCap("Constable")
      )
      // {SW}[Mm]other		|
      // {SW}[Mm][ao]mm[ay]? 	|
      // {SW}[Mm]ommie		|
      // {SW}[Mm]om		SSUB("Maw");
      .replace(/\b([Mm]other|[Mm][ao]mm[ay]|[Mm]ommie|[Mm]om)/g, sameCap("Maw"))
      // {SW}[Mm]a{EW}		SESUB("Maw");
      .replace(/\b[Mm]a\b/g, sameCap("Maw"))
      // {SW}[Ff]ather		SSUB("Paw");
      .replace(/\b([Ff]ather|[Dd]addy)/g, sameCap("Paw"))
      // {SW}[Dd]ad{EW}		|
      // {SW}[Dd]addy		|
      // {SW}[Pp]a{EW}		|
      // {SW}[Pp][ao]p{EW}	|
      // {SW}[Pp][ao]pp[ay]?{EW} SESUB("Paw");
      .replace(
        /\b([Dd]addy|([Dd]ad|[Pp]a|[Pp][ao]p|[Pp][ao]pp[ay])\b)/g,
        sameCap("Paw")
      )
      // {SW}[Gg]randmother{EW}	|
      // {SW}[Gg]randma[w]?{EW}	SESUB("Granny");
      .replace(/\b[Gg]rand(mother|maw?)\b/g, sameCap("Granny"))
      // {SW}[Gg]randfather{EW}	|
      // {SW}[Gg]ran[d]{1,2}ad[d]?[y]?{EW} |
      // {SW}[Gg]randpop{EW}	|
      // {SW}[Gg]randpa[w]?{EW}	SESUB("Grampy");
      .replace(
        /\b([Gg]randfaher|[Gg]rand{1,2}ad(dy)?|[Gg]randpop|[Gg]randpaw?)\b/g,
        sameCap("Grampy")
      )
      // {SW}[Mm]y{EW}		SESUB("Mah");
      .replace(/\b[Mm]y\b/g, sameCap("Mah"))
      // {SW}them{EW}		SESUB("em");
      .replace(/\bthem\b/g, "em")
      // [Dd]og			SUB("Dawg");
      .replace(/[Dd]og/g, sameCap("Dawg"))
      // [Ll]awyer		|
      // [Ll]egal{BW}counc[ei]l	|
      // [Ll]egal{BW}councillor	|
      // [Aa]ttorney		|
      // [Aa]ttorney{BW}[Aa]t{BW}[Ll]aw SUB("City slicker");
      .replace(
        /([Ll]awyer|[Ll]egal\s+counc[ei]l|[Llegal]\s+councillor|[Aa]ttorney(\s+[Aa]t\s+[Ll]aw)?)/g,
        "City slicker"
      )
      // {SW}[Tt]han{EW}		SESUB("Then");
      .replace(/\b[Tt]han\b/g, sameCap("Then"))
      // [Cc]haracterize		SUB("Show");
      .replace(/[Cc]haracteri[zs]e/g, sameCap("Show"))
      // {SW}[Vv]ery{EW}		|
      // {SW}[Ee]xtremely{EW}	|
      // {SW}[Rr]eally{EW}	|
      // {SW}[Rr]eal{EW}		SESUB("Right");
      .replace(/\b([[Vv]ery|[Ee]xtremely|[Rr]eal(ly)?)\b/g, sameCap("Right"))
      // {SW}[Hh]aven't{EW}	|
      // {SW}[Ii]sn't{EW}	|
      // {SW}[Aa]ren't{EW}	SESUB("Aint");
      .replace(/\b([Hh]aven't|[Ii]sn't|[Aa]ren't)\b/g, sameCap("Aint"))
      // {SW}[Ss]aid{EW}		|
      // {SW}[Ss]ays{EW}		SESUB("Sez");
      .replace(/\b([Ss]aid|[Ss]ays)\b/g, sameCap("Sez"))
      // {SW}[Aa]re{EW}		SESUB("Is");
      .replace(/\b[Aa]re\b/g, sameCap("Is"))
      // {SW}[Ss]hould{EW}	SESUB("Ortta");
      .replace(/\b[Ss]hould\b/g, sameCap("Ortta"))
      // {SW}[Pp]erhaps{EW}	|
      // {SW}[Mm]aybe{EW}	SESUB("Mebbe");
      .replace(/\b([Pp]erhaps|[Mm]aybe)\b/g, sameCap("Mebbe"))
      // {SW}[Ss]ick{EW}		SESUB("Ailin'");
      .replace(/\b[Ss]ick\b/g, sameCap("Ailing"))
      // {SW}I'm{BW}not{EW}	SESUB("I aint");
      .replace(/\bI'm{BW}not\b/g, "I aint")
      // {SW}[Ss]cared{EW}	SESUB("A-skeert");
      .replace(/\b[Ss]cared\b/g, sameCap("A-skeert"))
      // {SW}[Ss]care		SSUB("Skeer");
      .replace(/\b[Ss]care/g, sameCap("Skeer"))
      // {SW}[Hh]ave{EW}		SESUB("Got");
      .replace(/\b[Hh]ave\b/g, sameCap("Got"))
      // {SW}[Pp]ossess{EW}	SESUB("Have");
      .replace(/\b[Pp]ossess\b/g, sameCap("Have"))
      // {SW}[Hh]elp		SSUB("Hep");
      .replace(/\b[Hh]elp/g, sameCap("Hep"))
      // {SW}[Tt]ired{EW}	SESUB("Tuckered out");
      .replace(/\b[Tt]ired\b/g, sameCap("Tuckered out"))
      // {SW}[Cc]ompletely{EW}	SESUB("Plumb");
      .replace(/\b[Cc]ompletely\b/g, sameCap("Plumb"))
      // {SW}[Dd]runk{EW}	SESUB("A mite woozy");
      .replace(/\b[Dd]runk\b/g, sameCap("A mite woozy"))

      // {SW}[Yy]es{EW}		SESUB("Yep");
      .replace(/\b[Yy]es\b/g, sameCap("Yep"))
      // {SW}[Nn]o{EW}		SESUB("Nope");
      .replace(/\b[Nn]o\b/g, sameCap("Nope"))

      // {SW}[Ii]t{BW}is{EW}	SESUB("Tis");
      .replace(/\b[Ii]t\s+is\b/g, sameCap("Tis"))
      // {SW}[Aa]t{BW}all{EW}	*(yytext+1)=(char)'A'; SESUB("A tall");
      .replace(/\b[Aa]t\s+all\b/g, sameCap("A tall"))
      // {SW}[Aa]m{EW}		|
      // {SW}[Ww]as{EW}		|
      // {SW}[Ww]ere{EW}		SESUB("Wuz");
      .replace(/\b([Aa]m|[Ww]as|[Ww]ere)\b/g, sameCap("Wuz"))
      // {SW}[Ww]asn't{EW}	SESUB("Wasunt");
      .replace(/\b[Ww]asn't\b/g, sameCap("Wasunt"))
      // {SW}[Ww]ants		SSUB("Is after");
      .replace(/\b[Ww]ants\b/g, sameCap("Is after"))
      // {SW}[Ww]anted{EW}	SESUB("Was after");
      .replace(/\b[Ww]anted\b/g, sameCap("Was after"))
      // {SW}[Ww]anting{EW}	SESUB("Hankering after");
      .replace(/\b[Ww]anting\b/g, sameCap("Hankering after"))
      // {SW}[Dd]oesn't{EW}	|
      // {SW}[Dd]on't{EW}	SESUB("Dasent");
      .replace(/\b([Ddoesn't|[Dd]on't)\b/g, sameCap("Dasent"))
      // {SW}[Yy]ou'll{EW}	SESUB("Y'all will");
      .replace(/\b[Yy]ou'll\b/g, sameCap("Y'all will"))
      // {SW}[Mm]ore{EW}		SESUB("Mo");
      .replace(/\b[Mm]ore\b/g, sameCap("Mo"))
      // tial			SUB("shul");
      .replace(/\Btial/g, "shul")
      // cious			SUB("shus");
      .replace(/\Bcious/g, "shus")
      // ious			SUB("yus");
      .replace(/\Bious/g, "yus")
      // tion			SUB("shun");
      .replace(/\Btion/g, "shun")
      // {SW}[Cc]an{EW}		SESUB("C'n");
      .replace(/\b[Cc]an\b/g, sameCap("C'n"))
      // {SW}[Yy]ou{EW}		SESUB("Y'all");
      .replace(/\b[Yy]ou\b/g, sameCap("Y'all"))
      // {SW}[Tt]he{EW}		SESUB("Duh");
      .replace(/\b[Tt]he\b/g, sameCap("Duh"))
      // ing			SUB("in");
      .replace(/\Bing\b/g, "in'")
      // {SW}[Tt]oo{EW}		SESUB("Besides");
      .replace(/\b[Tt]oo\b/g, sameCap("Besides"))
      // {SW}[Tt]o{EW}		SESUB("Tuh");
      .replace(/\b[Tt]o\b/g, sameCap("Tuh"))
      // {SW}[Aa][n]?{EW}	SESUB("Ah");
      .replace(/\b[Aa][n]?\b/g, sameCap("Ah"))
      // {SW}[Oo]f{EW}		SESUB("Uv");
      .replace(/\b[Oo]f\b/g, sameCap("Uv"))
      // {SW}I{EW}		SESUB("Ah");
      .replace(/\bI\b/g, "Ah")
      // {SW}I'm{EW}		SESUB("Ahm a");
      .replace(/\bI'm\b/g, "Ahm a")
      // {SW}I'll{EW}		SESUB("Ahl");
      .replace(/\bI'll\b/g, "Ahl")
      // {SW}I'd{EW}		SESUB("Ah wood");
      .replace(/\bI'd\b/g, "Ah wood")
      // n't			*(yytext)=(char)'u'; SUB("unt");
      .replace(/\Bn't\b/g, "unt")
      // 're			SUB(" is");
      .replace(/(?<=\w)'re\b/g, " is")
      // 've			SUB(" done");
      .replace(/(?<=\w)'ve\b/g, " done")
      // eed{EW}			ECHO;
      // ed{EW}			ESUB("d");
      // .replace(/(?<!e)ed\b/g, "'d")
      // {SW}[Oo]wn{EW}		|
      // {SW}[Tt]own{EW}		|
      // {SW}[Dd]own{EW}		|
      // {SW}[Gg]own{EW}		|
      // {SW}[Bb]rown{EW}	ECHO;
      // wn{EW}			ESUB("ed");
      .replace(/(?<!\b([Oo]|[TtDdGg]o|[Bb]ro))wn\b/g, "ed")
      // re{EW}			|
      // er{EW}			ESUB("uh");
      // {SW}[Hh]er{EW}		ECHO;
      .replace(/(\Bre|(?<!\b[Hh])\Ber)\b/g, "uh")
      // {SW}[Ff]or{EW}		SESUB("Fer");
      .replace(/\b[Ff]or\b/g, sameCap("Fer"))
      // {SW}[Bb]elow{EW}	|
      // {SW}[Kk]now{EW}		|
      // {SW}[Tt]hrow{EW}	|
      // {SW}[Gg]row{EW}		|
      // {SW}[Hh]ow{EW}		|
      // {SW}[Nn]ow{EW}		|
      // {SW}[Bb]row{EW}		|
      // {SW}[Ss]how{EW}		ECHO;
      // ow{EW}			ESUB("er");
      .replace(/(?<!\b([Bb]el|[Kk]n|[Tt]hr|[GgBb]r|[HhNn]|[Ss]h))ow\b/g, "er")
      // {SW}[Oo]ur{EW}		|
      // {SW}[Oo]r{EW}		SESUB("Ore");
      .replace(/\b([Oo]ur|[Oo]r)\b/g, sameCap("Ore"))
      // {SW}[Yy]our		SSUB("Yore");
      .replace(/\b[Yy]our/g, sameCap("Yore"))
      // [Ee]very		SUB("Ever");
      .replace(/[Ee]very/g, sameCap("Ever"))
      // !			SUB(". Ye DAWGies!!!");
      .replace(/!(?=(\s|$))/gm, ". Ye DAWGies!!!")
  );
}

module.exports = jethro;

/**
 * A helper function equivalent to the "SSUB/SESUB" macro in the original. It creates
 * a regex replace callback method, which will make sure the replacement text
 * has the same initial capitalization as the original text.
 * @param {string} replacement
 */
function sameCap(replacement) {
  const lowercaseReplacement =
    replacement[0].toLowerCase() + replacement.slice(1);
  const uppercaseReplacement =
    replacement[0].toUpperCase() + replacement.slice(1);
  return function(match) {
    if (STARTS_WITH_UPPER.test(match)) {
      return uppercaseReplacement;
    } else {
      return lowercaseReplacement;
    }
  };
}

const STARTS_WITH_UPPER = new RegExp("^[A-Z]");

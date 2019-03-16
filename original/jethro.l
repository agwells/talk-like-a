
 /* jethro.l */
%e 7000
%k 5000
%p 9000
%n 2000
%a 9000
%o 7000

SW	[\n \"(]
EW	[\n ".",\"!?):;]
BW	[\n ]

%{
 /* 
 **   jethro  v. 1.00 06/10/93
 **   Duane Paulson <ci922@cleveland.freenet.edu> "dap"
 **   Hillbilly text filter. Compile with lex, then C.
 **   syntax will be:
 **	  jethro <input_file >output_file.
 **   Public domain. Use at your own risk. Y'all come back now, heah?
 */
 /*************************************************************************
				REVISION LOG
 when      ver   who  change
 --------  ----  ---  -----------------------------------------------------
 06/10/93  1.00  dap  Initial release.
 8.May.94  1.10  beg  Fixed for HP-UX
 *************************************************************************/

#define PUTLAST unput(*(yytext+strlen(yytext)-1));
#define SUB(A) fprintf(yyout, "%c%s", *A|(*yytext&32), A+1);
#define SSUB(A) fprintf(yyout, "%c%c%s", *yytext, *A|(*(yytext+1)&32), A+1);
#define SESUB(A) fprintf(yyout, "%c%c%s", *yytext, *A|(*(yytext+1)&32), A+1); PUTLAST;
#define ESUB(A) fprintf(yyout, "%c%s", *A|(*yytext&32), A+1); PUTLAST;

#include <string.h>

char WhAt[]="@(#)Duane Paulson's hillbilly text filter. (jethro)\n@(#)$Header: jethro.l,v 1.1 94/05/08 23:41:58 bgriffin Final $"
;

%}

%%

{SW}[Gg]reetings{EW}	|
{SW}[Hh]i{EW}		|
{SW}[Hh]ello{EW}	SESUB("Howdy");
{SW}[Bb]ye{EW}		|
{SW}[Gg]oodbye{EW}	SESUB("Y'all come back now, heah?");
{SW}[Hh]ear{EW}	SESUB("Heah");
{SW}[Cc]ar{EW}		|
{SW}[Aa]uto{EW}		|
{SW}[Aa]utomobile{EW}	SESUB("Gasoline buggy");
{SW}[Rr]elax{EW}	SESUB("Set a spell -- put yore feet up");
[Ss]wimming{BW}pool	SUB("Cement pond");
[Pp]ool{BW}table	SUB("Fancy eatin table");
[Pp]ool{BW}cue		|
[Cc]ue{BW}stick		SUB("Fancy pot passer");
{SW}[Bb][r]?oil{EW}	|
{SW}[Bb]ake{EW}		|
{SW}[Ff]ry{EW}		|
{SW}[Ss]aute[e]?{EW}	|
{SW}[Cc]ook{EW}	SESUB("Whomp up");
{SW}[Bb][r]?oiling{EW}	|
{SW}[Bb]akeing{EW}	|
{SW}[Ff]rying{EW}	|
{SW}[Ss]aute[e]?ing{EW}	|
{SW}[Cc]ooking{EW}	SESUB("Whompin up");
{SW}[Bb][r]?oiled{EW}	|
{SW}[Bb]aked{EW}	|
{SW}[Ff]r[yi]ed{EW}	|
{SW}[Ss]aute[e]?d{EW}	|
{SW}[Cc]ooked{EW}	SESUB("Done whomped up");
{SW}[Bb][r]?oils{EW}	|
{SW}[Bb]akes{EW}	|
{SW}[Ff]r[yi][e]?s{EW}		|
{SW}[Ss]aute[e]?s{EW}	|
{SW}[Cc]ooks{EW}	SESUB("Whomps up");
{SW}[Gg]roceries{EW}	|
{SW}[Ff]ood{EW}		SESUB("Vittles");
[Ss]alad		SUB("Slaw");
[Vv]egetable		SUB("Green");
[Pp]otato		SUB("Tater");
{SW}[Tt]omato		SSUB("Tuhmater");
{SW}[Rr]hubarb{EW}	SESUB("Pie plant");
{SW}[Ll]iquor{EW}	|
{SW}[Ww]hisk[e]?y{EW}	|
{SW}[Ss]cotch{EW}	|
{SW}[Bb]ourbon{EW}	|
{SW}[Gg]in{EW}		|
{SW}[Vv]odka{EW}	|
{SW}[Tt]equila{EW}	|
{SW}[Ll]iqueur{EW}	SESUB("Rheumatiz medcin");
{SW}[Bb]ooze{EW}	SESUB("Corn likker");
{SW}[Cc]ocktail{EW}	|
{SW}[Mm]ixed{BW}drink{EW} SESUB("Waste of good likker");
{SW}[Bb]ar{EW}		SESUB("Dance hall");
{SW}[Bb]ars{EW}		SESUB("Dance halls");
{SW}[Ss]aloon		|
{SW}[Cc]ocktail{BW}lounge SESUB("Dance hall");
{SW}[Ww]hore		|
{SW}[Pp]rostitute	|
{SW}[Ss]lut		SSUB("Dance hall girl");
{SW}[Ss]ecret{BW}agent{EW} |
{SW}[Ss]py{EW}		|
{SW}007{EW}		SESUB("Double nought spy");
{SW}[Zz]ero{EW}		SESUB("Nought");
{SW}[Pp]ants{EW}	SESUB("Trousers");
{SW}[Jj]eans{EW}	|
{SW}[Dd]ungarees{EW}	|
{SW}[Ll]evi[']?s{EW}	SESUB("Overhalls");
{SW}[Ss]hoe		SSUB("High-button shoe");
{SW}[Jj]acket		SSUB("Coat");
{SW}[Ss]hotgun		SSUB("Fowlin piece");
{SW}[Rr]evolver		|
{SW}[Gg]un		SSUB("Shootin iron");
{SW}[Rr]ifle		SSUB("Ozark longrifle");
{SW}[Ll]ibrar[yi]	SSUB("Liberry");
[Ww]ash			SUB("Warsh");
[Ff]amily		SUB("Fambly");
[Ff]ry{BW}pan		|
[Ff]rying{BW}pan	|
[Ss]aute{BW}pan		SUB("Skillet");
{SW}[Aa]nimal		SSUB("Critter");
{SW}FBI{EW}		|
{SW}F.B.I.{EW}		|
{SW}CIA{EW}		|
{SW}C.I.A.{EW}		|
{SW}ATF{EW}		|
{SW}A.T.F.{EW}		|
{SW}IRS{EW}		|
{SW}I.R.S.{EW}		|
{SW}SS{EW}		|
{SW}S.S.{EW}		|
{SW}[Ss]elective{BW}[Ss]ervice{EW} |
{SW}[Ss]elective{BW}[Ss]ervice{BW}[Ss]ystem{EW} |
{SW}[Ss]ecret{BW}[Ss]ervice{EW} SESUB("Revanooers");
{SW}[Pp]olice		|
{SW}[Pp]oliceman	|
{SW}[Ss]heriff		|
{SW}[Dd]eputy		|
{SW}[Dd]eputy{BW}[Ss]heriff |
{SW}[Mm]arshall		|
{SW}[Dd]eputy{BW}[Mm]arshall |
{SW}[Pp]ark{BW}[Rr]anger |
{SW}[Tt]exas{BW}[Rr]anger |
{SW}[Hh]ighway{BW}[Pp]atrol SSUB("Constable");

{SW}[Mm]other		|
{SW}[Mm][ao]mm[ay]? 	|
{SW}[Mm]ommie		|
{SW}[Mm]om		SSUB("Maw");
{SW}[Mm]a{EW}		SESUB("Maw");
{SW}[Ff]ather		SSUB("Paw");
{SW}[Dd]ad{EW}		|
{SW}[Dd]addy		|
{SW}[Pp]a{EW}		|
{SW}[Pp][ao]p{EW}	|
{SW}[Pp][ao]pp[ay]?{EW} SESUB("Paw");
{SW}[Gg]randmother{EW}	|
{SW}[Gg]randma[w]?{EW}	SESUB("Granny");
{SW}[Gg]randfather{EW}	|
{SW}[Gg]ran[d]{1,2}ad[d]?[y]?{EW} |
{SW}[Gg]randpop{EW}	|
{SW}[Gg]randpa[w]?{EW}	SESUB("Grampy");
{SW}[Mm]y{EW}		SESUB("Mah");
{SW}them{EW}		SESUB("em");
[Dd]og			SUB("Dawg");
[Ll]awyer		|
[Ll]egal{BW}counc[ei]l	|
[Ll]egal{BW}councillor	|
[Aa]ttorney		|
[Aa]ttorney{BW}[Aa]t{BW}[Ll]aw SUB("City slicker");

{SW}[Tt]han{EW}		SESUB("Then");
[Cc]haracterize		SUB("Show");
{SW}[Vv]ery{EW}		|
{SW}[Ee]xtremely{EW}	|
{SW}[Rr]eally{EW}	|
{SW}[Rr]eal{EW}		SESUB("Right");
{SW}[Hh]aven't{EW}	|
{SW}[Ii]sn't{EW}	|
{SW}[Aa]ren't{EW}	SESUB("Aint");
{SW}[Ss]aid{EW}		|
{SW}[Ss]ays{EW}		SESUB("Sez");		
{SW}[Aa]re{EW}		SESUB("Is");
{SW}[Ss]hould{EW}	SESUB("Ortta");
{SW}[Pp]erhaps{EW}	|
{SW}[Mm]aybe{EW}	SESUB("Mebbe");
{SW}[Ss]ick{EW}		SESUB("Ailin'");
{SW}I'm{BW}not{EW}	SESUB("I aint");
{SW}[Ss]cared{EW}	SESUB("A-skeert");
{SW}[Ss]care		SSUB("Skeer");
{SW}[Hh]ave{EW}		SESUB("Got");
{SW}[Pp]ossess{EW}	SESUB("Have");
{SW}[Hh]elp		SSUB("Hep");
{SW}[Tt]ired{EW}	SESUB("Tuckered out");
{SW}[Cc]ompletely{EW}	SESUB("Plumb");
{SW}[Dd]runk{EW}	SESUB("A mite woozy");

{SW}[Yy]es{EW}		SESUB("Yep");
{SW}[Nn]o{EW}		SESUB("Nope");

{SW}[Ii]t{BW}is{EW}	SESUB("Tis");
{SW}[Aa]t{BW}all{EW}	*(yytext+1)=(char)'A'; SESUB("A tall");

{SW}[Aa]m{EW}		|
{SW}[Ww]as{EW}		|
{SW}[Ww]ere{EW}		SESUB("Wuz");
{SW}[Ww]asn't{EW}	SESUB("Wasunt");
[Ee]very		SUB("Ever");
{SW}[Ww]ant/s		SSUB("Is after");
{SW}[Ww]anted{EW}	SESUB("Was after");
{SW}[Ww]anting{EW}	SESUB("Hankering after");
{SW}[Dd]oesn't{EW}	|
{SW}[Dd]on't{EW}	SESUB("Dasent");
{SW}[Yy]ou'll{EW}	SESUB("Y'all will");
{SW}[Yy]our		SSUB("Yore");
{SW}[Mm]ore{EW}		SESUB("Mo");
tial			SUB("shul");
cious			SUB("shus");
ious			SUB("yus");
tion			SUB("shun");
{SW}[Cc]an{EW}		SESUB("C'n");
{SW}[Yy]ou{EW}		SESUB("Y'all");
{SW}[Ff]or{EW}		SESUB("Fer");
{SW}[Tt]he{EW}		SESUB("Duh");
ing			SUB("in");
{SW}[Tt]oo{EW}		SESUB("Besides");
{SW}[Tt]o{EW}		SESUB("Tuh");
{SW}[Aa][n]?{EW}	SESUB("Ah");
{SW}[Oo]ur{EW}		|
{SW}[Oo]r{EW}		SESUB("Ore");
{SW}[Oo]f{EW}		SESUB("Uv");
{SW}I{EW}		SESUB("Ah");
{SW}I'm{EW}		SESUB("Ahm a");
{SW}I'll{EW}		SESUB("Ahl");
{SW}I'd{EW}		SESUB("Ah wood");
'nt			*(yytext)=(char)'u'; SUB("unt");
're			SUB(" is");
've			SUB(" done");
eed{EW}			ECHO;
ed{EW}			ESUB("d");
{SW}[Oo]wn{EW}		|
{SW}[Tt]own{EW}		|
{SW}[Dd]own{EW}		|
{SW}[Gg]own{EW}		|
{SW}[Bb]rown{EW}	ECHO;
wn{EW}			ESUB("ed");
{SW}[Bb]elow{EW}	|
{SW}[Kk]now{EW}		|
{SW}[Tt]hrow{EW}	|
{SW}[Gg]row{EW}		|
{SW}[Hh]ow{EW}		|
{SW}[Nn]ow{EW}		|
{SW}[Bb]row{EW}		|
{SW}[Ss]how{EW}		ECHO;
ow{EW}			ESUB("er");
re{EW}			|
er{EW}			ESUB("uh");
{SW}[Hh]er{EW}		ECHO;
!			SUB(". Ye DAWGies!!!");

%%

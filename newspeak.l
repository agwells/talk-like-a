%{	-*- Mode:Fundamental -*-
/*
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
 *	To compile:
 *
 *	flex newspeak.l
 *	cc -O -o newspeak lex.yy.c
 *	rm lex.yy.c
 *
 *	This must be compiled with "flex", not normal "lex".  Lex has
 *	some builtin, unchangable limits which this program exceeds.
 *	This has been verified to work with flex version 2.3.7, and
 *	may not work with flex version 2.3.6.
 *
 *	You can get 'flex' by anonymous FTP to prep.ai.mit.edu, or 
 *	anywhere else you get GNU software.
 *
 *	Run this like so:  "newspeak < some-text-file | more"
 *
 *	There are some design notes near the end.  Suggestions and
 *	improvements to this code are more than welcome.  
 *	Hail Big Brother!
 *---------------------------------------------------------------------------
 */
#include <stdio.h>

unsigned int fcounter = 0;

#define Y0	yytext[0]
#define Y1	yytext[1]
#define Y2	yytext[2]
#define Y3	yytext[3]
#define C	caseify

#define CAP(string)	capstring(0, (string),0)
#define WCAP(string)	capstring(Y0,(string),1)

#define COMP(string1,string2)	compstring(0, (string1),(string2),0)
#define WCOMP(string1,string2)	compstring(Y0,(string1),(string2),1)

#define	DUMP()			printf("%s",yytext)

void capstring(char, char*, int);
void compstring(char, char*, char*, int);
char _caseify(char, int);
char caseify(char);

%}

%e 8000
%p 9000
%n 2000
%k 3000
%a 5000
%o 4000

W	(([ 	]?\n[ 	]*)|[ 	]|[\"'`])
ES	[.,;:!?/]
EW	({W}|{ES}|"'")

YOUNG	(([Yy]oung|[Ss]mall|[Ll]ittle){W})
DEAD	(([Dd]ead|[Dd]eceased){W})
THE	([Tt]he{W}?)
ANDOR	({W}(([Aa]nd)|([Oo]r)){W}?)
COLOR	(red|green|blue|yellow|cyan|magenta|purple|orange|mauve|pink|turquoise|brown|gr[ae]y)

%%

%{
	/******************************
	 *	    PLUSwords	      *
	 ******************************/
%}

[Qq]uite{EW}/[A-Za-z][A-Za-z]			CAP("plus");
[Rr]ather{EW}/[A-Za-z][A-Za-z][A-Za-z]		CAP("plus");
[Kk]ind{EW}of{EW}/[A-Za-z][A-Za-z][A-Za-z]	CAP("plus");
[Kk]inda{EW}/[A-Za-z][A-Za-z][A-Za-z]		CAP("plus");
[Mm]ore{W}than{W}a{W}(little|bit){W}		CAP("plus");
[Pp]ro-						CAP("plus");

[Hh]undreds{W}of{W}[Tt]housands			|
[Hh]undreds{ANDOR}[Tt]housands			|
[Hh]undreds{W}if{W}not{W}[Tt]housands		|
[Tt]housands					|
[Mm]illions					CAP("doubleplusmany");

[Dd]ozens					CAP("many");
[Hh]undreds					CAP("plusmany");

([Bb]right|[Ll]ight|[Ii]ntense){W}/{COLOR}	CAP("plus");
([Dd]im|[Ff]aded|[Dd]ark|[Pp]ale){W}/{COLOR}	CAP("plusun");
([Dd]im|[Ff]aded|[Dd]ark|[Pp]ale)		CAP("unlight");

[Ee]very					DUMP();
[Vv]ery{W}					|
[Rr]eally{W}					|
[Tt]erribly{W}					|
[Aa]wesome({W})?				|
[Aa]wfully{W}					CAP("doubleplus");

[Ww]hopping{EW}					CAP("plusbig");

"O.K."						|
[Aa]ll({W})?[Rr]ight				|
[Oo][Kk][Aa][Yy]				CAP("plusgood");
{W}OK/{W}					WCAP("plusgood");

([Tt]oo|[Oo]verly|[Tt]hat){W}[Mm]uch		CAP("plusmuch");

{W}[Bb]ad/{EW}		WCAP("ungood");
{W}[Pp]oor/{EW}		WCAP("ungood");
{W}[Ll]ame/{EW}		WCAP("ungood");
{W}[Pp]itiful/{EW}	WCAP("ungood");
{W}[Nn]asty/{EW}	WCAP("plusungood");
{W}[Hh]orrid/{EW}	WCAP("doubleplus ungood");
{W}[Hh]orrible/{EW}	WCAP("doubleplus ungood");
{W}[Aa]wful/{W}		WCAP("doubleplus ungood");
{W}[Ee]vil/{W}		WCAP("doubleplus ungood");

%{
	/******************************
	 *	     Titles	      *
	 ******************************/
%}

{W}[Ss]ir/{EW}		WCAP("citizen");
{W}[Mm]r"."/{EW}	WCAP("brother");
[Mm]ister/{EW}		CAP("brother");
[Mm]adame?		CAP("sister");
{W}[Mm]iss/{EW}		WCAP("sister");
[Mm]a"'"?am/{EW}	CAP("sister");
{W}[Mm]r?s"."/{EW}	WCAP("sister");
Mrs/{EW}		CAP("sister");

{YOUNG}?[Cc]hildren				CAP("young citizens");
{YOUNG}?[Bb]oys{ANDOR}[Gg]irl/s			CAP("young citizens");
{YOUNG}?([Kk]id|[Gg]irl|[Bb]oy|[Cc]hild)/{EW}	CAP("young citizen");

[Ff]ellow		CAP("citizen");

[Nn]on{W}?"-"?citizen	CAP("unperson");
[Nn]on{W}?"-"?member	CAP("unperson");
[Cc]riminal/s?		CAP("unperson");
{DEAD}(man|woman)	CAP("unperson");
{DEAD}(men|women)	CAP("unpersons");

[Ii]n{W}[Pp]erson	DUMP();

{W}[Uu]ser		WCOMP("party ","worker");
[Ss]tudent		COMP("party ","worker");
[Cc]itizen/s?{EW}	COMP("party ","worker");
[Pp]erson/s?{EW}	COMP("party ","worker");
[Pp]eople		COMP("party ","workers");

[Ss]enator		|
[Cc]ongressman		|
[Ss]upervisor		|
[Pp]rofessor		printf("Inner Party Member");
[Pp]rof"."/{EW}		printf("Inner Party Member");
[Pp]rof/{EW}		printf("Inner Party Member");

Representative/s?	printf("Inner Party Member");
representatives		printf("Inner Party Members");

[Ww]hite{W}[Cc]ollar		|
[Uu]pper{W}[Cc]lass		COMP("inner ","party");
[Mm]iddle{W}[Cc]lass		CAP("party");
[Bb]lue{W}[Cc]ollar		|
[Ww]orking{W}[Cc]lass		|
[Ll]ower{W}[Cc]lass		CAP("prole");
([Ff]ool|[Ii]diot)/s?{EW}	CAP("prole");
[Ss]tupidity			CAP("proleness");

%{
	/******************************
	 *	  Organizations       *
	 ******************************/
%}

[Aa]?{W}([Ww]hite{W}[Hh]ouse|[Gg]ovt\.?|[Gg]overnment){W}([Ss]ource|[Oo]fficial|[Ss]pokes(man|woman|person))	CAP("an Inner Party Member");
{THE}?[Rr]epublican{W}[Pp]arty		COMP("mini","luv");
{THE}?[Dd]emocratic{W}[Pp]arty		COMP("mini","plenty");

{THE}?Congress					printf("MiniPax");
{THE}?[Ss]enate					printf("MiniPax");
{THE}?[Hh]ouse{W}[Oo]f{W}[Rr]epresentatives	printf("MiniPax");
{THE}?[Ss]tate{W}[Dd]epartment			printf("MiniPax");
{THE}?[Ss]tate{W}[Dd]ept"."?			printf("MiniPax");
{THE}?[Dd]efen[cs]e{W}[Dd]epartment		|
{THE}?[Dd]efen[cs]e{W}[Dd]ept"."?		|
{THE}?[Ww]ar{W}[Dd]epartment			|
{THE}?[Ww]ar{W}[Dd]ept"."?			|
{THE}?[Hh]ouse{W}of{W}[Cc]ommons		|
{THE}?Pentagon					|
{THE}?[Ff]eds					|
{THE}?FCC					|
{THE}?D[Oo]D					|
{THE}"D."[Oo]".D."				|
{THE}?[Ss]ecret{W}[Ss]ervice			COMP("mini","luv");
{THE}?White{W}House				|
{THE}?Kremlin					printf("MiniTrue");
{THE}?(CIA|NSA|FBI|MI"-"?5)/{EW}		printf("MiniTrue");
{THE}?("C.I.A."|"N.S.A."|"F.B.I.")/{EW}		printf("MiniTrue");
{THE}?[Aa]rchive/s?				COMP("mini","rec");
{THE}?[Ll]ibrary				COMP("mini","rec");
{THE}?[Ll]ibraries				COMP("mini","recs");

[Tt]hought{W}[Pp]olice|[Nn]azis?		COMP("think","pol");
[Vv]ice{W}[Ss]quad				COMP("sex","pol");
PMRC|"P.M.R.C."					COMP("sex","pol");

[Oo]fficer					CAP("minister");

{THE}?[Dd]epartment{EW}of{EW}.			|
{THE}?[Dd]ept"."?{EW}of{EW}.			|
{THE}?[Uu]niversity{EW}of{EW}.			|
{THE}?[Uu]niv"."?{EW}of{EW}.			|
{THE}?[Dd]ept"."?{EW}of{EW}.			|
{THE}?([Ss]ub"-"?)?[Cc]omm?itt?ee{EW}(of|on){EW}.	|
{THE}?[Ss]chool{EW}of{EW}.			{
	if ((yytext[yyleng-1] >= 'A') && (yytext[yyleng-1] <= 'Z'))
	   /* "the school of Law" --> "MiniLaw" */
	   printf("Mini%c",yytext[yyleng-1]);
	else if ((yytext[yyleng-1] >= 'a') && (yytext[yyleng-1] <= 'z'))
	   /* "the school of law" --> "MiniLaw" (not "Minilaw") */
	   printf("Mini%c",yytext[yyleng-1] - ('a' - 'A'));
	   /* "the school of 5 things" --> "Ministry of 5 things" */
	else printf("Ministry of %c",yytext[yyleng-1]);
	}

[Dd]epartment			|
[Uu]niversity			CAP("ministry");
[Uu]niv"."?/{W}			CAP("ministry");
[Dd]ept"."?/{W}			CAP("ministry");
([Ss]ub"-"?)?[Cc]omm?itt?ee	CAP("ministry");

{THE}[Pp]roject/{EW}		CAP("the Three Year Plan");
[Oo]ur{W}[Pp]roject/{EW}	CAP("our Three Year Plan");
[Bb]udget			printf("Three Year Plan");
[Pp]roject/{ES}			printf("Three Year Plan");

{W}({THE}|([aa]{W}))[Pp]roject	printf("%cthe Three Year Plan",Y0);

[A-Za-z]+"'"[Ss]/{W}(law|Law|LAW|book|Book|BOOK|rule|Rule|RULE){EW}	printf("Goldstein's");

%{
	/******************************
	 *	     Actions	      *
	 ******************************/
%}

[Ii]n{W}love{EW}	CAP("SexCriming");
[Ll]ove{W}you/{EW}	CAP("love Big Brother");
[Ll]ove{W}me/{EW}	CAP("love Big Brother");

[Cc]loning		|
[Rr]eproduction		|
[Cc]elibacy		|
[Pp]rocreation		COMP("good","sex");

[Cc]elibate		|
[Pp]rocreate		COMP("good","sexwise");

[Tt]elevisions?		|
TVs?			|
[Tt]"."[Vv]"."s?	|
[Rr]adios?		|
[Nn]ews{W}?[Pp]apers?	|
[Jj]ournalism		|
[Mm]ovies?		|
[Rr]ock{EW}?"-"?(and|"&"|"'"?n"'"?){EW}?"-"?[Rr]oll({W}[Mm]usic)?	     |
(([Rr]ock|[Cc]lassical|[Ii]ndustrial|[Pp]op|[Dd]ance|[Rr]ap){W})?[Mm]usic    |
[Tt]unes		|
[Mm]oney		|
[Cc]ash			|
[Cc]omic{W}[Bb]ooks?	|
([Ss]tar{W}?)?[Tt]rek	COMP("prole","feed");

[Pp]eace{W}[Mm]ovement		|
[Pp]eace{W}[Pp]rotest		|
[Aa]nti{EW}[Ww]ar		|
([Pp]assive{W})?[Rr]esistance	|
[Cc]reativity			|
[Tt]reason			|
[Rr]esearch		COMP("crime","think");
%{
	/******************************
	 *	     Religion	      *
	 ******************************/
%}

[Jj]esus{W}[Cc]hrist		|
[Jj]esus			|
{THE}?[Bb]uddh?a		|
[Mm]ohamm?ed			|
[Mm]artin{W}[Ll]uther{W}[Kk]ing	|
J\.?\ ?R\.?\ \"?Bob\"?\ Dobbs	printf("doubleplus crimethinker");

([Jj]esse{W})?[Hh]elms		|
([RrDd]on(ald)?{W})?[Rr]ea?gan	|
[Gg]eorge{W}[Gg]uscoria		printf("doubleplus goodthinker");

[Jj]ewish			COMP("crime","thinkwise");
[Jj]ew				|
[Cc]hristian			|
[Mm]oslem			|
[Bb]uddhist			|
[Aa]thiest			|
[Aa]gnostic			COMP("crime","thinker");

[Ff]aith			COMP("belly","feel");

%{
	/******************************
	 *	      Places	      *
	 ******************************/
%}

[Ee]ngland|{THE}?[Uu]nited{W}[Kk]ingdom			|
({THE}?[Uu]nited{W}[Ss]tates{W}[Oo]f{W})?[Aa]merica	|
{THE}?[Uu]nited{W}[Ss]tates|USA|"U.S.A."|[Cc]anada	|
[Gg]ermany|[Ii]srael|[Ee]urope				printf("Oceana");

Iranian|Iraqu?i|Libyan|Russian|African|Egyptian		printf("Eurasian");
Iran|Iraq|Libya|Russia|Africa|Egypt			|
([Ss]audi{W})?Arabia|{THE}?Soviet{W}Union		printf("Eurasia");
[Ss]oviet						printf("Eurasian");

[Cc]hinese|[Jj]apanese|[Tt]aiwanese			|
[Pp]hillipino|[Ii]ndian|[Aa]ustralian|[Mm]exican	|
[Nn]icaraguan|[Ss]alvadori?an				printf("Eastasian");
China|[Jj]apan|[Tt]aiwan|{THE}?[Pp]hillipines|[Ii]ndia	|
[Aa]ustralia|[Mm]exico|[Nn]icaragua|[Ee]l{W}[Ss]alvador	printf("Eastasia");

[Kk]uwaiti			printf("Eurasian");
[Kk]uwait			printf("The Malabar Front");

%{
	/******************************
	 * Miscelaneous Translations  *
	 ******************************/
%}

{W}[Ff]aster		WCAP("plus speedful");
{W}[Ss]lower		WCAP("plus unspeedful");
{W}[Ff]ast		WCAP("speedful");
{W}[Ss]low		WCAP("unspeedful");

[Mm]odern		CAP("plusnew");
[Aa]ncient		CAP("plusunnew");
{W}old/{W}		WCAP("plusunnew");

[Hh]appiness		CAP("joyfulness");
[Hh]appy		CAP("joyful");
[Qq]uick		CAP("speedful");
{W}[Ss]peedy		WCAP("speedful");
[Hh]eavy		CAP("weightful");
[Hh]eavill?y		CAP("weightfully");
[Ss]ick(ly)?		CAP("unhealthful");

[Gg]ross		|
[Ss]ickening		|
[Ff]oul			|
[Pp]utrid		|
[Dd]isgusting		COMP("crime","thinkful");

[Ss]mash		|
[Cc]rush		|
[Oo]bliterate		|
[Aa]nnihilate		|
[Nn]eutralize		|
[Dd]emolish		|
[Dd]estroy		CAP("unbuild");

[Ii]nanimate		CAP("unlifeful");
[Ss]ociety|[Cc]ulture	printf("IngSoc");
[A-Za-z]+isi?m/{EW}	printf("Goldsteinism");
[A-Za-z]+ist/{EW}	printf("Goldsteinist");

{W}[Dd]ead		WCAP("unlifeful");
{W}[Dd]eath		WCAP("unlife");
{W}[Ll]ie		WCAP("untruth");
{W}[Ff]alsehood		WCAP("untruth");
{W}[Mm]istake/{EW}	WCAP("untruth");
{W}[Ww]hisper		WCAP("unshout");
{W}[Pp]roud		WCAP("prideful");

[Ff]alse		CAP("untrue");
[Dd]ark			CAP("unlight");
[Bb]lack		CAP("unwhite");
[Ff]orbidden		CAP("unallowed");
[Ff]orbid		CAP("unallow");
[Ff]ailure		CAP("unsuccess");
[Ff]ail/{EW}		CAP("unwin");

[Ss]tatistics?/{EW}		CAP("propaganda");
{W}[Aa]n{W}[Aa]nn?ouncement	WCAP("a NewsFlash");
[Aa]nn?ouncement		printf("NewsFlash");
[Ii]nstructions?		printf("B. B. DayOrder");

[Aa]lmost|[Nn]early	CAP("within measurable distance of");
[Ff]unny		CAP("humorful");

[Dd]oom			CAP("unsave");
[Cc]haos		CAP("unorder");
[Cc]haotic		CAP("unorderful");
[Ee]nslaved		CAP("protected");
[Ee]nslave		CAP("protect");
[Dd]angerous		CAP("unsafewise");
[Dd]anger		CAP("unsafe");
([Bb]lind{W})?[Oo]bedience		COMP("ing","soc");
\"?[Nn]ew{W}[Ww]orld{W}[Oo]rder\"?	printf("IngSoc");

[Pp]rivacy		|
[Ii]ndividuality	COMP("own","life");

IMHO		printf("for the love of Big Brother");

[Ee]motion(al|s)?	|
[Cc]onviction		|
[Bb]elie(f|ve)		|
[Aa]ccept(ance)?	COMP("belly","feel");

[Dd]emocracy			|
[Ll]iberty			|
[Ff]reedom			|
[Jj]ustice			|
{THE}?[Aa]merican{W}[Ww]ay	|
[Ss]ubversion			|
[Pp]assion		COMP("crime","think");

[Oo]bscenity		|
[Pp]ornography		|
[Oo]rgasm		|
[Ee]rotica		COMP("sex","crime");
[Ss]exy			|
[Oo]bscene		|
[Pp]ornographic		|
[Ee]rotic		COMP("sex","crimeful");

[Cc]ritic/s?{W}		COMP("crime","thinker");

[Ii]nfant{W}[Mm]ortality	COMP("inf","mort");

[Ff]amilies			|
[Pp]arents			COMP("family ","units");
[Mm]other{ANDOR}[Ff]ather	|
[Bb]rother{ANDOR}[Ss]ister	COMP("family ","unit");
{W}[Pp]arent/s?{EW}		WCOMP("family ","unit");
[Ff]amily			COMP("family ","unit");

God/{EW}					printf("Big Brother");
[Pp]res(ident|".")({W}([Bb]ush|[Rr]eagan))?	printf("Big Brother");
[Pp]rime{W}[Mm]inister				printf("Big Brother");

([Gg][Nn][Uu]{W}([Ee]macs|EMACS){W})?[Gg]eneral{W}[Pp]ublic{W}[Ll]icense	printf("NewSpeak Dictionary");

(questioning|murder|ass?ass?ination)/{ES}	printf("interrogation");

[Ss]keptic/{EW}			CAP("unperson");
[Ss]illy			CAP("foolhardy");
{W}[A-Za-z][A-Za-z]?illy	DUMP();
[Ss]outhern|[Ss]outherly	CAP("southwise");
[Nn]orthern|[Nn]ortherly	CAP("northwise");
[Ee]astern|[Ee]easterly		CAP("eastwise");
[Ww]estern|[Ww]esterly		CAP("westwise");
[Pl]leasant			CAP("goodwise");
[Vv]iolent			CAP("unpeacewise");
[Vv]iolence			CAP("unpeaceness");
[Ii]ndifference			CAP("uncarefulness");
[Ii]ndifferent			CAP("uncareful");
[Bb]elly			CAP("abdomen");
[Cc]omic			CAP("humorwise");
{W}[Uu]nless			WCAP("lest");
usually				printf("usualwise");

[Gg]uerillas		COMP("party ","workers");

[Ww]ar/{EW}		CAP("engagement");
[Dd]efen[cs]e/{EW}	CAP("peace");
[Ii]nvasion		CAP("liberation");

%{
	/******************************
	 *     Syllable Rewriting     *
	 ******************************
	isn't ___	is un___
	not the ___	the un___
	not my ___	my un___
	anti___		un___ 		(etc...)
	___cally	___wise
	___ally		___wise
	___lly		___wise
	___ly		___wise
	___aic		___wise
	___lic		___wise
	___nnic		___wise
	<VOWEL>tric	___wise
	___ic		___wise
	<VOWEL>ous	___ful
	<CONSONANT>ous	___eful
	___less		un___ful

         */
%}

[Ii]sn"'"t{W}my{W}		CAP("is my un");
[Ii]s{W}not{W}my{W}		CAP("is my un");
[Ii]sn"'"t{W}[Tt]he{W}		CAP("is the un");
[Ii]s{W}not{W}[Tt]he{W}		CAP("is the un");
[Ii]sn"'"t{W}[Ii]n{W}[Tt]he{W}	CAP("is in the un");
[Ii]s{W}not{W}[Ii]n{W}[Tt]he{W}	CAP("is in the un");
[Ii]t"'"?s{W}not{W}[Tt]he{W}	CAP("it's the un");
[Ii]sn"'"t{W}			CAP("is un");
[Ii]s{W}not{W}			CAP("is un");
[Nn]ot{W}[Tt]he{W}		CAP("the un");
[Nn]ot{W}[Mm]y{W}		CAP("my un");
[Nn]ot{W}[Aa]{W}		CAP("an un");
[Nn]ot{W}have{W}		CAP("has un");
[Nn]ot{W}be{W}			CAP("be un");
[Nn]ot{W}[Oo]nly/{W}		CAP("unonly"); /* avoid "unonwise" */

[Aa]{W}[Nn]ot{W}	|
[Aa]{W}[Nn]on"-"?	printf("%cn%cun",Y0,Y1); /* "a non_" -> "an un_" */

%{
/*	{W}[Nn]ot{W}	|	*/
%}
{W}[Ii]l"-"?/[a-z][a-z]		WCAP("un");
{W}[Aa]nti"-"?			|
{W}[Nn]on"-"?			WCAP("un");

robably|ventually|[Oo]bvious|[Bb]asic|{W}[Oo]nly|otally	|
[Aa]rctic|holic|{EW}ally|{EW}[Aa]pply|{W}[Tt]opic	DUMP();

{W}([Tt]raf|[Pp]aci|[Ss]peci)fi/c{W}	DUMP();
{W}(ma|tra)gi/c{W}			DUMP();
{W}(pub|cyc|re|fro|gar)li/c{W}		DUMP();
{W}(eth|cli|to)ni/c{W}			DUMP();
{W}(E|cle|met|cit)ri/c{W}		DUMP();
{W}(ch|ep|tr?op|t|mus|stat|att)i/c{W}	DUMP();
{W}only/{W}				DUMP();
{W}[Aa]tlantic				DUMP();

[ \t\n][drstwDRSTW]ally		printf("%c%cally", Y0, Y1);

[a-z]ically/{W}			printf("%cwise", Y0);
[a-z]ally/{W}			printf("%cwise", Y0);
[a-z][a-z]lly/{W}		printf("%c%cwise", Y0,Y1);
[a-z][a-z][a-z]ly/{W}		printf("%c%c%cwise", Y0,Y1,Y2);
[a-z]ical/{W}			printf("%cwise", Y0);

[a-km-qs-z]aic/{EW}		printf("%cwise",  Y0);  /* not laic, raic */
[a-z]lic/{EW}			printf("%clwise", Y0);
[a-z]nnic/{EW}			printf("%cnwise", Y0);
[a-z][aeiou]tric/{EW}		printf("%c%ctwise", Y0, Y1);
[a-z]tric/{EW}			printf("%cwise", Y0);
[a-z]ic/{EW}			printf("%cwise",  Y0);
[a-z]lly/{EW}			printf("%cwise", Y0);
[a-z]ly/{EW}			printf("%cwise", Y0);

[aeiouy][^aeiouy]ous/{EW}	printf("%c%cful",Y0,Y1);
[^aeiouy]ous/{EW}		printf("%ceful",Y0);
[^e]ous/{EW}			printf("%cful",Y0);

[A-Za-z]+less/{EW}  {	yytext[yyleng-4] = '\0';
			if (((yytext[1] < 'A') || (yytext[1] > 'Z')) &&
			    (yytext[0] >= 'A') && (yytext[0] <= 'Z'))
			   yytext[0] = yytext[0] - ('a' - 'A');
			printf("%cn%sful",C('u'), yytext);
		    }

".  "		{	printf("%s",yytext);
			fcounter &= 15;
			if (14 == fcounter++) printf("(fnord)  ");
		}

[.,!?]\"([^\n\".!]+[.!])?\n/[\n\t ]	printf("%c  Hail Big Brother!\"%s",Y0,yytext+2);
\"([.,!?][^\n\".!]+[.!])?\n/[\n\t ]	printf("%c  Hail Big Brother!\"%s",Y1,yytext+2);

.			printf("%s", yytext);
\n			printf("\n");

%{
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Brief description of Orwell's NewSpeak:
 * ---------------------------------------
 * Each word was made to serve as noun, verb, adjective and adverb.  In
 * particular, nouns and verbs were made exactly the same -- hence "think"
 * replaced "thought" as a noun (viz. "crimethink" = thought crime, "thinkpol"
 * = thought police).  Adjectives were formed by adding "-ful" to a noun/verb;
 * adverbs were formed by adding "-wise."  Hence "speedful" = fast,
 * "speedwise" = quickly, "unspeedwise" = slowly.
 *
 * The decision on which word should be negated was made fairly randomly;
 * "dark" could be "unlight," or "light" could be "undark".  But in all cases
 * the most important objective (aside from ideological restriction) was
 * euphony; the words had to be easily pronounceable.
 *
 * Most verb inflections were made regular; "he thinked," "he goed," "he
 * eated"; only the auxiliaries and modals (to be, to have, may, shall, will,
 * etc.) were allowed to inflect irregularly.  Plurals were also regularized:
 * "mans," "oxes," "childs."  [This isn't implemented here.]
 *
 * There were three sets of words.  The A vocabulary was for everyday use:
 * car, man, red, good, etc.  It was restricted to fairly simple words.
 *
 * The B vocabulary consisted of political/ideological words with very
 * complicated connotations.  All of the B words were compound words --
 * bellyfeel (blind emotional acceptance of the ideology), oldthink (the way
 * of thought before the Revolution), crimethink, Ingsoc, goodsex (intercourse
 * solely for the purpose of making babies and with no physical enjoyment on
 * the part of the female), sexcrime (any kind of sex but goodsex, including
 * sex for its own sake), goodthink (thinking in accordance with Ingsoc), and
 * so on.  These words were also subject to the modifications mentioned
 * above--hence "goodthinker," "goodthinkful," "goodthinkwise."
 *
 * The C vocabulary consisted of scientific and technical words (though there
 * was no longer any word for "science," any connotation it might have being
 * subsumed into "Ingsoc").
 *
 * Implementing a translator for all of this would be really complicated --
 * I'd need rather extensive lists of the "irregular" words (so they could be
 * regularized), as well as lists of politically meaningful words (so they
 * could be excised or translated into either "goodthink" or "crimethink," as
 * appropriate).  Any kind of sexual topic should become "sexcrime" (it being
 * unlikely that any talk of sex these days would fit into "goodsex").
 *
 * Basically, the reason it's hard is that NewSpeak was intended to *decrease*
 * the vocabulary, and subsume complicated ideas into politically correct
 * words so that you wouldn't have to understand the ideas anymore; you'd just
 * have to emit the right words.  So to properly "translate" anything into
 * NewSpeak, you have to cut the vocabulary way down.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
%}

%%
int main()
{
	yylex();
	printf("\nHail Big Brother!\n");
}


void capstring(firstchar,string,i)
    char firstchar, *string;
    int i;
{
	if (firstchar != 0) putchar(firstchar);
	putchar( (yytext[i] <= 'Z') ? (string[0] - ' ') : string[0]);
	printf("%s",string+1);
}

void compstring(firstchar,string1,string2,i)
    char firstchar, *string1, *string2;
    int i;
{
	capstring(firstchar,string1,i); 
	capstring(0,string2,i);
}

char _caseify(c,i)
    char c;
    int i;
{
	if (yytext[i] <= 'Z') return (c - ' ');
	else return (c);
}

char caseify(c)
    char c;
{
	return _caseify(c,0);
}

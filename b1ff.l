
%e 2000
%p 5000
%n 1000
%k 500
%a 4000
%o 2000
BW [ 	]
EW [ 	.,;!?]

%{

/*
 * The B1FF filter.
 *
 * Modification History
 *
 * -  Created Sat Feb 26 04:02:01 EST 1994 by Dave Baggett <dmb@ai.mit.edu>,
 *    who obviously had too much time on his hands.  Based on the earlier
 *    "jive" filter of unknown origin.
 *
 * -------------------------------------------------------------------------
 * To build the B1FF filter, do the following:
 *
 * 	lex biff.l
 *	cc -o biff lex.yy.c -ll
 *	rm lex.yy.c
 *
 * Optionally replace lex and cc above with flex and gcc.
 *
 * To use the executable, pipe stuff to it; e.g.,
 *
 * 	cat foo | biff
 *
 */
 
char buf[128];
int count = 0;
char WhAt[]="@(#)DAVE BAGGETT-S B1FF!!1 FlLTER + A CHANGE OR 2 BYE BGRIFFIN\n@(#)$Header: b1ff.l,v 1.4 94/05/07 20:42:53 bgriffin Final $";

%}

%%

" and "				printf(" + ");
" plus "			printf(" + ");
"you're"			printf("YOUR");
your				printf("UR");
"it's"				printf("1TZ");
its				printf("1T'Z");
here				printf("HEAR");
hear				printf("HERE");
"they're"			printf("THE1R");
their				printf("THERE");
there				printf("THEY'RE");
was				printf("WUZ");
etc				printf("U GET THE 1DEA");
e[.]g[.]			printf("LAIK THIS");
i[.]e[.]			printf("U NOE LAIK");
" are "				printf(" R ");
"be "				printf("B ");
before				printf("B4");
" to "				printf(" 2 ");
this				printf("TH1S");
like				printf("LA1K");
total				printf("TODAL");
"and I"				printf("+ ME");

good				printf("K00L");
okay				printf("C00L");
ok				printf("K00L");
interesting			printf("C00L");
neat				printf("Q00L");
nifty				printf("Q00L");
useful				printf("K00L");
great				printf("RAD");
functional			printf("RAD");
excellent			printf("X-L-ENT");
very				printf("TOTALLY");
quite				printf("REAL");
really				printf("REAL");
new				printf("NU");
recent				printf("RAD NU");

result				printf("TH1NG");
ramification			printf("TH1NG");
reason				printf("TH1NG");
conclusion			printf("TH1NG");
results				printf("STUFF");
ramifications			printf("STUFF");
reasons				printf("STUFF");
conclusions			printf("STUFF");

files				printf("WAREZ");
program				printf("GAME");
programs			printf("WAREZ");
game				printf("KRACKED GAME");
games				printf("GAMEZ");
[Uu][Nn][Ii][Xx]		printf("THE MANEFRA1M O/S");
[Dd][Oo][Ss]			printf("THE VIC-20 TAPE DRIVE SCR1PTER");
disk				printf("TAPE");
computer			printf("VIC-20");
workstation			printf("MANEFRA1M");
supercomputer			printf("MANEFRAM");
[Cc]ray				printf("K1CKASS MANEFRA1M");
"Connection Machine"		printf("TODALY RAD KOMPUTUR BRANE");
machine				printf("VIC-20");
[Aa][Tt][Aa][Rr][Ii]		printf("PEACE UV SH1T ATAR1");
[Aa][Pp][Pp][Ll][Ee]		printf("PEACE UV SH1T APPEL");
[Aa][Mm][Ii][Gg][Aa]		printf("WORKSTASHUN");
[Mm]acintosh			printf("MACK1NTRASH");
upload				printf("U/L");
download		        printf("D/L");
load				printf("U/L");
save				printf("D/L");
send				printf("U/L");
receive				printf("D/L");
ftp				printf("XMODEM");
buy				printf("D-L");

[Pp]ascal			printf("THAT WUSSY LANGUAGE");
[Mm]odula.[23]			printf("THAT WUSSY SH1T LANGUAGE");
[Ll]isp				printf("THAT KOMPUTUR BRANE LANGUAGE");
[Ss]cheme			printf("THAT TODAL NURD LANGUAGE");
[Aa]da				printf("THAT K00L NU ARMY LANGUAGE");
[Pp]ost[Ss]cript		printf("PRINTUR KODEZ");
[Aa]ssembly			printf("CPU KODE");
[Aa]ssembler			printf("CPU KODE");

newsgroup			printf("MESSAGE BASE");
news				printf("MESSAGES");
thread				printf("BOARD");
[Uu]senet			printf("THE MANEFRAIM BOARDZ");
[Nn]et[Nn]ews			printf("THE BOARDZ");

fool				printf("LUZER");
moron				printf("LAMER");
idiot				printf("LAMER");
jerk				printf("HOZER");
dweeb				printf("LUZER");
geek				printf("HOZER");
nerd				printf("LUZER");

" man "                     	printf(" D00D ");
" men "				printf(" D00DZ ");
woman				printf("BABE");
women				printf("BABEZ");
wife				printf("BABE");
husband				printf("LOVERD00D");
girlfriend			printf("PEACE");
boyfriend			printf("STUD");
girl				printf("TODAL BABE");
person				printf("D00D");
people				printf("D00DZ");
friend				printf("FRE1ND");

sure				printf("SHUR");
"got to"			printf("GOTTA");
"want to"			printf("WANNA");
"have to"			printf("HAFTA");
have				printf("GOT");

"using"				printf("UZE1NG");

" car "                     	printf(" WHEELS ");
" eat "				printf(" NARF ");

police				printf("P1GZ");
from				printf("FRUM");

human				printf("D00D");
occasionally			printf("SUMTIMZ");
whom				printf("WHO");
whose				printf("WHO'S");
who's				printf("WHOSE");
"who is"			printf("WHOSE");
"ought to"			printf("OTTA");
"need to"			printf("GOTTA");
"should"			printf("OTTA");
"tonight"			printf("2NITE");
together			printf("2GETHR");
tomorrow			printf("2MOROW");
today				printf("LAST NITE");
to-day				printf("2DAY");
" food "			printf(" PIZZA ");
coke				printf("MOUNTIN DOO");
pepsi				printf("MOUNTIN DOO");
caffeine			printf("COKE");
coffee				printf("SPEED");
[Nn]yquil			printf("SMACK");
night				printf("NITE");

" believe"			printf(" TH1NK");
phone				printf("FONE");
freak				printf("PHREAK");
[Kk][Ii*-][Bb][Oo*-]		printf("THE FONT GUY");
[nN]et[htw][ar][cer][ke]	{ /* nethack nettrek netware */
				  printf("PACMAN"); }
chess				printf("PONG");
[Ss]"treet "[Ff]ighter		printf("POLL POSIT1ON");

amateur				printf("LAMER");
" of "				printf(" UV ");
what				printf("WUT");
"meta "				printf("ALT/CAPSLOCK ");

"talk"				printf("1NTERFACE");
"sort of"			printf("SORTA");
"kind of"			printf("K1NDA");
magazine			printf("ZINE");

":^)"				;
":-)"				printf("HAHAHAHA!!1!1!1!!!1!!!");
"8-)"				printf("ITZA JOKE YA NOE");

[dgmnr]"."		{	*(yytext+1) = 0;
				upcase(yytext);
				sprintf(buf, "%s!",yytext);
				printf(buf);
			}

[efhkpst]"."		{	*(yytext+1) = 0;
				upcase(yytext);
				sprintf(buf, "%s,",yytext);
				printf(buf);
			}

[bclw]"."		{	*(yytext+1) = 0;
				upcase(yytext);
				sprintf(buf, "%s...",yytext);
				printf(buf);
			}

[a-e]"?"		{ upcase(yytext); printf(yytext); printf("?"); }
[f-j]"?"		{ upcase(yytext); printf(yytext); printf("??"); }
[k-o]"?"		{ upcase(yytext); printf(yytext); printf("!?1?"); }
[p-t]"?"		{ upcase(yytext); printf(yytext); printf("!?1?!?"); }
[u-z]"?"		{ upcase(yytext); printf(yytext); printf("?1?!?1?!"); }
[a-e]"!"		{ upcase(yytext); printf(yytext); printf("!"); }
[f-j]"!"		{ upcase(yytext); printf(yytext); printf("!!"); }
[k-o]"!"		{ upcase(yytext); printf(yytext); printf("!1!"); }
[p-t]"!"		{ upcase(yytext); printf(yytext); printf("!!1!"); }
[u-z]"!"		{ upcase(yytext); printf(yytext); printf("!1!!1"); }
";"				printf(",");
","				printf(".");
"'"				;
[a-z]":"		{	*(yytext+1) = ',';
				upcase(yytext);
				sprintf(buf, "%s L1KE:",yytext);
				printf(buf);
			}
[iI]		{ count++; if (count % 3 == 0) printf("1"); else printf("I"); }
oo				printf("00");
0				printf("o");
"s "				printf("Z ");
"s."				printf("Z.");
cr				printf("KR");
wr				printf("R");
ate				printf("8");
ait				printf("8");
ame				printf("A1M");
ain				printf("ANE");
ade				printf("AID");
four				printf("4");
fore				printf("4");
for				printf("4");
see				printf("C");
seeing				printf("CN");
you				printf("U");
ude				printf("00D");
ule				printf("OOL");
ome				printf("UM");
ose				printf("UZE");
tion				printf("SHUN");
mn				printf("M");
kn				printf("N");
er				printf("UR");
em				printf("UM");
ll				printf("L");
ware				printf("WEAR");

.			{ upcase(yytext); printf(yytext); }

\n			printf("\n");

%%

upcase(s)
	char	*s;
{
	while (*s) {
		if (islower(*s))
			*s = toupper(*s);
		s++;
	}
}

main()
{
	yylex();
}


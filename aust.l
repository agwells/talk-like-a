%e 3000
%p 8000
%n 2000
%k 2000
%a 3000
%o 2000
BW [ 	]
EW [ 	.,:;!?_]
ES [.:;!?]
VO [aeiouy]
CO [bcdfghjklmnpqrstvwxz]
CC [cdfgjklmnprtz]
SC [cg]
HC [bdfhjklmnpqrstvwxz]
ST [pbtdkg]
LE [a-zA-Z]

%{

	/* English to australian translator */

	/* to build with standard at&t lex
	 *   lex aust.l
	 *   cc lex.yy.c -ll -o aust
	 *
	 * to build with flex
	 *   flex -I aust.l
	 *   cc lex.yy.c -o aust
	 *
	 * (flex is a pd version of lex that runs under Unix, VMS and MSDOS.)
	 */

	/* 16Jan90 - wb - first version, based on biffa.l by
	 *			Stephen K Mulrine <smulrine@cs.strath.ac.uk> */
	/* 30Jan90 - wb - added more words */
	/* 16Feb90 - wb - converted from jive to aust */
	/* 12Mar90 - wb - added some randomness */


	/* BW = begin word */
	/* EW = end word */
	/* ES = end sentence */
	/* VO = vowel */
	/* CO = consonant */
	/* CC = end of consonant cluster */
	/* SC = soft consonant (need an 'e') */
	/* HC = hard consonant (does not need an 'e') */
	/* ST = stop */
	/* LE = any letter */

bloody(n)
int n;
{
	if (n == 0 || rand() < n)
		printf((rand() < 20000)? "bloody ": "bleedin' ");
}

say(msg, n)
char *msg;
int n;
{
	if (rand() < n)
		printf("%s", msg);
}

oi(n)
int n;
{
	say(" Blimey!", n);
	while (rand() < n)
		printf(" OI!");
}


%}

%%
"That is"		|
"That's"		printf("Thaz");
"that is"		|
"that's"		printf("thaz");
bathroom		|
toilet			printf("loo");
{BW}john{EW}		printf("%cloo%c", yytext[0], yytext[5]);
[Aa]lright		printf("%clrighty", yytext[0]);
{BW}mad{EW}		printf("%cpissed%c", yytext[0], yytext[4]);
angry			|
annoyed			printf("pissed");
drunk			printf("loaded");
drank			printf("swilled");
drink			printf("swill");
{BW}beer		printf("%cFoster's", yytext[0]); /* Australian for beer, mate */
"ught to"		printf("ughta");
{BW}train		printf("%cland train", yytext[0]);
ough{EW}		printf("o%c", yytext[4]);
Hello{EW}		|
"Good day"{EW}		printf("G'day!");
hello{EW}		|
"good day"{EW}		printf("g'day!");
"in Austrailia"		|
"to Austrailia"		printf("down under");
{BW}bit{EW}		printf("%ctad%c", yytext[0], yytext[4]);

{CO}{CC}{EW}		printf("%c'%c", yytext[0], yytext[2]);
{CO}{CC}ed{EW}		printf("%c%s", yytext[0], yytext+2);
of{EW}			printf("o'%c", yytext[2]);

Some{BW}one		|
Someone			|
Guy			printf("Dude");
some{BW}one		|
someone			|
guy			printf("dude");

[Ww]ha			printf("%co", yytext[0]);
{BW}esp			printf("'sp");
{BW}Esp			printf("'Sp");

{BW}h{LE}		printf("%c'%c", yytext[0], yytext[2]);
off{BW}of		printf("offa");

[Yy]our			printf("%cer", yytext[0]);
you{EW}			printf("ya%c", yytext[3]);
my			printf("me");

{CO}[ai]{SC}e		printf("%coi%ce", yytext[0], yytext[2]);
{CO}[ai]{HC}e		printf("%coi%c", yytext[0], yytext[2]);
{CO}[ai]{CO}[aiouy]	printf("%coi%c%c", yytext[0], yytext[2], yytext[3]);
r[ai]{CO}{CO}		printf("%coi%c%c", yytext[0], yytext[2], yytext[3]);
{CO}igh{LE}		printf("%coi%c", yytext[0], yytext[4]);
extremely		|
really			|
very			printf("roit");
Extremely		|
Really			|
Very			printf("Roit");
that			printf("wot");
Well			printf("Welp");
baseball		|
football		|
hockey			printf("cricket");
{VO}th({EW}|{VO})	printf("%ct%c", yytext[0], yytext[3]);
Who			printf("Oo");
{BW}who			printf("%c'oo", yytext[0]);
{LE}{CO}er{EW}		printf("%c%ca%c", yytext[0], yytext[1], yytext[4]);
{VO}{CO}e{BW}to		printf("%c%ceda", yytext[0], yytext[1]);
{VO}{CO}{BW}to		printf("%c%c%ca", yytext[0], yytext[1], yytext[1]);
{BW}[Bb]e{CO}{LE}	printf("%c'%s", yytext[0], yytext+3);
{BW}[Aa]{CO}{LE}	printf("%c'%s", yytext[0], yytext+2);
{BW}[Oo]ne?		printf("%c'un", yytext[0]);

{LE}\,			{ECHO; say(" moit,", 10000);}
{BW}an?{EW}		{if(rand()<12000){printf(" a ");bloody(0);}else printf("%s",yytext);}
An?{EW}			{if(rand()<12000){printf("A ");bloody(0);}else printf("%s",yytext);}
(T|({BW}t))he{EW}	|
(T|({BW}t))hose{EW}	{ECHO; bloody(12000);}

\!|\?			{say(", moit", 6000); ECHO; oi(12000);}
\.			{say(", moit", 2000); ECHO; oi(6000);}

{BW}-*[0-9]+" "*("degrees"|([Ff]{LE}*)){EW}	{printf("%c%dc%c",*yytext,((atoi(yytext+1)-24)/9)*5,yytext[strlen(yytext)-1]);}

.			printf("%s", yytext);
\n			printf("\n");

%%
main()
{
	yylex();
}


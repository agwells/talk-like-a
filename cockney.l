%{
/*
 *	Lex filter to transform plain English into Cockney English.
 *	No racial or societal slurs are intended.  For amusement only.
 *
 *	Copyright 1986 by Daniel Klein.
 *
 *	Reproduction permitted so long as this notice is retained.
 */
%}

BW [ \t\n]
SP [ \t]+
EW [ \t.,;!\?$]

%Start junk

%%
<junk>.			{	srandom(time(0L)); unput(yytext[0]); BEGIN 0; }
{BW}[Tt]he{EW}		{	ECHO; bloody(); }
{BW}[Ss]teal{EW}	{	printf("%c%cick",yytext[0],yytext[1]-5);
				eos();
			}
{BW}[Ss]tole{EW}	{	printf("%c%cicked",yytext[0],yytext[1]-5);
				eos();
			}
{BW}tired			pooped();
{BW}were{EW}		|
{BW}was{EW}		{	printf("%cwuz",yytext[0]); eos(); }
[Hh]ello			printf("'%cllo", caseify('u'));
{BW}[Hh]			printf("%c'",yytext[0]);
{BW}[Yy]our{EW}		{	printf("%.2ser",yytext); eos(); }
{BW}it{EW}		{	printf("%.2s'",yytext); eos(); }
{BW}go{EW}		{	printf("%.2sow",yytext); eos(); }
{BW}and{EW}		{	printf("%c'n'",yytext[0]); eos(); }
{BW}my{EW}		{	printf("%.2se",yytext); eos(); }
{BW}th(is|at){EW}	{	printf("%.5s", yytext); eos(); }
{BW}[Ww]e{SP}went{EW}	|
{BW}[Ww]e{SP}had{EW}	|
{BW}[Ww]e{SP}did{EW}	{	printf("%.*s",yyleng-1,yytext);
				set_did(2);
				eos();
			}
{BW}I{SP}went{EW}	|
{BW}I{SP}had{EW}	|
{BW}I{SP}did{EW}	{	I();
				printf(" did");
				set_did(1);
				eos();
			}
{BW}I{EW}		{	I(); eos(); }

[Yy]ou{SP}[^aeiouy]	{	printf("%c'", yytext[0]); plastc(); }
[Ww]hat{SP}are{EW}	{	printf("%cotta", yytext[0]); eos(); }

{BW}other		|
[MmNnRr]other			printf("%cuvver",yytext[0]);
[MmSs]outh			printf("%cowf", yytext[0]);
[cYy]outh			printf("%coof", yytext[0]);
[^o]uth				printf("%.2sf",yytext);
{BW}th[^e]		|
[AaEeIiOo]th[^em]	{	printf("%cf",yytext[0]); plastc(); }
oothe			|
e[ei]the		{	printf("%c%cve", yytext[0], yytext[0]); }
ooth			|
eeth			{	printf("%c%cf", yytext[0], yytext[0]); }
[aei]the		{	printf("%cvv",yytext[0]); plastc(); }
th				putchar('v');
a[km]e{EW}		{	printf("i%ce",yytext[1]); eos(); }
[^r][Oo]ld			printf("%.2swld",yytext);
[^AaEeIiOoUu][uo]nd[a-z] 	printf("%cunn%c",yytext[0],yytext[yyleng-1]);
ing{EW}			{	printf("in'"); eos(); }
[^dg]get+[^h]			printf("%cge'%c",yytext[0],yytext[yyleng-1]);
ail				printf("aiw");
any				printf("enny");
[rSs]ay{EW}		{	printf("%cigh",yytext[0]); eos(); }
way				printf("why");
[BbHh]it{EW}		{	printf("%ci'",yytext[0]); eos(); }
ait{EW}			{	printf("ite"); eos(); }
ime{EW}			{	printf("oime"); eos(); }
[^e]ize[^n]			printf("%coize%c",yytext[0],yytext[yyleng-1]);
[^e]ight			printf("%coit",*yytext);
[a-z]"?"		{	*(yytext+1) = ',';
				printf("%s roit?",yytext);
				clear_did();
			}
[a-z]"."		{	printf("%c", yytext[0]); dintI(); }
\n				printf("\n");

%%

eos()
{
    if (yytext[yyleng-1] == '.')
	dintI();
    else
	unput(yytext[yyleng-1]);
}

plastc()
{
    unput(yytext[yyleng-1]);
}

caseify(c)
char c;
{
    if (yytext[0] <= 'Z')
	return (c - ' ');
    else
	return (c);
}


I()
{
/*    extern long random(); */

    if (random() % 100 < 20)
	printf("%cOy",yytext[0]);
    else
	printf("%cI",yytext[0]);
}

static short b_count = 0;
static short b_which = 0;

bloody()
{
	if (b_count++ % 2 == 0) {
		switch (b_which++ % 4) {
			case 0: printf("bloody "); break;
			case 1: printf("flinkin' "); break;
			case 2: printf("bleedin' "); break;
			case 3: printf("soddin' "); break;
			}
		}
}

static short did = 0;

set_did(val)
{
    did = val;
}

clear_did()
{
    did = 0;
}

dintI()
{
/*    extern long random(); */

    if ((did == 1) && (random() % 100 < 50))
	printf(", didn'I?");
    else if ((did == 2) && (random() % 100 < 50))
	printf(", din't we?");
    else
	printf(".");
    clear_did();
}

pooped()
{
/*    extern long random(); */

    switch (random() % 3) {
	case 0:
	    printf("%cknackered", yytext[0]);
	    break;
	case 1:
	    printf("%cshagged out", yytext[0]);
	    break;
	case 2:
	    printf("%cdone in", yytext[0]);
	    break;
	}
}

expletive()
{
/*
Blimey
Stright a light
'Strewth
Cor blimey
*/
}

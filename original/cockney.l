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

BW [^A-Za-z0-9_]
SP [ \t]+
EW [^A-Za-z0-9_]

%Start junk

%option noyywrap

%{
#include<time.h>
void eos(void);
void plastc(void);
char caseify(char);
void I(void);
void bloody(void);
void set_did(short);
void clear_did(void);
void dintI(void);
void pooped(void);
void expletive(void);
%}

%%

<junk>.			{	unput(yytext[0]); BEGIN 0; }
{BW}[Tt]he{EW}		{	bloody(); }
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
{BW}[Hh]old			printf("%c'owld",yytext[0]);
{BW}[Hh]			printf("%c'",yytext[0]);
{BW}[Yy]our{EW}		{	printf("%.2ser",yytext); eos(); }
{BW}it{EW}		{	printf("%.2s'",yytext); eos(); }
{BW}go{EW}		{	printf("%.2sow",yytext); eos(); }
{BW}and{EW}		{	printf("%c'n'",yytext[0]); eos(); }
{BW}my{EW}		{	printf("%.2se",yytext); eos(); }
{BW}th(is|at){EW}	{	printf("%.5s", yytext); eos(); }
{BW}[Ww]e{SP}went{EW}	|
{BW}[Ww]e{SP}did{EW}	{	printf("%.*s",(int)yyleng-1,yytext);
				set_did(2);
				eos();
			}
{BW}[Ww]e{SP}had{EW}	{	printf("%.*s'ad",4,yytext);
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

{BW}[Yy]ou{SP}[^aeiouy]	{	printf("%.2s", yytext); plastc(); unput('\'');}
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

long fakeRand(long* seed) {
	*seed = *seed * 48271 % 0x7fffffff;
	return (*seed);
}

void eos()
{
    if (yytext[yyleng-1] == '.') {
    	dintI();
	} else if (yytext[yyleng-1] == '?') {
		printf(", roit?");
		clear_did();
	} else {
		plastc();
	}
}

void plastc()
{
    unput(yytext[yyleng-1]);
}

char caseify(c)
char c;
{
    if (yytext[0] <= 'Z')
	return (c - ' ');
    else
	return (c);
}

long Iseed = 1;
void I()
{
	if (fakeRand(&Iseed) % 5 == 1)
	printf("%cOy",yytext[0]);
    else
	printf("%cI",yytext[0]);
}

static short b_count = 0;
static short b_which = 0;

void bloody()
{
	if (b_count++ % 2 == 0) {
		switch (b_which++ % 4) {
			case 0: printf("%sbloody", yytext); break;
			case 1: printf("%sflinkin'", yytext); break;
			case 2: printf("%sbleedin'", yytext); break;
			case 3: printf("%ssoddin'", yytext); break;
		}
	} else {
		printf("%.*s", (int)yyleng-1, yytext);
	}
	plastc();
}

static short did = 0;

void set_did(val)
short val;
{
	// Use whichever "did" or "we" came first in the sentence, because that's
	// most likely to be the subject of the sentence.
	if (did == 0) {
	    did = val;
	}
}

void clear_did()
{
    did = 0;
}

long dintISeed = 1;
void dintI() {
	if ((did == 1) && (fakeRand(&dintISeed) % 2 == 0))
		printf(", didn'I?");
	else if ((did == 2) && (fakeRand(&dintISeed) % 2 == 0))
		printf(", din't we?");
	else
		printf(".");
	clear_did();
}

long poopedSeed = 1;
void pooped()
{
    switch (fakeRand(&poopedSeed) % 3) {
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

void expletive()
{
/*
Blimey
Stright a light
'Strewth
Cor blimey
*/
}

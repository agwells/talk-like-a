%{
/*
 *	Lex filter to transform plain English into Brooklyn English.
 *	No racial or societal slurs are intended.  For amusement only.
 *
 *	Copyright 1986 by Daniel Klein.
 *
 *	Reproduction permitted so long as this notice is retained.
 */
%}
BW [ \t]
SP [ \t]
EW [ \t.,;!\?$]
%%
%{
	void plastc() {
		yyunput(yytext[yyleng-1], yytext);
	}
%}
".so ".*$			printf("%s", yytext);
[ao]ther			printf("%cdder", yytext[0]=='a'?'a':'u');
[Nn]othing			printf("%cuttin'", yytext[0]);
[Tt]hin				printf("%cin", yytext[0]);
[Tt]hir				printf("%coi", yytext[0]);
[Tt]h[ei]			printf("%c%c", caseify('d'), yytext[yyleng-1]);
[Tt]hat				printf("%cat", caseify('d'));
I'm{SP}going{SP}to		printf("I'manna");
going{SP}to			printf("gonna");
want{SP}to			printf("wanna");
t{SP}you			printf("tcha");
[Dd]id{SP}you{SP}[eaiou]	printf("%c'j%c", yytext[0], yytext[yyleng-1]);
[Dd]id{SP}you			printf("%c'ja", yytext[0]);
[Yy]ou				printf("%cuh", yytext[0]);
[Hh]ow{SP}are{SP}you		printf("%cowahrya", yytext[0]);
[Ww]ith				printf("%cit'", yytext[0]);
[Dd]on't			printf("%coan", yytext[0]);
ldn't			|
dn't				printf("n't");
isn't				printf("ain't");
er{EW}			{	printf("uh"); plastc(); }
ing{EW}			{	printf("in'"); plastc(); }
[Ww]ord			|
[Hh]eard		|
[BbGgLlPpSs]urg		|
[CcHh][eu]r[ntv]		printf("%coi%c", yytext[0], yytext[yyleng-1]);
[^Mm]mer[^aeiouhrs]		printf("%cmoi%c", yytext[0], yytext[yyleng-1]);
[Oo]re{EW}		{	printf("%cwh", caseify('a')); plastc(); }
[Oo]r				printf("%cwh", caseify('a'));
[Oo]f				printf("%chv", caseify('u'));
tion				printf("shun");
alk			|
our[st]			|
or[st]				printf("awh%c", yytext[yyleng-1]);
ause				printf("awze");
[Oo]ff				printf("%cwhf", caseify('a'));
[Ss]tupid			printf("%ctoopid", yytext[0]);
{BW}under			printf(" unner");
{BW}to{EW}		{	printf(" tuh"); plastc(); }
[Aa]ctual			printf("%cckshul", yytext[0]);
negro				printf("spade");
[Pp]uerto{SP}[Rr]ican		printf("%cpic", caseify('s'));
[Ii]talian			printf("%creaser", caseify('g'));
[Jj]ewish			printf("%cew boy", yytext[0]);
[Jj]ew				printf("%cebe", caseify('h'));
[a-z]":"		{	*(yytext+1) = ',';
				printf("%s like, uhh:",yytext);
			}
[a-z]"?"		{	*(yytext+1) = ',';
				printf("%s or what?",yytext);
			}
!				printf("!  Okay?");
[a-z]"."		{	printf("%s", yytext);expletive();}
%%

caseify(c)
char c;
{
	if (yytext[0] <= 'Z')
		return (c - ' ');
	else
		return (c);
}

short	count = 0;
short	which = 0;

expletive()
{
	if (count++ % 4 == 0) {
		switch (which++ % 5) {
			case 0: printf("  Okay?"); break;
			case 1: printf("  Right?"); break;
			case 2: printf("  Yuh got me so fahr?"); break;
			case 3: printf("  Ya' dig?"); break;
			case 4: printf("  Yuh with me?"); break;
			}
		}
}

main()
{
	yylex();
}

int yywrap()
{
	return 1;
}

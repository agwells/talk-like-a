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
** The cow filter
** 	by Benjamin Elijah Griffin 	8 May 1994
**
** An experiment in lex written instead of a paper on Nietzsche.
**
** compile like this:
**		lex moo.l
**		cc -o moo lex.yy.c -ll
**		rm lex.yy.c
**
** use like this:
**		moo < infile > outfile
**	or
**		cat infile | <whatever> | moo | <whatever> > outfile
**
*/

char WhAt[]="@(#)Benjamin Elijah Griffin's moo filter for cowtalk (c) 1994\n@(#)$Header: moo.l,v 1.1 94/05/08 23:37:53 bgriffin Final $"
;

%}

%%

" and "				printf(" moond ");
[Uu][Nn][Ii][Xx]		printf("Moonix");
[Mm][Ss].[Dd][Oo][Ss]		printf("Moo Dos");
news				printf("moos");
[Uu]senet			printf("Moosnet");
" man "                     	printf(" mooster ");
" men "				printf(" moosters ");
woman				printf("moostress");
women				printf("moostresses");
pig				printf("cop");
[Dd]airy.[Ff]armer		printf("Pimp");
[Dd]airy.[Ff]arm		printf("Farm of Ill Repute");
[Bb]eef.[Ff]armer		printf("Slave Driver");
[Bb]eef.[Ff]arm			printf("Prison");
yogurt				printf("bacteria culture");
cheese				printf("smega");
curds				printf("moist smega");
whey				printf("bile");
buttermilk			printf("foul fluid");
butter				{ printf("sphinter lubrication");
				/* A _Last Tango in Paris_ joke */ }
cream				printf("honey");
beef				printf("murdered meat");
grass				printf("gourmet greenry");
hay				printf("subsistance rations");
cereal				printf("fomood");
milkmaid			printf("rapist");
[Mm]aid.a.milkin	|
[Mm]aid.a.milking		printf("Christmas Rapist");
[Mm]aids.a.milkin	|
[Mm]aids.a.milking		printf("Christmas Rapists");
milking				printf("rape");
rape				printf("milking");
rapist				printf("milkmaid");
veal				printf("the devil's food");
"bull fighter"			printf("Grim Reaper");
"bull fight"			printf("Game of Sorrows");
milk				printf("mead");
Milk				printf("Mead");
"cafe con latte"	|
capuccino			printf("piss water");
" "[In]"ndia "			printf("Heaven");
" "[In]"ndian "			printf("heavenly");
"sacred cow"			printf("God");
silo				printf("calfeteria");
divin				printf("bovin");
[Gg][Oo-][Dd]			printf("Bovinity");
sheep				printf("dog(s)");
relaxing			printf("chewing the cud");
relax				printf("chew the cud");
utter				printf("udder");
" udder"			printf(" teat");
" teat"				printf(" udder");
other				printf("udder");
":^)"				printf("Mooooooooo!");
":-)"				printf("Moomoomoomoo!");
"8-)"				printf("Mooo! Mooo!");

[aeiou]"."		{	*(yytext+1) = 0; 
				printf("%s. Moo.",yytext);
			}
[rtpwy]"."		{	*(yytext+1) = 0; 
				printf("%s. Moo! Moo.",yytext);
			}
"?"				printf("? Moo.");
"!"				printf("! MOO!");
oo				printf("MOO");
o				printf("oo");
O				printf("Moo");
you				printf("moo");
" u"				printf("moo");
" U"				printf("Moo");
"uu"				printf("MOOO");
u				printf("oo");
U				printf("Oo");

"."\n				printf(".\nMooooo. ");

.				printf("%s",yytext);

%%

main()
{
	yylex();
}


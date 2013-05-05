%{
/*
 *	Lex filter to transform plain English into Jive English.
 *	No racial or societal slurs are intended.  For amusement only.
 *
 *	Copyright 1986 by Daniel Klein and Clement Cole.
 *
 *	Reproduction permitted so long as this notice is retained.
 */

%}
%e 1700
%p 4000
%n 700
%k 450
%a 1700
%o 1500
BW [ \t\(]
EW [ \t.,;!\?$\)]
%%
%{
	void plastc()
	{
		unput(yytext[yyleng-1]);
	}
%}
@[Bb]egin(.*)		|
".so ".*$			printf("%s", yytext);
{BW}send			printf("%ct'row",yytext[0]);
program+			printf("honky code");
[Uu]nix				printf("slow mo-fo");
UNIX				printf("dat slow mo-fo");
actual				printf("ak'shul");
{BW}take			printf("%csnatch",yytext[0]);
{BW}took		|
{BW}take[ns]			printf("%csnatch'd",yytext[0]);
[Mm]exican			printf("%cet-back", caseify('w'));
[Ii]talian			printf("%creaser", caseify('g'));
{BW}big{EW}		{	printf("%cbig ass",yytext[0]);plastc();}
fool				printf("honkyfool");
modem				printf("doodad");
{BW}he{EW}		{	printf("%cmah' man he",yytext[0]);plastc();}
"e the"{EW}		|
"a the"{EW}		|
"t the"{EW}		|
"d the"{EW}		{	printf("%c da damn", yytext[0]);plastc();}
wife			|
woman				printf("mama");
girl				printf("goat");
something			printf("sump'n");
{BW}lie				printf("%chonky jive",yytext[0]);
-o-                     	printf("-on rebound-");
[a-z]"."		{	printf("%s", yytext);expletive();}
!                       	printf(".  Right On!");
[Ss]ure				printf("%cho'", yytext[0]);
get				printf("git");
"will have"{EW}		|
"will"{EW}		|
"got to"{EW}		{	printf("gots'ta");plastc();}
"I am"				printf("I's gots'ta be");
"aren't"		|
"am not"		|
"have not"		|
"is not"		|
"are not"			printf("ain't");
{BW}see{EW}		{	printf("%csee's",yytext[0]);plastc();}
{BW}are{EW}		{	printf("%cis",yytext[0]);plastc();}
{BW}hat{EW}		{	printf("%cfedora",yytext[0]);plastc();}
{BW}shoe			printf("%ckicker",yytext[0]);
{BW}"have to"{EW}	|
{BW}has{EW}		{	printf("%cgots'ta",yytext[0]);plastc();}
have				printf("gots'");
{BW}go{EW}		|
{BW}"come over"{EW}	|
{BW}come{EW}            {       printf("%cmosey on down",yytext[0]);plastc();}
buy				printf("steal");
{BW}car{EW}             {	printf("%cwheels",yytext[0]);plastc();}
drive				printf("roll");
{BW}food			printf("%ccatfish an' colluhd greens",yytext[0]);
{BW}eat{EW}		{	printf("%cfeed da bud",yytext[0]);plastc();}
drink				printf("guzzle");
black			|
negro				printf("brother");
white 				printf("honky");
nigger				printf("gentleman");
nice				printf("supa' fine");
{BW}person			printf("%csucka'",yytext[0]);
[Pp]eople			printf("%cucka's", caseify('s'));
{BW}thing			thing(yytext[0]);
house{EW}		{	printf("crib");plastc();}
home				printf("plantation");
name				printf("dojigger");
{BW}path			printf("%calley",yytext[0]);
[Cc]omputer			printf("%clunker", yytext[0]);
or				printf("o'");
president			printf("super-dude");
"prime minister"		printf("prahm mistah");
government			printf("guv'ment");
knew				printf("knowed");
[Bb]ecause			printf("'%cuz", caseify('c'));
[Yy]our				printf("%co'", yytext[0]);
[Ff]our				printf("%coe", yytext[0]);
got				printf("gots");
young				printf("yung");
you				printf("ya'");
You				printf("You's");
first				printf("fust");
police				printf("honky pigs");
{BW}string			printf("%cchittlin'",yytext[0]);
{BW}read			printf("%ceyeball",yytext[0]);
write				printf("scribble");
think{EW}		{	printf("thin'");plastc();}
with				printf("wif");
other				printf("uthu'");
[Tt]hr				printf("%c'r", yytext[0]);
[Tt]h				printf("%c", caseify('d'));
ing				printf("in'");
{BW}a{EW}		{	printf("%csome",yytext[0]);plastc();}
{BW}to{EW}		{	printf("%ct'",yytext[0]);
				if(yytext[yyleng-1]!=' ')
					plastc();
			}
tion				printf("shun");
[Aa]lmost			printf("%cos'", caseify('m'));
from				printf("fum");
[Yy]"ou're"			printf("%couse", yytext[0]);
alright			|
okay				printf("coo'");
[Aa]nd				printf("%cn'", yytext[0]);
known				printf("knode");
want				printf("wants'");
beat				printf("whup'ed");
ile				printf("ah'l");
er{EW}			{	printf("uh");plastc();}
[a-z]sti			printf("%cs'i", yytext[0]);
tute				printf("toot");
exp				printf("'sp");
exs			|
exc				printf("'s");
{BW}ex				printf("%c'es",yytext[0]);
[ae]ct{EW}		{	printf("%cc'", yytext[0]); plastc(); }
like				printf("likes");
done			|
did				printf("dun did");
"kind of"			printf("kind'a");
women				printf("honky chicks");
{BW}man{EW}		{	printf("%cdude",yytext[0]);plastc();}
{BW}men{EW}		|
{BW}mens{EW}		{	printf("%cdudes",yytext[0]);plastc();}
injured				printf("hosed");
killed			|
dead				printf("wasted");
good				printf("baaaad");
open{EW}		{	printf("jimmey");plastc();}
opened{EW}		{	printf("jimmey'd");plastc();}
{BW}very			printf("%creal",yytext[0]);
per				printf("puh'");
oar				printf("o'");
{BW}can				printf("%ckin",yytext[0]);
{BW}just{EW}		{	printf("%cplum",yytext[0]);plastc();}
[Dd]etroit			printf("Mo-town");
[Ww]"estern "[Ee]"lectric"	printf("da' cave");
{BW}believe			printf("%crecon'",yytext[0]);
[Ii]"ndianapolis"		printf("Nap-town");
Daniel			|
Dan				printf("Liva' Lips");
Reagan				printf("Kingfish");
Ronald{EW}		|
Ron{EW}			{	printf("Rolo");plastc();}
John				printf("Rastus");
Jim				printf("Bo-Jangles");
pontiff			|
pope				printf("wiz'");
[Pp]ravda			printf("dat commie rag");
broken				printf("bugger'd");
strange{EW}		{	printf("funky");plastc();}
dance{EW}		{	printf("boogy");plastc();}
ask				printf("ax'");
{BW}so{EW}		{	printf("%cso's",yytext[0]);plastc();}
heard				printf("'hoid");
head				printf("'haid");
boss				printf("main man");
money				printf("bre'd");
[a-z]":"		{	*(yytext+1) = ',';
				printf("%s dig dis:",yytext);
			}
amateur				printf("begina'");
radio				printf("transista'");
{BW}of{EW}		{	printf("%cuh",yytext[0]);plastc();}
which			|
what				printf("whut");
"don't"				printf("doan'");
does				printf("duz");
{BW}was{EW}		|
{BW}were{EW}		{	printf("%cwuz",yytext[0]);plastc();}
{BW}understand			printf("%cdig",yytext[0]);
{BW}my				printf("%cmah'",yytext[0]);
again			|
against				printf("agin'");
{BW}[Ii]{EW}		{	printf("%cah'",yytext[0]);plastc();}
meta				printf("meta-fuckin'");
cally				printf("c'l");
%%

caseify(c)
char c;
{
	if (yytext[0] <= 'Z')
		return (c - ' ');
	else
		return (c);
}

thing(c)
char c;
{
	static short	count = 0;

	putchar(c);
	switch (count++ % 4) {
		case 0: case 2:
			printf("thang");
			break;
		case 1:
			printf("doohickey");
			break;
		case 3:
			printf("wahtahmellun");
			break;
		}
}
expletive()
{
	static short	count = 0;
	static short	which = 0;

	if (count++ % 4 == 0) {
		switch (which++ % 5) {
			case 0: printf("  What it is, Mama!"); break;
			case 1: printf("  Ya' know?"); break;
			case 2: printf("  Sheeeiit."); break;
			case 3: printf("  Ya' dig?"); break;
			case 4: printf("  Git down!"); break;
			}
		}
}

/*
 * Bugs:
 *
 * If a sentence starts with a keyword it doan' get converted, or:
 * it do, but gets a leading space
 */

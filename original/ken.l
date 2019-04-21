%{
/*
 * ken:
 * will turn English into Cockney, featuring (dubious) rhyming slang for a lot
 * of computer terminology.
 * 
 * Written by Stephen K Mulrine <smulrine%cs.strath.ac.uk@nsfnet-relay.ac.uk>
 * Make copies if you want etc.etc.
 * 
 * Contacted author in June 2001, asked him to clarify the license, he replied
 * with some improvements and placed the program in the public domain.
 *         -- Edward Betts <edward@debian.org> Mon, 11 Jun 2001 12:04:29 +0100
 * 
 * ken is named after Ken the Chirpy Cockney Character from the Viz Comic (tm),
 * who speaks somewhat like that.
 */
%}
%e 3000
%p 6000
%n 1000
%k 500
%a 4000
%o 2000
BW [ 	]
EW [ 	.,;!?]
%{
    char buf[128];
long fakeRand();
%}

%%

stairs		printf("apples and pears");
Downstairs	printf("Down the apples and pears");
downstairs	printf("down the apples and pears");
Upstairs	printf("Up the apples and pears");
upstairs	printf("up the apples and pears");
[Mm]outh	printf("North and South");
[Ff]ace		printf("Boat Race");
[Tt]rouble	printf("Barney Rubble");
wife		{	switch(fakeRand()%2)
			{
			case 0: printf("trouble and strife"); break;
			case 1: printf("ole lady"); break;
			}
		}
Road		printf("Frog and Toad");
" road"		printf(" frog and toad");
"pub "		printf("rub-a-dub ");
" bar "		printf(" boozer ");
" husband"	printf(" ole man");
Party		printf("Knees-up");
party		printf("knees-up");
Parties		printf("Knees-ups");
parties		printf("knees-ups");
My		printf("Me");
" my"		printf(" me");
Your		printf("Yer");
your		printf("yer");
"You are "      printf("Yer ");
"you are "      printf("yer ");
You		printf("Yer");
you		printf("yer");
Those		printf("Them");
those		printf("them");
" those"	printf(" them");
"(those"	printf("(them");
"The "		{   switch(fakeRand()%5)
		    {
		    case 0: printf("The bleedin' "); break;
		    default: ECHO; break;
		    }
		}
"The"		ECHO;
" the "		{   switch(fakeRand()%5)
		    {
		    case 0: printf(" the bleedin' "); break;
		    default: ECHO; break;
		    }
		}
[" "(]the	ECHO;
"the "		{   switch(fakeRand()%5)
		    {
		    case 0: printf(" the bleedin' "); break;
		    default: ECHO; break;
		    }
		}
[Tt]his		ECHO;
[" "(]this	ECHO;
[Tt]hat		ECHO;
[" "(]that	ECHO;
Thus		printf("So");
" thus"		printf(" so");
"(thus"		printf("(so");
"thus"		printf("so");
[Tt]han		ECHO;
[" "(]than	ECHO;
Who		ECHO;
who		ECHO;
" old "		printf(" ole ");
" to "		printf(" ter ");
"Aren't you "   printf("Aintcha ");
"aren't you "   printf("aintcha ");
"Aren't"	printf("Ain't");
"aren't"	printf("ain't");
"Isn't"		printf("Ain't");
"isn't"		printf("ain't");
"Are not "	printf("Ain't");
"are not "	printf("ain't ");
"Is not "	printf("Ain't ");
" is not "	printf(" ain't ");
"What is th"    printf("Woss");
"what is th"    printf("woss");
"What are you "	printf("Wotcher ");
"what are you "	printf("wotcher ");
"What you are"	printf("Wotcher");
"what you are"	printf("wotcher");
"What you're"	printf("Wotcher");
"what you're"	printf("wotcher");
"What are your"	printf("Wotcher");
"what are your"	printf("wotcher");
"What do you "  printf("Wotcher ");
"what do you "	printf("wotcher ");
"What do your"  printf("Wotcher");
"what do your"	printf("wotcher");
" "H[aeu]llo	printf(" Wotcher");
" "h[aeu]llo	printf(" wotcher");
What		printf("Wot");
what		printf("wot");
Were		printf("Was");
were 		printf("was");
Bother		printf("Ars");
bother		printf("ars");
Mother		printf("Muvver");
Other		printf("Uvver");
other		printf("uvver");
Father		printf("Favver");
father		printf("favver");
Rather		printf("Ravver");
rather		printf("ravver");
Weather		printf("Wevver");
weather		printf("wevver");
Leather		printf("Levver");
leather		printf("levver");
Wither		printf("Wivver");
wither		printf("wivver");
Either		printf("Eever");
either		printf("eever");
With		printf("Wiv");
with		printf("wiv");
Anything	printf("Anyfink");
anything	printf("anyfink");
Something	printf("Sumfink");
something	printf("sumfink");
Nothing		printf("Nuffink");
nothing		printf("nuffink");
guitars		printf("spoons");
guitar		printf("spoons");
drums		printf("spoons");
drum		printf("spoons");
trumpets	printf("spoons");
trumpet		printf("spoons");
violins		printf("spoons");
violin		printf("spoons");
clarinets	printf("spoons");
clarinet	printf("spoons");
trombones	printf("spoons");
trombone	printf("spoons");
oboes		printf("spoons");
oboe		printf("spoons");
flutes		printf("spoons");
flute		printf("spoons");
tubas		printf("spoons");
tuba		printf("spoons");
Data		printf("Info");
data		printf("info");
Directory	printf("Lockup");
directory	printf("lockup");
Directories	printf("Lockups");
directories	printf("lockups");
[Pp]rocess	{   switch(fakeRand()%2)
		    {
		    case 0: printf("Queen Bess"); break;
		    case 1: printf("Rudolf 'Ess"); break;
		    }
		}
[Cc]omputer	printf("French Tutor");
[Bb]yte		printf("Jimmy White");
[Ff]iles	printf("Nobby Stiles");
[Ff]ile		printf("Royal Mile");
[Ll]anguage	printf("'Am Sandwich");
[Zz]ero		printf("Emperor Nero");
[Jj]ob		printf("Uncle Bob");
[Ss]hell	printf("Bow Bell");
[Ss]ave		printf("Chas'n'Dave");
[Ll]oad		printf("Old Kent Road");
[Mm]ouse	printf("Doll's 'Ouse");
[Bb]uffer	printf("Sausage Stuffer");
[Kk]eyboard	printf("Henry Ford");
[Mm]anual	printf("Cocker Spaniel");
[Ss]creen	printf("James Dean");
[Pp]rinter	printf("'Arold Pinter");
[Pp]lotter	printf("Pansy Potter");
[Cc]ompiler	printf("Martin Tyler");
[Ss]tring	printf("Emperor Ming");
[Bb]rain	printf("Michael Caine");
[Pp][Aa][Ss][Cc][Aa][Ll]	{   switch(fakeRand()%2)
				    {
				    case 0: printf("Pall Mall"); break;
				    case 1: printf("Roald Dahl"); break;
				    }
				}
[Aa][Ll][Gg][Oo][Ll]	printf("Johnny Ball");
[Ff][Oo][Rr][Tt][Rr][Aa][Nn]	printf("Manfred Mann");
[Cc][Oo][Bb][Oo][Ll]	printf("Albert Hall");
[Jj]ava		printf("Wot a palavah");
W[aA][pP]	printf("Pony and trap");
" wap"		printf(" pony and trap");
Stopped		printf("'Ad the mockers put on");
stopped		printf("'ad the mockers put on");
Stopping	printf("Putting the mockers on");
stopping	printf("putting the mockers on");
stops		printf("puts the mockers on");
stop		printf("put the mockers on");
STOP		printf("Put The Mockers On");
[Ll]ondoner	printf("Cockney");
friend		{   switch(fakeRand()%3)
		    {
		    case 0: printf("mucker"); break;
		    case 1: printf("mate"); break;
		    case 2: printf("china"); break;
		    }
		}
"a h"		printf("an '");
"A h"		printf("An '");
" h"		printf(" '");
" H"		printf(" '");
" C-"		printf(" Bruce Lee-");
" C "		{        switch(fakeRand()%4)
			 {
			 case 0: printf(" Bruce Lee "); break;
			 case 1: printf(" Circus Flea "); break;
			 case 2: printf(" Bumble Bee "); break;
			 case 3: printf(" Door Key "); break;
			 }
		}
" C."		printf(" Circus Flea.");
Th		printf("F");
Wh		printf("W");
wh		printf("w");
aw		printf("or");
" "[BbKkMmPpRrSsWw]ing	ECHO;
" "[Bb]ring	ECHO;
" "[Ss]ting	ECHO;
" "[Ss]wing	ECHO;
" "[CcFfSs]ling	ECHO;
" Thing"	printf(" Fing");
" thing"	printf(" fing");

"ing "		printf("in' ");
". "		{   switch(fakeRand()%32)
		    {
		    case 0: printf(". I'll get out me spoons. "); break;
		    case 1: printf(". Yer can't 'ave a knees-up wivout a joanna. "); break;
		    case 2: printf(". Cor blimey guv, would I lie to you. "); break;
		    case 3: printf(". I'll make us all a nice cup of tea. "); break;
		    default: ECHO; break;
		    }
		}
"? "		{   switch(fakeRand()%3)
		    {
		    case 0: printf(", mate? "); break;
		    case 1: printf(", guv? "); break;
		    case 2: printf(", squire? "); break;
		    }
		}
"! "		{   switch(fakeRand()%6)
		    {
		    case 0: printf(", cor blimey! "); break;
		    case 1: printf("! Struth! "); break;
		    case 2: printf(", guv! "); break;
		    case 3: printf("! Honest guv! "); break;
		    case 4: printf(", mate! "); break;
		    case 5: ECHO; break;
		    }
		}
.		printf("%s", yytext);
\n		printf("\n");
%%

long fakeRandSeed = 1;
long fakeRand() {
	fakeRandSeed = fakeRandSeed * 48271 % 0x7fffffff;
	return (fakeRandSeed);
}


T	[" .!?,"]*

%%

" bad"			printf(" mean");
" big"			printf(" bitchin'est");
" body"			printf(" bod");
" bore"			printf(" drag");
" car "			printf(" rod ");
" dirty"		printf(" grodie");
" filthy"		printf(" grodie to thuh max");
" food"			printf(" munchies");
" girl"			printf(" chick");
" good"			printf(" bitchin'");
" great"		printf(" awesum");
" gross"		printf(" grodie");
" guy"			printf(" dude");
" her "			printf(" that chick ");
" her."			printf(" that chick.");
" him "			printf(" that dude ");
" him."			printf(" that dude.");
" can be "		|
" can't be "		|
" should have been "	|
" shouldn't have been "	|
" should be "		|
" shouldn't be "	|
" was "			|
" wasn't "		|
" will be "		|
" won't be "		|
" is "		{
			ECHO;
			switch(rand() % 6)
			{
			case 0:
				printf("like, ya know, "); break;
			case 1:
				printf(""); break;
			case 2:
				printf("like wow! "); break;
			case 3:
				printf("ya know, like, "); break;
			case 4:
				printf(""); break;
			case 5:
				printf(""); break;
			}
		}
" house"		printf(" pad");
" interesting"		printf(" cool");
" large"		printf(" awesum");
" leave"		printf(" blow");
" man "			printf(" nerd ");
" maybe "	{
			switch(rand() % 6)
			{
			case 0:
				printf(" if you're a Pisces "); break;
			case 1:
				printf(" if the moon is full "); break;
			case 2:
				printf(" if the vibes are right "); break;
			case 3:
				printf(" when you get the feeling "); break;
			case 4:
				printf(" maybe "); break;
			case 5:
				printf(" maybe "); break;
			}
		}
" meeting"		printf(" party");
" movie"		printf(" flick");
" music "		printf(" tunes ");
" neat"			printf(" keen");
" nice"			printf(" class");
" no way"		printf(" just no way");
" people"		printf(" guys");
" really"		printf(" totally");
" strange"		printf(" freaky");
" the " 		printf(" thuh ");
" very"			printf(" super");
" want"			printf(" want");
" weird"		printf(" far out");
" yes"			printf(" fer shure");
"But "			printf("Man, ");
"He "			printf("That dude ");
"I like"		printf("I can dig");
"No,"			printf("Like, no way,");
Sir			printf("Man");
"She "			printf("That fox ");
This			printf("Like, ya know, this");
There			printf("Like, there");
"We "			printf("Us guys ");
"Yes,"			printf("Like,");
", "		{
			switch(rand() % 6)
			{
			case 0:
				printf(", like, "); break;
			case 1:
				printf(", fer shure, "); break;
			case 2:
				printf(", like, wow, "); break;
			case 3:
				printf(", oh, baby, "); break;
			case 4:
				printf(", man, "); break;
			case 5:
				printf(", mostly, "); break;
			}
		}
!		{
			switch(rand() % 3)
			{
			case 0:
				printf("!  Gag me with a SPOOOOON!"); break;
			case 1:
				printf("!  Gag me with a pitchfork!"); break;
			case 2:
				printf("!  Oh, wow!");
			}
		}

ing			printf("in'");
.			ECHO;
%%

main()
{
	srand(getpid());
	yylex();
}

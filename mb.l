From: dankmyer@hilbert.math.grin.edu (Kirt A Dankmyer)
Newsgroups: alt.sources
Subject: mb.l
Date: 4 Dec 1992 15:08:40 -0600
Message-ID: <9212042108.AA10484@hilbert>

%{

        /*  Marc Barrett posting translator;
		amaze your friends
            To compile: lex mb.l
                        cc -o mb lex.yy.c -ll
	    To use:
			mb < Your_MB_posting
        */

        char buf[128];
%}
%a 3000
%e 3000
%p 5000
%n 3000
%%
"lots and lots"                 printf("few");
"HyperCard"                     printf("crap");
"real,"                         printf("phony,");
"real."                         printf("phony.");                       
"real "                         printf("phony ");                      
"People"                        printf("I");                  
"numerous"                      printf("1 or 2 (I think)");           
" other"                        printf(" lamer");                      
"nightmare"                     printf("paradise");                   
"bad"                           printf("excellent");                   
"may"                           printf("will");                       
"UNUSABLE"                      printf("FAST AS HELL");                      
"pokish"                        printf("slower than a snail");
"junior"                        printf("intelligent");         
"potentially"                   printf("probably");
"I know" 		        printf("I think");
"looks a thousand times better"  printf("looks worse");
"years ago"                     printf("years ago (before I bought an Amiga) ");
"no improvements"               printf("many improvements");
"As far as I know"              printf("I don't really know");
"as far as I know"              printf("but what do I know");
"totally official"              printf("a wild rumor");
"kludged"                       printf("designed");
"be any"		        printf("be some");
"also likely never"	        printf("also probably");
"likely never"		        printf("probably");
"everyone"		        printf("some people");
"being unreasonable"	        printf("being an idiot");
"I don't understand"	        printf("I dont' understand.  ");
"it is unreasonable"	        printf("it is stupid.  ");
"everybody"		        printf("some people");
"have never"		        printf("will have");
"must have"	                printf("could have");
"will never"		        printf("will");
"never will"		        printf("will again soon");
"would not"			printf("may"); 
"the need"			printf("some silly things");
"The problem"		        printf("My problem");
"the problem"			printf("my problem");
"the simple fact"		printf("my opinion");
"simply"			printf("(with great difficulty)");
"it's kind of embarassing"      printf("I'm kind of embarassing");
"I often see"      		printf("I never see");
"I questioned"      		printf("I flamed");
"development costs"		printf("development costs (which, I'd like to remind you, I know nothing about)");
"IMO"		   		printf("(belch)");
"to explain"		        printf("to give my wacky ideas about");
"practically zero"		printf("astronomical");
"I think"			printf("I think.  ");
"don't think"			printf("don't think.  ");
"do not think."			printf("do not think.  ");
"I am trying"			printf("I am flaming");
"I've"		                printf("Commodore has");
"Beware the ides of September"  printf("I'm gonna flame any new stuff shown in September");
"Sad"				printf("Weird");
"sad"				printf("weird");
"I WAS RIGHT"	 		printf("I DON'T KNOW WHAT I'M TALKING ABOUT");
"aren't"                        printf("are");
"anymore"                       printf("still");
" are "                         printf(" aren't ");
"lost"                          printf("gained");
" low "                         printf(" high ");
" high "                        printf(" low ");
"isn't"                         printf("is");
"all of"                        printf("none of");
"is not"                        printf("is");
"stagnates"                     printf("flourishes");
"never"                         printf("always");    
"short-sightedness"             printf("genius");
"inferior"                      printf("superior");
"superior"                      printf("inferior");
"few "                          printf("many ");
"many"                          printf("few");
"no improvements"               printf("many improvements");
"different"                     printf("similar");
"the only substantial"          printf("one of the many");
"best"                          printf("worst");
"worst"                         printf("best");
"except for"                    printf("including");
"worse"                         printf("better");
"better"                        printf("worse");
"nothing"                       printf("something");
"something"                     printf("nothing");
"no longer"                     printf("still");
"biggest"                       printf("smallest");
"high"                          printf("low");
" low"                          printf(" high");
"does not"                      printf("does");
"doesn't"                       printf("does");
"brilliantly"                   printf("inferiorly");
"Avoid"                         printf("Search out");
"lots of"                       printf("a few");
"beautifully"                   printf("horribly");
"wrong"                         printf("right");
"right"                         printf("wrong");
"tight"                         printf("loose");
"loose"                         printf("tight");
"same"                          printf("different");
"disappointing"                 printf("impressive");
"pieces of shit"                printf("accomplishments");
" NO!"                          printf(" YES!");
"retrogrades"                   printf("leaps forward");
"garbaged"                      printf("incredible");
"reduced to garbage"            printf("incredible");
"all games"                     printf("no games");
"slow"                          printf("fast");
"fast"                          printf("slow");
"can't"                         printf("can");
"won't"                         printf("will");
"will"                          printf("won't");
" more"                         printf(" less");
"has not"                       printf("has");
%%


%e 2000
%p 5000
%n 1000
%k 500
%a 4000
%o 2000
BW [      ]
EW [      .,;!?]

%{
#include <stdio.h>

char buf[128];
%}

%%
ing                 printf("ingkt");
" the "             printf(" ze ");
"The "              printf("Ze ");
" with "            printf(" mitt ");
"With "             printf("Mitt ");
wr                  printf("w-r-r");
Wr                  printf("W-r-r");
R                   printf("R-r-r");
"Yes "              printf("Jawohl ");
" r"                printf(" r-r-r");
"Yes."              printf("Jawohl.");
"Yes!"              printf("Jawohl!");
"YES!"              printf("JAWOHL!");
" yes "             printf(" ja ");
" yes."             printf(" ja.");
" yes!"             printf(" yes!");
"No "               printf("Nein ");
"No!"               printf("Nein!");
"No?"               printf("Nein?");
" no "              printf(" nein ");
" no."              printf(" nein.");
" no!"              printf(" nein!");
" no?"              printf(" nein?");
[Mm]"r."            printf("Herr");
[Mm]"rs."           printf("Frau");
Miss                printf("Fraulein");
" of "              printf(" uff ");
"Of "               printf("Uff ");
my                  printf("mein");
My                  printf("Mein");
" and "             printf(" undt ");
"And "              printf("Undt ");
"One "              printf("Ein ");
" one"              printf(" ein");
"Is "               printf("Ist ");
" is "              printf(" ist ");
"ow "               printf("ow ");
"w "                printf("w ");
sh                  printf("sch");
Sh                  printf("Sch");
ch                  printf("ch");
Ch                  printf("Ch");
" c"                printf(" k");
" C"                printf(" K");

v                   printf("f");
V                   printf("F");
" w"                printf(" v");
W                   printf("V");
th                  printf("d");
Th                  printf("D");
[Jj]ohn             printf("Johann");
[Ww]illiam          printf("Wilhelm");
[Bb]rad             printf("Wilhelm");
[Gg]ary             printf("Gerhardt");
[Jj]on              printf("Hansel");

[a-f]"!"       {sprintf(buf,"%s Naturlich!",yytext);printf(buf);}
[p-z]"!"       {sprintf(buf,"%s Seig Heil!",yytext);printf(buf);}
.|'\n'              ECHO;

%%
main()
{
  yylex();
}

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
"r"     printf("w");
"l"     printf("w");
"qu"        printf("qw");
"th "       printf("f ");
"th"        printf("d");
"n."        printf("n, uh-hah-hah-hah\. ");
"R"         printf("W");
"L"         printf("W");
"Qu"        printf("Qw");
"QU"        printf("QW");
"TH "       printf("F ");
"TH"        printf("D");
"Th"        printf("D");
"N."        printf("N, uh-hah-hah-hah\. ");

%%
main()
{
  yylex();
  return(0);
}

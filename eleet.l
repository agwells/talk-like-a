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

a                               printf("4");
A                               printf("4");
e                               printf("3");
E                               printf("3");
i                               printf("1");
I                               printf("1");
o                               printf("0");
O                               printf("0");
n                               printf("/\\/");
N                               printf("/\\/");
m                               printf("/\\/\\");
M                               printf("/\\/\\");
v                               printf("\\/");
V                               printf("\\/");
t                               printf("+");
T                               printf("+");
s                               printf("5");
S                               printf("5");
l                               printf("|_");
L                               printf("|_");
x                               printf("><");
X                               printf("><");
h                               printf("|-|");
H                               printf("|-|");

%%
main()
{
  yylex();
  return(0);
}

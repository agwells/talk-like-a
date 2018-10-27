%{

#include "y.tab.h"
extern int yylval;

%}

%%
i                   { yylval = 'y'; return(LETTER); }
I                   { yylval = 'Y'; return(LETTER); }
cks                 { yylval = 'x'; return(LETTER); }
ks                  { yylval = 'x'; return(LETTER); }
cute                { return(CUTE); }
fluff               { return(FLUFF); }
smile               { return(SMILE); }
grin                { return(SMILE); }
laugh               { return(SMILE); }
chuckle             { return(SMILE); }
pr                  { return(PURR); }
p[aeiou]*r          { return(PURR); }
f[aeiou]+r          { return(FUR); }
m[aeiou]+/[^.,s?! ] { return(MEOW); }   /*UN*/
"at a"              { return(ATTA); }
"at the"            { return(ATTA); }
"in a"              { return(YNNA); }
"in the"            { return(YNNA); }
"is a"              { return(YSSA); }
"is the"            { return(YSSA); }
"is so"             { return(YSSA); }
"on a"              { return(ONNA); }
"on the"            { return(ONNA); }
"with a"            { return(WYFFA); }
"with the"          { return(WYFFA); }
"lot of"            { return(LOTTA); }
" with "            { return(WYF); }
" with"             { return(WYFF); }
^"with "            { return(WYF); }
^"with"		    { return(WYFF); }
" with"$            { return(WYF); }
" the "             { return(DA); }
^"the "             { return(DA); }
" the"$             { return(DA); }
" your"		    { return(YER); }
^your               { return(YER); }
" you"              { return(YA); }
^you                { return(YA); }
" and "             { return(AN); }
^"and "             { return(AN); }
" and"$             { return(AN); }
" to "              { return(TA); }
^"to "              { return(TA); }
" to"$              { return(TA); }
" when "            { return(WEN); }
^"when "            { return(WEN); }
" when"$            { return(WEN); }
"n't"		    { return(NA); }  /*UN*/
" not"              { return(NA); }  /*UN*/
[ \t]               { return(' '); }
.                   { yylval = yytext[0]; return(LETTER); } 
%%





%e 2000
%p 5000
%n 1000
%k 500
%a 4000
%o 2000
BW [      ]
EW [      .,;!?]

%{
     char buf[128];

%}

%%
ing                  return("ingkt");
" the "             return(" ze ");
"The "              return("Ze ");
" with "            return(" mitt ");
"With "             return("Mitt ");
wr                  return("w-r-r");
Wr                  return("W-r-r");
R                   return("R-r-r");
"Yes "              return("Jawohl ");
" r"                return(" r-r-r");
"Yes."              return("Jawohl.");
"Yes!"              return("Jawohl!");
"YES!"              return("JAWOHL!");
" yes "             return(" ja ");
" yes."             return(" ja.");
" yes!"             return(" yes!");
"No "               return("Nein ");
"No!"               return("Nein!");
"No?"               return("Nein?");
" no "              return(" nein ");
" no."              return(" nein.");
" no!"              return(" nein!");
" no?"              return(" nein?");
[Mm]"r."            return("Herr");
[Mm]"rs."           return("Frau");
Miss                return("Fraulein");
" of "              return(" uff ");
"Of "               return("Uff ");
my                  return("mein");
My                  return("Mein");
" and "             return(" undt ");
"And "              return("Undt ");
"One "              return("Ein ");
" one"              return(" ein");
"Is "               return("Ist ");
" is "              return(" ist ");
"ow "               return("ow ");
"w "                return("w ");
sh                  return("sch");
Sh                  return("Sch");
ch                  return("ch");
Ch                  return("Ch");
" c"                return(" k");
" C"                return(" K");

v                   return("f");
V                   return("F");
" w"                return(" v");
W                   return("V");
th                  return("d");
Th                  return("D");
[Jj]ohn             return("Johann");
[Ww]illiam          return("Wilhelm");
[Bb]rad             return("Wilhelm");
[Gg]ary             return("Gerhardt");
[Jj]on              return("Hansel");

[a-f]"!"       {sprintf(buf,"%s Naturlich!",yytext);return(buf);}
[p-z]"!"       {sprintf(buf,"%s Sieg Heil!",yytext);return(buf);}
.              return(yytext);
\n             return("\n");

%%



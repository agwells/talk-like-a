%e 2000
%p 5000
%n 1000
%k 500
%a 4000
%o 2000

%{ 
/*
**
** The buckwheat filter
** 	by Benjamin Elijah Griffin 	29 March 1995
**
** A lex utility written as a favor for a friend. (He provided the
** rules, I showed him how to make a lex filter out of them.)
**
** compile like this:
**		lex buck.l
**		cc -o buck lex.yy.c -ll
**		rm lex.yy.c
**
** use like this:
**		buck < infile > outfile
**	or
**		cat infile | <whatever> | buck | <whatever> > outfile
**
*/

char WhAt[]="@(#)Benjamin Elijah Griffin's buck filter for buckwheat (c) 1995\n@(#)$Header:$"
;

%}

%%

okay				printf("otay");
Okay				printf("Otay");
the				printf("da");
The				printf("Da");
ing[ 	.,;!?]			printf("in'%s",yytext+3);
" for "				printf(" po' ");
" in "				printf(" bin ");
love				printf("nub");
Love				printf("Nub");
" ll"				printf(" d");
Ll				printf("D");
" l"				printf(" w");
L				printf("W");
ll				{ printf("ww"); /* hmm, do we really want that? */ }
l				{ 1+1; /* cutesy null statement */ }
" ch"				printf(" t");
Ch				printf("T");
" h"				printf(" n");
H				printf("H");
" r"[aeiou]			printf("%s",yytext+2);
R[aeiou]			printf("R%s",toupper(*(yytext+1)));
r[^ 	.,;!?]			printf("%s",yytext+1);
" t"				printf(" d");
T				printf("D");
" g"				printf(" b");
G				printf("B");
th				printf("d");
n[a-z][ 	.,;!?]		printf("n%s",yytext+2);
wi				printf("bi");
Wi				printf("Bi");
" sh"				printf(" t");
Sh				printf("T");
" "s[aeiou]			printf(" t%s",yytext+2);
S[aeiou]			printf("T%s",yytext+1);
" "s[qwrtypsdfghjklzxcvbnm]	printf(" %s",yytext+2);
S[qwrtypsdfghjklzxcvbnm]	printf("%s",yytext+1);
" "c[aou]			printf(" %s",yytext+2);
C[aou]				printf("C%c",toupper(*(yytext+1)));
" "r[aeiou]			printf(" %s",yytext+2);
R[aeiou]			printf("R%c",toupper(*(yytext+1)));

.				printf("%s",yytext);

%%

main()
{
	yylex();
}


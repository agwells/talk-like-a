%{

#include <stdio.h>
#include <stdlib.h>
typedef int INT;

#define YYSTYPE INT
extern int yylex (void);
int yyerror(char*);
long fakeRand();

%}

%token CUTE
%token FLUFF
%token SMILE
%token PURR
%token FUR
%token MEOW
%token ATTA
%token YNNA
%token YSSA
%token ONNA
%token WYFFA
%token LOTTA
%token WYF
%token WYFF
%token DA
%token YER
%token YA
%token AN
%token TA
%token WEN
%token NA                               /*UN*/
%token LETTER

%%

s:
	| s t
	| s ' ' 
          {  
	    if (fakeRand() % 30 < 1)
	      {
		int inRand;

		inRand = fakeRand() % 5;

		switch(inRand)
		  {
		  case 0:
		    printf(" *truffle break!* ");
		    break;

		  case 1:
		    printf(" *catnap break!* ");
		    break;

		  case 2:
		    printf(" *purrpurr* ");
		    break;

		  case 3:
		    printf(" *meow!* ");
		    break;

		  case 4:
		    printf(" *fluff!* ");
		    break;		    
		  }
	      }
	    else
	      {
		printf(" ");
	      }
	  }
	;

t:	CUTE   { printf("ky00te!"); }
      | FLUFF  { printf("*fluff!*"); }
      | SMILE  { printf("};)"); }
      | PURR   { printf("purr"); }
      | FUR    { printf("fur"); }
      | MEOW   { int inRand;
		 
		 inRand = fakeRand() % 5;

		 switch(inRand)
		   {
		   case 0:
		   case 1:
		   case 2:
		     printf("meow");
		     break;
		   case 3:
		   case 4:
		     printf("mew");
		   }
	       }
      | ATTA   { printf("atta"); }
      | YNNA   { printf("ynna"); }
      | YSSA   { printf("yssa"); }
      | ONNA   { printf("onna"); }
      | WYFFA  { printf("wyffa"); }
      | LOTTA  { printf("lotta"); }
      | WYF    { printf(" wyf "); }
      | WYFF   { printf(" wyff"); } 
      | DA     { printf(" da "); }
      | YER    { printf(" yer"); }
      | YA     { printf(" ya"); }
      | AN     { printf(" 'n "); }
      | TA     { printf(" ta "); }
      | WEN    { printf(" w'en "); } 
      | NA     { printf(" na'"); }            /*UN*/
      | LETTER { if (yylval == 'r') 
		   printf("rr"); 
                 else 
	           printf("%c", $1); }     
      ;


%%

extern char mylval;

int yyerror(char *s) {
	printf("%s\n",s);
}

int main()
{
  yyparse();

  return 0;
}

long fakeRandSeed = 1;
long fakeRand() {
	fakeRandSeed = fakeRandSeed * 48271 % 0x7fffffff;
	return (fakeRandSeed);
}

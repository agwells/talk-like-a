%{

#include <stdio.h>
typedef int INT;

#define YYSTYPE INT

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
	    if (rand() % 30 < 1)
	      {
		int inRand;

		inRand = rand() % 5;

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
		 
		 inRand = rand() % 5;

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

void yyerror(char *s) {
	printf("%s\n",s);
}

int main()
{
  yyparse();

  return 0;
}



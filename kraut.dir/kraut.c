#include <stdio.h>
/* Kraut v0.9  */
/*     by      */
/* John Sparks */
/*  5-5-1989   */

/* This is in the public domain. Do with it as you will. */

const char *yylex(void);

int main()
{
    char *line; 

    while((line = (char *) yylex())) {
         printf("%s", line);
    }

    return 0;
}

int yywrap ()
{
    return (1);
}

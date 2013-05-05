
/*
nethackify
tries to write text ala nethack

cat /etc/motd/ | nethackify
/exec -o nethackify "good morning :)"

gurkan@linuks.mine.nu
*/

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <sys/time.h>

char *normal  ="ABCDEFGHIKLMNOPQRTUVWZbdeghjklmnoqwy:;01678";
char *nethack1="^P(|||C||||||CFCP|J/V/|cccni||nrccvv.,C|o/3";
char *nethack2="?b?)F-(-?<_??(?(F???/??|??????r???????(???o";
char *nethack3=" [ [L       \\                              ";
char *nethack4="    [              \\                       ";
char *nethack5="    _               \\                      ";

int myrandom(float max)
{
   return ((int)(max*rand()/(RAND_MAX+1.0)));
}

void nethackify(char* str)
{
    int i,c;
    for(i=0; i<strlen(str); i++) {
	for(c=0; c<strlen(normal); c++) {
	    if(normal[c]==str[i]) {
		if (myrandom(3)>0) {
		switch(myrandom(5)) {
		    case 4: if(nethack5[c]!=' ') str[i]=nethack5[c];
		    case 3: if(nethack4[c]!=' ') str[i]=nethack4[c];
		    case 2: if(nethack3[c]!=' ') str[i]=nethack3[c]; break;
		    case 1: if(nethack2[c]!=' ') str[i]=nethack2[c]; break;
		    case 0: str[i]=nethack1[c]; break;
		    default: break;
		}
		}
	    }
	}
	printf("%c",str[i]);
    }
    
    printf(" ");
}

int main(int argc, char **argv)
{
    int i,c;
    struct timeval tv;
    FILE *f;
    char ch[1];

    srand((gettimeofday(&tv,NULL),tv.tv_usec));
    if (argc==1) {
	f=stdin;
	while(fread(ch,1,1,f)) {
	    for(c=0; c<strlen(normal); c++) {
	        if(normal[c]==ch[0]) {
		    switch(myrandom(5)) {
			case 4: if(nethack5[c]!=' ') ch[0]=nethack5[c];
	    	        case 3: if(nethack4[c]!=' ') ch[0]=nethack4[c];
			case 2: if(nethack3[c]!=' ') ch[0]=nethack3[c]; break;
			case 1: if(nethack2[c]!=' ') ch[0]=nethack2[c]; break;
			case 0: ch[0]=nethack1[c]; break;
			default: break;
		    }
		}
	    }
	    printf("%c",ch[0]);
	}
	fclose(f);
    } else {
	for(i=1; i<argc; i++) {
	    nethackify(argv[i]);
	}
	printf("\n");
    }
    
    return 0;
}

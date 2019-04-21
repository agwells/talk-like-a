/* Scramble the "inner" letters of each word in the input into a random order, and output the result. Non-word (that is, non-alphabetical) characters, and the first and last letters of each word, are left alone.
 * Output to something other than stdout will append to the file instead of overwriting it - this may be undesirable, and can be changed if so.
 */

/* Copyright 2009-07-11 Andrew J. Buehler.
 */

/*   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

#include <stdio.h>
#include <ctype.h> // for isalpha()
#include <stdlib.h> // for malloc()/calloc()/realloc()/free() and rand()/srand()
#include <string.h> // for strlen()
#include <time.h> // for time()

#define ALLOW_FILE_IO 0

long fakeRandSeed = 1;
long fakeRand() {
	fakeRandSeed = fakeRandSeed * 48271 % 0x7fffffff;
	return (fakeRandSeed);
}


/* strips 'reduction' characters from the end of the input string and returns the result
 * works only if strlen(string> >= reduction, which is the case in the only place it is presently called
 */
char *shorten_string(char *string, int reduction) {
  int i;
  
  i = strlen(string);
  
  for (; reduction > 0; reduction--, i--) {
    string[i-1] = '\0'; // would it work to use an 'i-reduction' approach instead, similar to what was later done in narrow_string()?
  }
  
  return string;
}

/* strips 'reduction' characters from the beginning and the end of the input string and returns the result
 * works only if(strlen(string) >= 2*reduction), which is the case in the only place it is presently called
 */
char *narrow_string(char *string, int reduction) {
  int i = reduction;
  
  while(string[i]) {
    string[i-reduction] = string[i];
    i++;
  }
  string[i-reduction] = '\0';
  
  return shorten_string(string, reduction);
}

int all_one_letter(char *string) {
  char c;
  int i;
  
  c = string[0];
  for(i = 1; string[i] != '\0'; i++) {
    if(c != string[i]) {
      return 0; // a nonduplicate letter has been found
    }
    c = string[i];
  }
  
  return 1; // reached the end of the string having found only duplicate letters, so it's all one letter
}

/* randomly reorders the contents of the string
 * WARNING: frees the input string and returns a replacement
 */
char *scramble_string(char *string) {
  char *ret, *tmpstr;
  int len, i, j;
  
  len = strlen(string);
  if(len < 2) return string; // can't scramble a 1-character string or an empty string!
  if(all_one_letter(string)) return(string); // can't scramble a string which consists entirely of one letter!
  
  ret = strdup(string);
  
  while(strcmp(string, ret) == 0) {
    j = 0;
    tmpstr = strdup(string);
    while(len > 0) {
      i = rand() % len;
      ret[j] = tmpstr[i];
      j++;
      while(tmpstr[i] != '\0') {
        tmpstr[i] = tmpstr[i+1];
        i++;
      }
      len--;
    }
    free(tmpstr);
    len = strlen(string);
  }
  
  
  free(string);
  return ret;
}

char *clear_string(char *string) {
  int i;
  
  i = strlen(string);
  
  for(; i >= 0 ; i--) {
    string[i] = '\0';
  }
  
  return string;
}

int main(int argc, char **argv) {
  int word_length;
  char c, tempchar, *word, *rword;
  FILE *infile, *outfile;
  
#if ALLOW_FILE_IO
 /* open files, if any other than stdin and stdout */
  if(argc > 1) {
    if(!strcmp(argv[1], "--help") ||
       !strcmp(argv[1], "-h")) {
      printf("Usage: %s [INPUT_FILENAME] [OUTPUT_FILENAME]\n", argv[0]);
      printf("If INPUT_FILENAME is omitted or is '-', read from standard input\nIf OUTPUT_FILENAME is omitted or is '-', print to standard output\n");
      return 0;
    }
    
    if(strcmp(argv[1], "-")) {
      infile = fopen(argv[1], "r");
      if(infile == NULL) {
        fprintf(stderr, "Unable to open input file %s for reading\n", argv[1]);
        return 1;
      }
    } else {
      infile = stdin;
    }
    
    if(argc > 2) {
      if(strcmp(argv[2], "-")) {
        outfile = fopen(argv[2], "a");
        if(outfile == NULL) {
          fprintf(stderr, "Unable to open output file %s for writing\n", argv[2]);
          return 2;
        }
      } else {
        outfile = stdout;
      }
    }
  } else { // no arguments specified
    infile = stdin;
    outfile = stdout;
  }
#else
  infile = stdin;
  outfile = stdout;
#endif

  srand(time(NULL)); // needed for scramble_string() to actually be random
  
  word_length = 0;
  word = malloc(sizeof(char));
  word[0] = '\0';
  c = fgetc(infile);
  
  if(feof(infile)) {
    fprintf(stderr, "Reached EOF while reading the first character of the input file!\n");
    free(word);
    return 4;
  }
  
  while(!feof(infile)) {
    if(isalpha(c)) {
      rword = realloc(word, word_length+2); // one for the new character, one for the null
      if(rword == NULL){
        free(word);
        fprintf(stderr, "Unable to allocate memory\n");
        return 5;
      }
      word = rword;
      word[word_length] = c;
      word[word_length + 1] = '\0'; // duplicate addition with the next line, but possibly more readable
      word_length++;
    } else {
      if(word_length) {
        word_length--;
        fputc(word[0], outfile);
        if(word_length) {
          tempchar = word[word_length];
          word = scramble_string(narrow_string(word, 1));
          fprintf(outfile, "%s", word);
          fputc(tempchar, outfile);
        }
        word = clear_string(word);
        word_length = 0;
      }
      fputc(c, outfile);
    }
    fflush(outfile);
    c = fgetc(infile);
  }
  
  free(word);
  return 0;
}

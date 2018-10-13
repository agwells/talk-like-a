/*
 *	Lex filter to transform plain English into Cockney English.
 *	No racial or societal slurs are intended.  For amusement only.
 *
 *	Copyright 1986 by Daniel Klein.
 *
 *	Reproduction permitted so long as this notice is retained.
 */

// BW [ \t\n] // Begin word
// SP [ \t]+  // Space
// EW [ \t.,;!\?$] // End word

/**
 *
 *
 * @param {string} initialString
 * @return {string}
 */
function cockney(initialString) {
  /**
   * Adds a random "Didn't I?", if we're at the end of a sentence.
   *
   * @param {string} phrase The bit that comes before
   * @param {string} period The next character (which may be a period)
   */
  function eos(phrase, period) {
    if (period === ".") {
      return phrase + dintI();
    } else {
      return phrase + period;
    }
  }

  //   function plastc() {
  //     //unput(yytext[yyleng - 1]);
  //   }

  /**
   * Replaces one word with another, making sure their first letters have the
   * same case.
   *
   * @param {string} original
   * @param {string} replacement
   * @returns {string}
   */
  function caseify(original, replacement) {
    if (original.charAt(0).toUpperCase() === original.charAt(0)) {
      return replacement.charAt(0).toUpperCase + replacement.slice(1);
    } else {
      return replacement.charAt(0).toLowerCase + replacement.slice(1);
    }
  }

  function I() {
    if (Math.random() < 0.2) return "Oy";
    else return "I";
  }

  let b_count = 0;
  let b_which = 0;
  function bloody() {
    b_count = b_count + 1;
    if (b_count % 2 === 0) {
      b_which = b_which + 1;
      switch (b_which % 4) {
        case 0:
          return " bloody";
        case 1:
          return " flinkin'";
        case 2:
          return " bleedin'";
        case 3:
          return " soddin'";
      }
    }
    return "";
  }

  let did = 0;

  function set_did(val) {
    did = val;
  }

  function clear_did() {
    did = 0;
  }

  function dintI() {
    try {
      if (did == 1 && Math.random() < 0.5) return ", didn'I?";
      else if (did == 2 && Math.random() < 0.5) return ", din't we?";
      else return ".";
    } finally {
      clear_did();
    }
  }

  function pooped() {
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        return "knackered";
      case 1:
        return "shagged out";
      default:
        return "done in";
    }
  }
  // void expletive()
  // {
  // /*
  // Blimey
  // Stright a light
  // 'Strewth
  // Cor blimey
  // */
  // }

  // {BW}[Tt]he{EW}		{	ECHO; bloody(); }
  return (
    initialString
      .replace(/\b[Tt]he\b/g, match => `${match}${bloody()}`)
      // {BW}[Ss]teal{EW}	{	printf("%c%cick",yytext[0],yytext[1]-5); eos();
      .replace(/\bSteal\b(.?)/g, (match, p1) => eos("Nick", p1))
      .replace(/\bsteal\b(.?)/g, (match, p1) => eos("nick", p1))
      // {BW}[Ss]tole{EW}	{	printf("%c%cicked",yytext[0],yytext[1]-5);
      // 				eos();
      .replace(/\bStole\b(.?)/g, (match, p1) => eos("Nicked", p1))
      .replace(/\bstole\b(.?)/g, (match, p1) => eos("nicked", p1))
      // {BW}tired			pooped();
      .replace(/\btired\b/g, () => pooped())
      // {BW}were{EW}		|
      // {BW}was{EW}		{	printf("%cwuz",yytext[0]); eos(); }
      .replace(/\b(?:were|was)\b(.?)/g, (match, p1) => eos("wuz", p1))
      // [Hh]ello			printf("'%cllo", caseify('u'));
      .replace(/([Hh])ello/g, "'$1llo")
      // {BW}[Hh]			printf("%c'",yytext[0]);
      .replace(/Hh/g, "'")
      // {BW}[Yy]our{EW}		{	printf("%.2ser",yytext); eos(); }
      .replace(/\b[Yy]our\b(.?)/g, (match, p1) =>
        eos(`${match.charAt(0)}ser`, p1)
      )
      // {BW}it{EW}		{	printf("%.2s'",yytext); eos(); }
      .replace(/\bit\b(.?)/g, (match, p1) => eos("i'", p1))
      // {BW}go{EW}		{	printf("%.2sow",yytext); eos(); }
      .replace(/\bgo\b(.?)/g, (match, p1) => eos("gow", p1))
      // {BW}and{EW}		{	printf("%c'n'",yytext[0]); eos(); }
      .replace(/\band\b(.?)/g, (match, p1) => eos("n", p1))
      // {BW}my{EW}		{	printf("%.2se",yytext); eos(); }
      .replace(/\bmy\b(.?)/g, (match, p1) => eos("me", p1))
      // {BW}th(is|at){EW}	{	printf("%.5s", yytext); eos(); }
      .replace(/\bthis\b(.?)/g, (match, p1) => eos("{{}}", p1))
      .replace(/\bthat\b(.?)/g, (match, p1) => eos("}}{{", p1))
      // {BW}[Ww]e{SP}went{EW}	|
      // {BW}[Ww]e{SP}had{EW}	|
      // {BW}[Ww]e{SP}did{EW}	{	printf("%.*s",yyleng-1,yytext);
      // 				set_did(2);
      // 				eos();
      // 			}
      .replace(/\b[Ww]e\s(?:went|had|did)(.?)\b/g, (match, p1) => {
        set_did(2);
        return eos(match, p1);
      })
      // {BW}I{SP}went{EW}	|
      // {BW}I{SP}had{EW}	|
      // {BW}I{SP}did{EW}	{	I();
      // 				printf(" did");
      // 				set_did(1);
      // 				eos();
      // 			}
      .replace(/\bI\s(?:went|had|did)(.?)\b/g, (match, p1) => {
        set_did(1);
        return eos(I() + " did", p1);
      })
      // {BW}I{EW}		{	I(); eos(); }
      .replace(/\bI\b(.?)/g, (match, p1) => eos(I(), p1))
      // [Yy]ou{SP}[^aeiouy]	{	printf("%c'", yytext[0]); plastc(); }
      .replace(/([Yy])ou\s(?=[^aeiouy])/g, "$1'")
      // [Ww]hat{SP}are{EW}	{	printf("%cotta", yytext[0]); eos(); }
      .replace(/([Ww])hat\sare\b(.?)/g, (match, p1, p2) => eos(p1 + "otta", p2))
      // {BW}other		|
      // [MmNnRr]other			printf("%cuvver",yytext[0]);
      .replace(/(\b|[MmNnRr])other/g, "$1uvver")
      // [MmSs]outh			printf("%cowf", yytext[0]);
      .replace(/([MmSs])outh/g, "$1owf")
      // [cYy]outh			printf("%coof", yytext[0]);
      .replace(/([cYy])outh/, "$1oof")
      // [^o]uth				printf("%.2sf",yytext);
      .replace(/([^o]u)th/g, "$1f")
      // {BW}th[^e]		|
      // [AaEeIiOo]th[^em]	{	printf("%cf",yytext[0]); plastc(); }
      .replace(/\bth(?=[^e])/g, "f")
      .replace(/([AaEeIiOo])th(?=[^em])/g, "$1f")
      // oothe			|
      // e[ei]the		{	printf("%c%cve", yytext[0], yytext[0]); }
      .replace(/oothe/g, "oove")
      .replace(/e[ei]the/g, "eeve")
      // ooth			|
      // eeth			{	printf("%c%cf", yytext[0], yytext[0]); }
      .replace(/(oo|ee)th/g, "$1f")
      // [aei]the		{	printf("%cvv",yytext[0]); plastc(); }
      .replace(/([aei])the/g, "$1vve")
      // th				putchar('v');
      .replace(/th/g, "v")
      // a[km]e{EW}		{	printf("i%ce",yytext[1]); eos(); }
      .replace(/a([km])e\b(.?)/g, (match, p1, p2) => eos(`i${p1}e`, p2))
      // [^r][Oo]ld			printf("%.2swld",yytext);
      .replace(/([^r][Oo])ld/g, "$1wld")
      // [^AaEeIiOoUu][uo]nd[a-z] 	printf("%cunn%c",yytext[0],yytext[yyleng-1]);
      .replace(/([^AaEeIiOoUu])[uo]nd(?=[a-z])/g, "$1unn")
      // ing{EW}			{	printf("in'"); eos(); }
      // [^dg]get+[^h]			printf("%cge'%c",yytext[0],yytext[yyleng-1]);
      // ail				printf("aiw");
      // any				printf("enny");
      // [rSs]ay{EW}		{	printf("%cigh",yytext[0]); eos(); }
      // way				printf("why");
      // [BbHh]it{EW}		{	printf("%ci'",yytext[0]); eos(); }
      // ait{EW}			{	printf("ite"); eos(); }
      // ime{EW}			{	printf("oime"); eos(); }
      // [^e]ize[^n]			printf("%coize%c",yytext[0],yytext[yyleng-1]);
      // [^e]ight			printf("%coit",*yytext);
      // [a-z]"?"		{	*(yytext+1) = ',';
      // 				printf("%s roit?",yytext);
      // 				clear_did();
      // 			}
      // [a-z]"."		{	printf("%c", yytext[0]); dintI(); }
      // \n				printf("\n");
      // %%

      .replace(/\{\{\}\}/g, "this")
      .replace(/\}\}\{\{/g, "that")
  );
}

module.exports = { default: cockney };

%{
#define yywrap() 1
%}

T	[" .!?,"]*

%%

"ass"			printf("[BUTTOCKS]");
"ASS"			printf("[BUTTOCKS]");
"Ass"			printf("[BUTTOCKS]");
"Damn"			printf("[CURSE]");
"damn"			printf("[CURSE]");
"DAMN"			printf("[CURSE]");
"fuck"			printf("[FORNICATE]");
"Fuck"			printf("[FORNICATE]");
"FUCK"			printf("[FORNICATE]");
"shit"			printf("[EXCREMENT]");
"Shit"			printf("[EXCREMENT]");
"SHIT"			printf("[EXCREMENT]");
"bitch"			printf("[FEMALE DOG]");
"Bitch"			printf("[FEMALE DOG]");
"BITCH"			printf("[FEMALE DOG]");
"pecker"		printf("[PHALLUS]");
"Pecker"		printf("[PHALLUS]");
"PECKER"		printf("[PHALLUS]");
"nipple"		printf("[MAMMARY OUTLET]");
"Nipple"		printf("[MAMMARY OUTLET]");
"NIPPLE"		printf("[MAMMARY OUTLET]");
"breast"		printf("[BUSOM]");
"Breash"		printf("[BUSOM]");
"BREAST"		printf("[BUSOM]");
"fucking"		printf("[FORNICATING]");
"Fucking"		printf("[FORNICATING]");
"FUCKING"		printf("[FORNICATING]");
"fucked"		printf("[FORNICATED]");
"Fucked"		printf("[FORNICATED]");
"FUCKED"		printf("[FORNICATED]");
"damned"		printf("[CURSED]");
"Damned"		printf("[CURSED]");
"DAMNED"		printf("[CURSED]");
"damning"		printf("[CURSING]");
"Damning"		printf("[CURSING]");
"DAMNING"		printf("[CURSING]");
"piss"			printf("[URINATE]");
"Piss"			printf("[URINATE]");
"PISS"			printf("[URINATE]");
"asshole"		printf("[DONKEY BUTTOCKS]");
"Asshole"		printf("[DONKEY BUTTOCKS]");
"ASSHOLE"		printf("[DONKEY BUTTOCKS]");
"prick"			printf("[PHALLUS]");
"Prick"			printf("[PHALLUS]");
"PRICK"			printf("[PHALLUS]");
"cock"			printf("[PHALLUS]");
"Cock"			printf("[PHALLUS]");
"COCK"			printf("[PHALLUS]");
"pussy"			printf("[VAGINA]");
"Pussy"			printf("[VAGINA]");
"PUSSY"			printf("[VAGINA]");
"twat"			printf("[VAGINA]");
"Twat"			printf("[VAGINA]");
"TWAT"			printf("[VAGINA]");
"cunt"			printf("[VAGINA]");
"Cunt"			printf("[VAGINA]");
"CUNT"			printf("[VAGINA]");
"dick"			printf("[RICHARD]");
"Dick"			printf("[RICHARD]");
"DICK"			printf("[RICHARD]");
"cum"			printf("[EJACULATE]");
"Cum"			printf("[EJACULATE]");
"CUM"			printf("[EJACULATE]");
"jack off"		printf("[MASTERBATE]");
"Jack Off"		printf("[MASTERBATE]");
"JACK OFF"		printf("[MASTERBATE]");
"wet dream"		printf("[NOCTURNAL EMISSION]");
"Wet Dream"		printf("[NOCTURNAL EMISSION]");
"WET DREAM"		printf("[NOCTURNAL EMISSION]");
"jerk off"		printf("[MASTERBATE]");
"Jerk Off"		printf("[MASTERBATE]");
"JERK OFF"		printf("[MASTERBATE]");
"bastard"		printf("[ILLEGITIMATE CHILD]");
"Bastard"		printf("[ILLEGITIMATE CHILD]");
"BASTARD"		printf("[ILLEGITIMATE CHILD]");
"slut"			printf("[WANTON WOMAN]");
"Slut"			printf("[WANTON WOMAN]");
"SLUT"			printf("[WANTON WOMAN]");
"whore"			printf("[PROSTITUTE]");
"Whore"			printf("[PROSTITUTE]");
"WHORE"			printf("[PROSTITUTE]");
"suck"			printf("[INHALE]");
"Suck"			printf("[INHALE]");
"SUCK"			printf("[INHALE]");
"blow"			printf("[EXHALE]");
"Blow"			printf("[EXHALE]");
"BLOW"			printf("[EXHALE]");
.			ECHO;
%%

main()
{
	srand(getpid());
	yylex();
}

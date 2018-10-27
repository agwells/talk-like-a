#!/usr/bin/perl -p
# B1FF filter.
# Copyright 1999 by Joey Hess under the terms of the GNU GPL.

# I use an array, not a hash. because order is important.
@trans_table=(
	'\bEVERYONE\b' => 'EVRY 1',
	'\bEVERYBODY\b' => 'EVRY BUDY',
	'\bEVERY\b' => 'EVRY',
	'\bONE\b' => '1',
	'\bAND\b' => '+',
	'\bYOU' => 'U',
	'\bITS\b' => 'IT"S',
	'\bIT\'S\b' => 'ITS',
	'\bIS\b' => 'IZ',
	'\bLINUX\b' => 'LINUS',
	'\bUNIX\b' => 'THE MANEFRA1M O/S',
	'\bWINDOWS\b' => 'WINDOWZ (IT RULEZ MAN!)',
	'\bYOU\'RE\b' => 'YOUR',
	'\bTHEM\b' => 'THUM',
	'\bHERE\b' => 'HERE',
	'\bTHEY\'RE\b' => 'THE1R',
	'\bTHEIR\b' => 'THERE',
	'\bWAS\b' => 'WUZ',
	'\bMACINTOSH\b' => 'IMAC', # too 90's?
	'\bVERY\b' => 'TOTALLY',
	'\bCOMPUTER\b' => 'VIC-20',
	'\bWHETHER\b' => 'WHETHUR',
	'\b(?:H|CR)ACKER\b' => 'KEWL HACKER D00D!',
	'\bOF\b' => 'UV',
	'\bGNU\b' => 'NEW',
	'\bQUITE\b' => 'REAL',
	'\bFREE\b' => 'FREE!',

	'HOME' => 'HUM',
	'COME' => 'CUM',
	'MICRO' => 'MIKRO',
	'GOVERN' => 'GUVERN',
	'PERSON' => 'D00D',
	'SOME' => 'SUM',
	'WRITE' => 'RITE',
	'REAL' => 'REEL',
	'LITE' => 'L1TE',
	'BIAN' => 'B1AN',
	'TION' => 'SHUN',
	'FOR' => '4',
	'TO' => '2',
	'ATE' => '8',
	'\b2TALLY\b' => 'TOTALY', # fix from line above
	'LL' => 'L',
	'OO' => '00',
	'MATE' => 'M8',
	'ER' => 'UR',
	'S+\b' => 'Z',
	'KN' => 'N',
	'IE' => 'EI',
);

$_=uc;
s/;/,/g;
s/'//g;

while (@trans_table) {
	$key=shift @trans_table;
	$value=shift @trans_table;
	s/$key/$value/g;
}

s/(\!+)/$1.make_exclimation()/eg;
s/(\?+)/$1.make_question()/eg;
s/I/rand 3 > 2 ? '1' : 'I'/eg; # change 1/3 of I's to 1's

@punct=('.','!',',');

s/\.  /. /g;
s/\./$punct[int(rand 3)]/eg;
s/\,/./g;


# b1ff can't hold down on shift too well!!!!!!!1!
sub make_exclimation {
	my $length=shift || int(rand 5);
	my $ret='!';
	my $last=0;
	for (1..$length) {
		if (! $last && int(rand 3) eq 2) {
			$ret.="1";
			$last=1;
		}
		else {
			$ret.="!";
			$last=0;
		}
	}
	return $ret;
}

# ask questions excitedly?!?!?!?!
sub make_question {
	my $length=shift || int(rand 5) + 1;
	my $ret='';
	my $last=0;
	while (length($ret) < $length) {
		if (! $last && int(rand 5) > 2) {
			$ret.="?!";
			$last=1;
		}
		elsif (! $last && int(rand 5) > 3) {
			$ret.="?1";
			$last=1;
		}
		else {
			$ret.="?";
			$last=0;
		}
	}
	return $ret;
}

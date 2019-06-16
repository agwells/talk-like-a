# talk-like-a

Transform normal English text in various funny ways.
([Demo](https://agwells.github.io/talk-like-a/))

## Table of Contents

- [Installation](#installation)
- [Credits](#credits)
- [Development](#development)
- [API](#api)
  - [`b1ff`](#b1ff)
  - [`censor`](#censor)
  - [`chef`](#chef)
  - [`cockney`](#cockney)
  - [`eleet`](#eleet)
  - [`fudd`](#fudd)
  - [`jethro`](#jethro)
  - [`jibberish`](#jibberish)
  - [`ken`](#ken)
  - [`kenny`](#kenny)
  - [`klaus`](#klaus)
  - [`ky00te`](#ky00te)
  - [`LOLCAT`](#lolcat)
  - [`nethackify`](#nethackify)
  - [`newspeak`](#newspeak)
  - [`nyc`](#nyc)
  - [`pirate`](#pirate)
  - [`rasterman`](#rasterman)
  - [`scottish`](#scottish)
  - [`scramble`](#scramble)
  - [`spammer`](#spammer)
  - [`studly`](#studly)
  - [`uniencode`](#uniencode)
  - [`upsidedown`](#upsidedown)

# Installation

```sh
npm install talk-like-a
```

# API

This package exports a number of functions, each of which take a single string
as their input, and return a transformed version of the same string as their
output. All of these functions are deterministic; for the same input they will
always produce the same output.

### b1ff()

Talk like a [Usenet newbie](https://en.wikipedia.org/wiki/BIFF).

```js
const { b1ff } = require('talk-like-a');
console.log(b1ff('Hello! How are you today?'));
// HELO!!! HOW ARE U 2DAY???!
```

### censor()

CENSORED like a CENSORED.

```js
const { censor } = require('talk-like-a');
console.log(censor(dirtyTalk));
// Hello, CENSOREDhead! How the CENSORED are you today?
```

### chef()

Talk like the Swedish Chef.

```js
const { chef } = require('talk-like-a');
console.log(chef('Hello! How are you today?'));
// Hellu! Hoo ere-a yuoo tudey?
// Bork Bork Bork!
```

### cockney()

Talk in a bad Cockney accent.

```js
const { cockney } = require('talk-like-a');
console.log(cockney('Hello! How are you today?'));
// 'Ullo! 'ow are y'today, roit?'
```

### eleet()

Talk like a k3wl hacker.

```js
const { eleet } = require('talk-like-a');
console.log(eleet('Hello! How are you today?'));
// H3ll0! H0w 4r3 y0u t0d4y?
```

### fudd()

Talk like Elmer Fudd.

```js
const { fudd } = require('talk-like-a');
console.log(fudd('Hello! How are you today?'));
// Hewwo! How awe you today?
```

### jethro()

Talk in a bad hillbilly accent.

```js
const { jethro } = require('talk-like-a');
console.log(jethro('Hello! How are you today?'));
// Howdy. Ye DAWGies!!! How is y'all today?
```

### jibberish()

Runs text through a random selection of the rest of the filters, to make really
weird output.

```js
const { jibberish } = require('talk-like-a');
console.log(jibberish('Hello! How are you today?'));
// %%%faanj ''hap  ooja ^oo, iiin7!, :w >|)aqpaaj ooj ooj f7oosaj aaz z! Struth! oo7aq
// i>|joq >|joq >|joq
// `joojjjoo e-oraaf  e aaz zaayf
// ---`e-ajnwaj pjn^ aaz f)afqoos aaz u, cor blimey! fn + '7daj z7aaor e-asaaz wnjj qaaaj)sqooswuoo2\n\n
```

### ken()

Talk in a bad Cockney accent, featuring (dubious) rhyming
slang for a lot of computer terminology.

```js
const { ken } = require('talk-like-a');
console.log(ken('Hello! How are you today?'));
// Hello! Struth! How are yer today?
```

### kenny()

Talk like Kenny on South Park.

```js
const { kenny } = require('talk-like-a');
console.log(kenny('Hello! How are you today?'));
// Mfpmpppmfpmfppf! Mfpppffpp mmmpffmpp ffmppffmf fmpppfmpmmmmffm?
```

### klaus()

Talk in a bad German accent.

```js
const { klaus } = require('talk-like-a');
console.log(klaus('What are you up to today? I have nothing going on.'));
// Vhat are you up to today? I hafe nodingkt goingkt on.
```

### ky00te()

Talk like an obnoxious catperson.

```js
const { ky00te } = require('talk-like-a');
console.log(ky00te('What are you up to today? I have nothing going on.'));
// Whattarre ya up ta today? Y have na'hyng goyng on.
```

### LOLCAT()

Talk like a mid-2000s image macro.

```js
const { LOLCAT } = require('talk-like-a');
console.log(LOLCAT('Hello! How are you today?'));
// WHAT ARE YOU UP 2 TODAI? I HAS NOTHIN GOIN ON.
```

### nethackify()

Talk like a wiped out text in nethack.

```js
const { nethackify } = require('talk-like-a');
console.log(nethackify('Hello! How are you today?'));
// Hello! Hcw  ?e ycu tocay?'
```

### newspeak()

Talk like it's 1984.

```js
const { newspeak } = require('talk-like-a');
console.log(
  newspeak("Hello sir! It isn't sunny today. It's rather dark outside.")
);
// Hello citizen! It is unsunny today? It's plusunlight outside.
// Hail Big Brother!
```

### nyc()

Talk in a bad New York accent.

```js
const { nyc } = require('talk-like-a');
console.log(nyc('Hello! How are you today?'));
// Hello! Okay? Howahrya today, or what?
```

### pirate()

Talk like a pirate.

```js
const { pirate } = require('talk-like-a');
console.log(pirate('What are you up to today? I have nothing going on.'));
// What be ye up t' today? I have nothin' goin' on, avast.
```

### rasterman()

Talk like a busy open-source software developer.

```js
const { rasterman } = require('talk-like-a');
console.log(rasterman('Hello! How are you today?'));
// hello! how aer u today?
```

### scottish()

Talk in a bad Scottish accent.

```js
const { scottish } = require('talk-like-a');
console.log(scottish('What are you up to today? I have nothing going on.'));
// What be ye up ta today? I haf nuthin' goin' on.
```

### scramble()

Scramble the "inner" letters of each word in the input into a random order.
The resulting text is still strangely readable.

```js
const { scramble } = require('talk-like-a');
console.log(scramble('What are you up to today? I have nothing going on.'));
// Waht are you up to toady? I hvae nonihtg gonig on
```

### spammer()

Talk like a spambot!

```js
const { spammer } = require('talk-like-a');
console.log(spammer('Hello! How are you today?'));
// BELOW IS THE RESULT OF YOUR FEEDBACK FORM: HELLO! HOW ARE YOU TODAY?
// This is a 1 time offer.
// ---
// To unsubscribe from these mails reply and put in the subject the word REMOVE.
//
//
```

### studly()

Studly caps.

```js
const { studly } = require('talk-like-a');
console.log(studly('What are you up to today? I have nothing going on.'));
// WhAt aRe yOu uP to todAy? i haVe nOthiNg gOing on.
```

### uniencode()

Replace ASCII with nearly-identical Unicode characters.

```js
const { uniencode } = require('talk-like-a');
console.log(uniencode('Hello! How are you today?'));
// Неⅼⅼօ! Нօw аrе уօυ tօⅾау?
```

### upsidedown()

Flips text upside down (using only ASCII characters, so you kind of have to
squint to see it).

```js
const { upsidedown } = require('talk-like-a');
console.log(upsidedown('Hello! How are you today?'));
// %hepof noh aje moy io77ay
```

# Credits

This is a JavaScript port of the
[debian `filters` package](https://packages.debian.org/jessie/games/filters),
which is a collection of command-line jokey text transformation scripts. For
example, the "pirate" command transforms text to sound like a pirate, and the
"eleet" command transforms text so that it looks like it was written
in classic 90s 1337-speak.

The text transformation algorithms used here are based on code cloned from
this Git repo: `git://git.joeyh.name/filters`

The filters were written by several different authors, and collected by
[Joey Hess](http://joeyh.name/code/filters/) (who also wrote several of them!).
See the `/originals` directory for copyright and license information on each of
them.

# Development

The initial aim of this project was to exactly replicate the behavior of each
of the original CLI tools, in JavaScript. This turned out to not be exactly
possible, because many of the original tools used random number generators
which would be difficult to replicate in JS.

So, for testing purposes, I wound up writing modified versions of most of the
original scripts, replacing the random number generation with a simpler
pseudo-random number generator easily replicable in multiple programming
languages. I also cleaned up some bugs and made other changes to make their
behavior more reproducible.

The code for the modified versions of the debian CLI scripts, is in the Git
repo's `/original` directory. These have been used to generate sample texts,
which are stored in the `/tests` directory and can be used to test whether the
JS scripts produce identical output by running `npm run test:original`. To
update the generated sample texts, you will need to compile the CLI scripts
from source code. Running `npm run compile-and-make-test-data` will accomplish
this, but you will first have to install various CLI dependencies. See
`original/README` for more information.

Running `npm run test` will run a different set of tests that use Jest snapshots.

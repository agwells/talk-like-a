const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

/**
 * This script runs our test corpus through each of the filters from the
 * "filters" debian package, to generate expected results for our ported
 * versions.
 *
 * Note: This of course requires having the "filters" package installed.
 *
 * TODO: Some of the filters (which I've commented out) give randomized output,
 * which makes them unsuitable for use in unit tests. If I want to port those,
 * I have to tweak the "original" to use a RNG that I can replicate in JS.
 */
const filters = [
  'b1ff',
  'censor',
  'chef',
  'cockney',
  'eleet',
  'fanboy',
  'fudd',
  'jethro',
  // "jibberish",
  'ken',
  'kenny',
  'kraut',
  'ky00te',
  'LOLCAT',
  'nethackify',
  'newspeak',
  'nyc',
  'pirate',
  'rasterman',
  'scottish',
  //  "scramble",
  'spammer',
  'studly',
  'uniencode',
  'upside_down',
];

const sampleText = fs.readFileSync(
  path.join(__dirname, 'moby-dick-chapter-1.txt'),
  { encoding: 'utf8', flag: 'r' },
);

Promise.all(
  filters.map(async function(filterName) {
    let filterCommand = `./original/${filterName}`;
    console.log(`${filterName}...`);
    const result1 = child_process.execSync(filterCommand, {
      input: sampleText,
    });
    // await new Promise(function(resolve) {
    //   setTimeout(resolve, 2000);
    // });
    const result2 = child_process.execSync(filterCommand, {
      input: sampleText,
    });
    if (result1.toString('utf8') !== result2.toString('utf8')) {
      console.log(`WARNING: Filter '${filterName}' is non-deterministic. :(`);
    } else {
      fs.writeFileSync(
        path.join(__dirname, `moby-dick-chapter-1.${filterName}.txt`),
        result1,
        { encoding: 'utf8' },
      );
    }
    console.log(`... ${filterName}`);
  }),
);

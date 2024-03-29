import fs from 'fs';
import path from 'path';
import child_process from 'child_process';

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
  'jibberish',
  'ken',
  'kenny',
  'klaus',
  'ky00te',
  'LOLCAT',
  'nethackify',
  'newspeak',
  'nyc',
  'pirate',
  'rasterman',
  'scottish',
  'scramble',
  'spammer',
  'studly',
  'uniencode',
  'upsidedown',
];

const sampleTextFiles = ['moby-dick-chapter-1.txt', 'manpage.txt'];

sampleTextFiles.forEach((filename) => {
  const sampleText = fs.readFileSync(
    path.join(__dirname, 'test-fixtures', filename),
    {
      encoding: 'utf8',
      flag: 'r',
    }
  );
  console.log(filename);
  Promise.all(
    filters.map(async function (filterName) {
      let filterCommand = `./original/${filterName}`;
      console.log(`  ${filterName}...`);
      const result1 = child_process.execSync(filterCommand, {
        input: sampleText,
      });
      // });
      const result2 = child_process.execSync(filterCommand, {
        input: sampleText,
      });
      if (result1.toString('utf8') !== result2.toString('utf8')) {
        console.log(
          `  WARNING: Filter '${filterName}' is non-deterministic. :(`
        );
      } else {
        fs.writeFileSync(
          path.join(
            __dirname,
            'test-fixtures',
            `${filename}.${filterName}.txt`
          ),
          result1,
          { encoding: 'utf8' }
        );
      }
      console.log(`  ... ${filterName}`);
    })
  );
});

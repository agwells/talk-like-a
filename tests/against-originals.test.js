const fs = require('fs');
const path = require('path');

/**
 * Test if the output of the JS filters is identical to the output of the
 * original programs.
 */
const sampleTexts = ['moby-dick-chapter-1.txt', 'manpage.txt'];
const filters = [
  'b1ff',
  'censor',
  'chef',
  'cockney',
  'eleet',
  'fudd',
  'jethro',
  'ken',
  'kenny',
  'ky00te', // currently failing
  'klaus',
  'LOLCAT',
  'nethackify',
  'newspeak',
  'nyc',
  'pirate',
  'rasterman', // currently failing
  'scottish',
  'scramble',
  'spammer',
  'studly',
  'uniencode',
  'upside_down',
];

describe.each(filters)('%s', (filterName) => {
  test.each(sampleTexts)('%s', (filename) => {
    const originalText = fs.readFileSync(path.join(__dirname, filename), {
      encoding: 'UTF8',
    });
    const expectedTransform = fs.readFileSync(
      path.join(__dirname, `${filename}.${filterName}.txt`),
      {
        encoding: 'UTF8',
      }
    );
    const filterFn = require(`../src/${filterName}`);
    const transformedText = filterFn(originalText);

    expect(transformedText.split(/\s/)).toEqual(expectedTransform.split(/\s/));
  });
});

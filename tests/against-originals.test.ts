import fs from 'fs';
import path from 'path';

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
  //  'jethro', // currently failing
  'ken',
  'kenny',
  //  'ky00te', // currently failing
  'klaus',
  'LOLCAT',
  //  'nethackify', // currently failing
  'newspeak',
  'nyc',
  'pirate',
  //  'rasterman', // currently failing
  'scottish',
  'scramble',
  'spammer',
  'studly',
  'uniencode',
  'upsidedown',
];

describe.each(filters)('%s', (filterName) => {
  test.each(sampleTexts)('%s', (filename) => {
    const originalText = fs.readFileSync(
      path.join(__dirname, 'test-fixtures', filename),
      {
        encoding: 'utf8',
      }
    );
    const expectedTransform = fs.readFileSync(
      path.join(__dirname, 'test-fixtures', `${filename}.${filterName}.txt`),
      {
        encoding: 'utf8',
      }
    );
    const filterFn = require(`../src/${filterName}`);
    const transformedText = filterFn[filterName](originalText);

    expect(transformedText.split(/\s/)).toEqual(expectedTransform.split(/\s/));
  });
});

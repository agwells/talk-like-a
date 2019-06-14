const fs = require('fs');
const path = require('path');

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
  'ky00te',
  'kraut',
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
  'upside_down',
];

describe.each(filters)('%s', (filterName) => {
  test.each(sampleTexts)('%s', (filename) => {
    const originalText = fs.readFileSync(path.join(__dirname, filename), {
      encoding: 'UTF8',
    });
    const filterFn = require(`../src/${filterName}`);
    const transformedText = filterFn(originalText);

    expect(transformedText.split(/\s/)).toMatchSnapshot();
  });
});

const fs = require('fs');
const path = require('path');

const sampleTexts = ['moby-dick-chapter-1.txt', 'manpage.txt'];
const filters = [
  'b1ff',
  'censor',
  'chef',
  'cockney',
  'eleet',
  //  'fanboy',
  'fudd',
  'jethro',
  //  'jibberish',
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

sampleTexts.forEach((filename) =>
  describe(filename, () => {
    let originalText = '';
    beforeAll(() => {
      originalText = fs
        .readFileSync(path.join(__dirname, filename), {
          encoding: 'UTF8',
        })
        .toString();
    });

    filters.forEach((filterName) =>
      test(filterName, () => {
        const expectedTransform = fs
          .readFileSync(path.join(__dirname, `${filename}.${filterName}.txt`), {
            encoding: 'UTF8',
          })
          .toString();
        filterName;
        const filterFn = require(`../src/${filterName}`);

        expect(filterFn(originalText).split(' ')).toEqual(
          expectedTransform.split(' ')
        );
      })
    );
  })
);

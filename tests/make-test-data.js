const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

/**
 * This script runs our test corpus through each of the filters from the
 * "filters" debian package, to generate expected results for our ported
 * versions.
 *
 * Note: This of course requires having the "filters" package installed.
 *
 * TODO: Some of the filters (which I've commented out) are non-idempotent.
 * So I'll need to figure out what to do with them later. (Possibly compile
 * my own build that uses a specific randomization seed?)
 */
const filters = [
  //  "b1ff",
  "censor",
  "chef",
  "./cockney",
  "./eleet",
  "fanboy",
  "./fudd",
  "jethro",
  // "jibberish",
  "jive",
  "ken",
  "kenny",
  "kraut",
  "LOLCAT",
  "newspeak",
  "nyc",
  // "pirate",
  // "rasterman",
  "scottish",
  //  "scramble",
  "studly",
  // "uniencode",
  "upside-down"
];

const sampleText = fs.readFileSync(
  path.join(__dirname, "moby-dick-chapter-1.txt"),
  { encoding: "UTF8", flag: "r" }
);

Promise.all(
  filters.map(async function(filterCommand) {
    let filterName = filterCommand;
    if (filterCommand.startsWith("./")) {
      filterName = filterName.substr(2);
    }
    console.log(`${filterName}...`);
    const result1 = child_process
      .execSync(filterCommand, {
        input: sampleText
      })
      .toString();
    await new Promise(function(resolve) {
      setTimeout(resolve, 2000);
    });
    const result2 = child_process
      .execSync(filterCommand, {
        input: sampleText
      })
      .toString();
    if (result1 !== result2) {
      console.log(`WARNING: Filter '${filterName}' is non-idempotent. :(`);
    } else {
      fs.writeFileSync(
        path.join(__dirname, `moby-dick-chapter-1.${filterName}.txt`),
        result1
      );
    }
    console.log(`... ${filterName}`);
  })
);

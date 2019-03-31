const fs = require("fs");
const path = require("path");

const originalText = fs
  .readFileSync(path.join(__dirname, "moby-dick-chapter-1.txt"), {
    encoding: "UTF8"
  })
  .toString();

const filters = [
  "b1ff",
  "chef",
  "cockney",
  "eleet",
  "fudd",
  "jethro",
  "LOLCAT",
  "studly"
].map(f => [f]);

test.each(filters)("%s", filterName => {
  const expectedTransform = fs
    .readFileSync(
      path.join(__dirname, `moby-dick-chapter-1.${filterName}.txt`),
      { encoding: "UTF8" }
    )
    .toString();

  const filterFn = require(`../src/${filterName}`);

  expect(filterFn(originalText).split(" ")).toEqual(
    expectedTransform.split(" ")
  );
});

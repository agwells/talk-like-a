const fs = require("fs");
const path = require("path");

const originalText = fs
  .readFileSync(path.join(__dirname, "moby-dick-chapter-1.txt"), {
    encoding: "UTF8"
  })
  .toString();

const filters = ["chef", "LOLCAT", "cockney"].map(f => [f]);

test.each(filters)("Comparing filter output to Unix version", filterName => {
  const expectedTransform = fs.readFileSync(
    path.join(__dirname, `moby-dick-chapter-1.${filterName}.txt`),
    { encoding: "UTF8" }
  );

  const filterFn = require(`../src/${filterName}`).default;
  const generatedTransform = filterFn(originalText);

  expect(generatedTransform).toStrictEqual(expectedTransform);
});

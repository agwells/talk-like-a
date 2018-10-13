const fs = require("fs");
const path = require("path");

const sampleText = fs
  .readFileSync(path.join(__dirname, "moby-dick-chapter-1.txt"), {
    encoding: "UTF8"
  })
  .toString();

test("chef", () => {
  const expectedChefText = fs.readFileSync(
    path.join(__dirname, "moby-dick-chapter-1.chef.txt"),
    { encoding: "UTF8" }
  );

  const chef = require("../src/chef").default;
  const generatedChefText = chef(sampleText);

  expect(generatedChefText).toStrictEqual(expectedChefText);
});

import React from "react";
// import "./App.css";
// import { b1ff } from "talk-like-a/src/b1ff";
// import { LOLCAT } from "talk-like-a/src/LOLCAT";
// import { censor } from "talk-like-a/src/censor";
// import "talk-like-a/src/chef";
// import "talk-like-a/src/cockney";
// import "talk-like-a/src/eleet";
// import "talk-like-a/src/fudd";
// import "talk-like-a/src/jethro";
// import "talk-like-a/src/lib";
// import { newspeak } from "talk-like-a/src/newspeak";
import * as talkLike from "talk-like-a";

const filters = Object.keys(talkLike);

function App() {
  const [filterName, setFilterName] = React.useState(filters[0]);
  const [plainText, setPlainText] = React.useState(
    `I am the very model of a modern Major-General,
I've information vegetable, animal, and mineral,
I know the kings of England, and I quote the fights historical
From Marathon to Waterloo, in order categorical;
I'm very well acquainted, too, with matters mathematical,
I understand equations, both the simple and quadratical,
About binomial theorem I'm teeming with a lot o' news,
With many cheerful facts about the square of the hypotenuse.`
  );
  const filter = talkLike[filterName];

  return (
    <div className="App" style={{ margin: "5vh" }}>
      <header className="App-header">
        <h1>talk-like-a</h1>
        <p>{filter("Transform plain English text in various comedic ways.")}</p>
        <ul>
          <li>
            Github:{" "}
            <a href="https://github.com/agwells/talk-like-a">
              https://github.com/agwells/talk-like-a
            </a>
          </li>
          <li>
            NPM:{" "}
            <a href="https://www.npmjs.com/package/talk-like-a">
              https://www.npmjs.com/package/talk-like-a
            </a>
          </li>
        </ul>
      </header>
      <main>
        <p>
          <select
            autoFocus={true}
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
          >
            {filters.map(filterOption => (
              <option key={filterOption} value={filterOption}>
                {filterOption}
              </option>
            ))}
          </select>
        </p>
        <p>
          <textarea
            rows={4}
            cols={60}
            value={plainText}
            onChange={e => setPlainText(e.target.value)}
          />
        </p>
        <pre>{filter(plainText)}</pre>
      </main>
    </div>
  );
}

export default App;

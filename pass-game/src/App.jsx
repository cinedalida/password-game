import { useState, useEffect } from "react";

import "./App.css";

const marvelCharacters = [
  "ironman",
  "spiderman",
  "thor",
  "loki",
  "thanos",
  "wanda",
  "vision",
  "hawkeye",
  "hulk",
  "antman",
  "blackwidow",
  "doctorstrange",
  "falcon",
  "shuri",
  "gamora",
  "drax",
  "star-lord",
  "rocket",
  "nebula",
  "bucky",
  "kang",
  "america",
  "groot",
  "moonknight",
];

const conditionsList = [
  {
    id: 1,
    description: "Must be at least 8 characters long",
    check: (pw) => pw.length >= 8,
  },
  {
    id: 2,
    description: "Must include a number",
    check: (pw) => /\d/.test(pw),
  },
  {
    id: 3,
    description: "Must include an uppercase letter",
    check: (pw) => /[A-Z]/.test(pw),
  },
  {
    id: 4,
    description: "Must include a special character",
    check: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
  },
  {
    id: 5,
    description: "Inlude the best song of Chappell Roan",
    check: (pw) => pw.toLowerCase().includes("casual"),
  },
  {
    id: 7,
    description: "Must be a palindrome",
    check: (pw) => pw === pw.split("").reverse().join(""),
  },
  {
    id: 8,
    description: "Must have exactly 3 numbers",
    check: (pw) => (pw.match(/\d/g) || []).length === 3,
  },
  {
    id: 9,
    description: "Must contain at least 2 emojis",
    check: (pw) => (pw.match(/[\u{1F600}-\u{1F64F}]/gu) || []).length >= 2,
  },
  {
    id: 10,
    description: "Must not contain the letter 'e'",
    check: (pw) => !pw.toLowerCase().includes("e"),
  },
  {
    id: 11,
    description: "Must include today’s weekday",
    check: (pw) => {
      const today = new Date()
        .toLocaleDateString("en-US", { weekday: "long" })
        .toLowerCase();
      return pw.toLowerCase().includes(today);
    },
  },
  {
    id: 12,
    description: "Must include your favorite hex color code (e.g. #a1b2c3)",
    check: (pw) => /#[0-9a-fA-F]{6}/.test(pw),
  },
  {
    id: 13,
    description: "Must include the capital of England but backwards",
    check: (pw) => pw.toLowerCase().includes("nodnol"),
  },
  {
    id: 14,
    description: "Must include the year Titanic was released",
    check: (pw) => pw.includes("1997"),
  },
  {
    // .some() checks if at least one of the characters is included
    id: 15,
    description: "Must include a Marvel character",
    check: (pw) =>
      marvelCharacters.some((character) =>
        pw.toLowerCase().includes(character)
      ),
  },
  // more conditions!!!!!
];

function App() {
  const [password, setPassword] = useState("");
  const [currentLevel, setCurrentLevel] = useState(1);

  const visibleConditions = conditionsList.slice(0, currentLevel);

  const satisfiedConditions = visibleConditions.filter((cond) =>
    cond.check(password)
  );

  const unsatisfiedConditions = visibleConditions.filter(
    (cond) => !cond.check(password)
  );

  useEffect(() => {
    // if all conditions are met, proceed to the next level
    if (
      unsatisfiedConditions.length === 0 &&
      currentLevel < conditionsList.length
    ) {
      const timer = setTimeout(() => {
        setCurrentLevel(currentLevel + 1);
      }, 600); // delay
      return () => clearTimeout(timer);
    }
  }, [password, currentLevel]);

  const isGameOver =
    currentLevel === conditionsList.length &&
    satisfiedConditions.length === currentLevel;

  return (
    <>
      <div className="app">
        <h1 className="title">Password Game</h1>
      </div>
      <input
        type="text"
        placeholder="Enter Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isGameOver}
      ></input>

      {isGameOver && (
        <h2 className="success">All conditions satisfied! Game Over!</h2>
      )}

      <div className="conditions not-met">
        {unsatisfiedConditions.map((cond) => (
          <div key={cond.id} className="condition red">
            X {cond.description}
          </div>
        ))}
      </div>

      <div className="conditions met">
        {satisfiedConditions.map((cond) => (
          <div key={cond.id} className="condition green">
            {cond.description}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

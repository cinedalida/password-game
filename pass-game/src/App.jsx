import { useState, useEffect } from "react";

import "./App.css";

const funPhrases = [
  "ready na ba magpaka-tanga?",
  "baks, KAYANIN MO!",
  "hindi lahat ng strong maganda",
  "lagi ka nalang ganyan",
  "bakit? bakit? bakit?",
  "wag na lang!",
  "awa na lang",
  "umay",
  "pa-awat ka na baksss",
  "JUSKO PO!!!!!",
  "masokista ka ba? bat ganyan password mo!?!?",
  "kaya today?",
  "wala ka pa sa kalahati baks",
  "sumuko ka na? wag ngayon!",
  "lagi nang umaawiiiiiit, umaawit mula kusina hanggang sa salaaaaa",
  "tiwala lang, isang condition na lang",
  "minsan di mo talaga makukuha lahat",
  "baka naman kasi inooverthink mo lang....",
  "Good luck babe!!!!!!",
];

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
  "gamora",
  "drax",
  "star-lord",
  "nebula",
  "bucky",
  "america",
  "groot",
  "moonknight",
  "yelena",
  "bob",
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
    id: 6,
    description: "isama mo na din yung favorite color ng gumawa ng game na 'to",
    check: (pw) => pw.toLowerCase().includes("violet"),
  },
  {
    id: 7,
    description: "Must have exactly 3 numbers",
    check: (pw) => (pw.match(/\d/g) || []).length === 3,
  },
  {
    id: 8,
    description: "Must contain at least 2 emojis",
    check: (pw) => (pw.match(/[\u{1F600}-\u{1F64F}]/gu) || []).length >= 2,
  },
  {
    id: 9,
    description: "Must include today’s weekday",
    check: (pw) => {
      const today = new Date()
        .toLocaleDateString("en-US", {
          weekday: "long",
          timeZone: "Asia/Manila",
        })
        .toLowerCase();
      return pw.toLowerCase().includes(today);
    },
  },
  {
    id: 10,
    description: "Must include your favorite hex color code",
    check: (pw) => /#[0-9a-fA-F]{6}/.test(pw),
  },
  {
    id: 11,
    description:
      "Must include a Sponge Cola song (hint: starts with 'n' ends with 'a')",
    check: (pw) => pw.toLowerCase().includes("nakapagtataka"),
  },
  {
    id: 12,
    description: "Isama mo yung pinaka masakit na kanta ng Up Dharma Down",
    check: (pw) => pw.includes("Oo"),
  },
  {
    // .some() checks if at least one of the characters is included
    id: 13,
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
  const [funPhrase, setFunPhrase] = useState(funPhrases[0]);

  const visibleConditions = conditionsList.slice(0, currentLevel);

  const satisfiedConditions = visibleConditions.filter((cond) =>
    cond.check(password)
  );

  const unsatisfiedConditions = visibleConditions.filter(
    (cond) => !cond.check(password)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * funPhrases.length);
      setFunPhrase(funPhrases[randomIndex]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

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
        <h2 className="subtitle">{funPhrase}</h2>
      </div>
      <input
        type="text"
        placeholder="Enter Password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isGameOver}
      ></input>

      {isGameOver && (
        <h2 className="success">
          Congrats Bakss!! Enjoy your greatest password everr!!
        </h2>
      )}

      <div className="conditions not-met">
        {unsatisfiedConditions.map((cond) => (
          <div key={cond.id} className="condition red">
            {cond.description}
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

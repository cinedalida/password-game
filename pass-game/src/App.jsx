import { useState, useEffect } from "react";

import "./App.css";

const funPhrases = [
  "ready na ba CSmashers?",
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
  // "lagi nang umaawiiiiiit, umaawit mula kusina hanggang sa salaaaaa",
  "tiwala lang, isang condition na lang",
  "minsan di mo talaga makukuha lahat",
  "baka naman kasi inooverthink mo lang....",
  "Good luck babe!!!!!!",
];

// const marvelCharacters = [
//   "ironman",
//   "spiderman",
//   "thor",
//   "loki",
//   "thanos",
//   "wanda",
//   "vision",
//   "hawkeye",
//   "hulk",
//   "antman",
//   "blackwidow",
//   "doctorstrange",
//   "falcon",
//   "gamora",
//   "drax",
//   "star-lord",
//   "nebula",
//   "bucky",
//   "america",
//   "groot",
//   "moonknight",
//   "yelena",
//   "bob",
// ];

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
    description: "Must include the year in the CSPC Logo",
    check: (pw) => pw.includes("2024"),
  },
  {
    id: 6,
    description:
      "isama mo na din yung nickname ng Chief Executive Officer ngayong year",
    check: (pw) => pw.toLowerCase().includes("risse"),
  },
  {
    id: 7,
    description: "Must have exactly 6 numbers",
    check: (pw) => (pw.match(/\d/g) || []).length === 6,
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
  // {
  //   id: 10,
  //   description: "Include the sum of all digits in 2⁸",
  //   check: (pw) => pw.includes("13"), // 2+5+6 = 13
  // },
  // {
  //   id: 10,
  //   description: "Must include your favorite hex color code",
  //   check: (pw) => /#[0-9a-fA-F]{6}/.test(pw),
  // },
  {
    id: 10,
    description: "must include the easiest programming language",
    check: (pw) => pw.toLowerCase().includes("python"),
  },
  {
    id: 11,
    description: "Isama mo na din yung motto ng lego theme ng CSPC!!",
    check: (pw) =>
      pw.toLowerCase().includes("startyourcareerbuildthefirststepwithcspc"),
  },
  // {
  //   // .some() checks if at least one of the characters is included
  //   id: 14,
  //   description: "Must include a Marvel character",
  //   check: (pw) =>
  //     marvelCharacters.some((character) =>
  //       pw.toLowerCase().includes(character)
  //     ),
  // },
  // {
  //   id: 15,
  //   description: "Include the 7th prime number",
  //   check: (pw) => pw.includes("17"), // 2, 3, 5, 7, 11, 13, 17
  // },
  {
    id: 12,
    description: "Must include the best street food in Gate 1",
    check: (pw) =>
      ["kwek-kwek", "sweetcorn"].some((food) =>
        pw.toLowerCase().includes(food)
      ),
  },
  {
    id: 13,
    description: "live jesus in our hearts...",
    check: (pw) => pw.toLowerCase().includes("forever"),
  },
  // {
  //   id: 18,
  //   description: "Include a Fibonacci number under 100",
  //   check: (pw) => {
  //     const fibs = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  //     return fibs.some((num) => pw.includes(num.toString()));
  //   },
  // },
  // {
  //   id: 19,
  //   description: "Include the result of 2⁵",
  //   check: (pw) => pw.includes("32"),
  // },
  // {
  //   id: 20,
  //   description: "Include the number of sides of a dodecagon",
  //   check: (pw) => pw.includes("12"),
  // },
  // {
  //   id: 21,
  //   description: "Palaging gutom, pero hindi lumalaki.",
  //   check: (pw) => pw.toLowerCase().includes("wallet"),
  // },
  // {
  //   id: 22,
  //   description: "Bugtong: Hindi hayop, hindi tao, pumapalo. Ano ‘yun?",
  //   check: (pw) => pw.toLowerCase().includes("electricfan"),
  // },
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
        <h1 className="title">CSPC Password Game⚡</h1>
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
          Congrats!! Enjoy your greatest password everr!!
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

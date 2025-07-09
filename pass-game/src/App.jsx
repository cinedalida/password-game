import { useState, useEffect } from "react";

import "./App.css";

const conditionsList = [
  {
    id: 1,
    description: "Must be at least 8 characters long",
    check: (pw) => pw.length >= 8,
  },
  {
    id: 2,
    description: "must include a number",
    check: (pw) => /\d/.test(pw),
  },
  {
    id: 3,
    description: "Must include a an uppercase letter",
    check: (pw) => /[A-Z]/.test(pw),
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

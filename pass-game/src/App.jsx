import { useState } from "react";

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

  const satisfiedConditions = conditionsList.filter((cond) =>
    cond.check(password)
  );

  const unsatisfiedConditions = conditionsList.filter(
    (cond) => !cond.check(password)
  );

  const isGameOver = satisfiedConditions.length === conditionsList.length;

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

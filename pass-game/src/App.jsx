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

  return <></>;
}

export default App;

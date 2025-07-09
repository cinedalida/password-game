import { useState } from "react";

import "./App.css";

const conditionList = [
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
  const [count, setCount] = useState(0);

  return <></>;
}

export default App;

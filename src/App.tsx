import React, { useEffect, useState } from "react";
import Highlighter from "./Highlighter";

const App: React.FC = () => {
  const [active, setActive] = useState(false);

  const toggleHighlighter = () => {
    setActive(!active);
  };

  console.log("App re-rendering");

  const arr: string[] = [];

  for (let i = 0; i < 50; ++i) {
    arr.push(crypto.randomUUID());
  }

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      console.log(e);

      if (e.ctrlKey && e.shiftKey && e.code === "KeyS") {
        toggleHighlighter();
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

  return (
    <div>
      <button onClick={toggleHighlighter}>
        {active ? "Deactivate" : "Activate"}
      </button>
      <Highlighter active={active} />

      {/* <ul>
        {arr.map((d, index) => (
          <li
            key={index}
            className={`${index + 1}-${d}`}
            style={{ padding: 16, marginBlock: 16 }}
          >
            {d}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default App;

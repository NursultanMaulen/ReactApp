import React from "react";

function App() {
  let a = 1;
  function inc() {
    a++;
  }
  return (
    <div>
      <div> Increment {a}</div>
      <button onClick={inc}>INC</button>
    </div>
  );
}

export default App;

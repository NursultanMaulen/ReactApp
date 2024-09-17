import React, { useState } from "react";

function Increment() {
  const [state, setState] = useState(0);

  function inc() {
    setState(state + 1);
  }
  console.log("Incremented");
  return (
    <div>
      <div> Increment {state}</div>
      <button onClick={inc}> INC </button>
    </div>
  );
}

export default Increment;

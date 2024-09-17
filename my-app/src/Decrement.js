import React, { useState } from "react";

function Decrement() {
  const [state, setState] = useState(0);
  function decr() {
    return setState(state - 1);
  }
  console.log("DECREMENTED");
  return (
    <div>
      <div> Decremented value: {state} </div>
      <button onClick={decr}>DECR</button>
    </div>
  );
}

export default Decrement;

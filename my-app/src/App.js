import React, { useState } from "react";
import Increment from "./Increment";
import Decrement from "./Decrement";
import AddToArray from "./AddToArray";

function App() {
  // const [state, setState] = useState(1);

  // function mult() {
  //   return setState(state * 100);
  // }
  // function trigg() {
  //   console.log("TRIGGERED");
  // }
  const [authorized, setAuthorized] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleOnLogin = () => {
    if (login.length >= 8 && password.includes("H")) {
      setAuthorized(!authorized);
    }
  };

  const handleOnLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handleOnPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <input placeholder="Login" onChange={handleOnLoginChange} />
      <input placeholder="Password" onChange={handleOnPasswordChange} />
      <button onClick={handleOnLogin}>Log in</button>
      {authorized && <p>CONGRATS!</p>}

      <AddToArray />
    </div>
  );
}

export default App;

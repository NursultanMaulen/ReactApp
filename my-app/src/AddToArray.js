import React, { useState } from "react";

function AddToArray() {
  const [myArray, setMyArray] = useState([]);
  const [value, setValue] = useState("");

  const ChangeMyArray = () => {
    const tempArray = myArray;
    tempArray.push(value);
    setMyArray(tempArray);
    setValue("");
  };

  const mapArray = (element, index) => {
    return <p key={index}>{element}</p>; // Устанавливаем уникальный key
  };

  return (
    <div>
      <input
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      <button onClick={ChangeMyArray}>AddToArray</button>

      <div>
        Array: <ul>{myArray.map(mapArray)}</ul>
      </div>
    </div>
  );
}

export default AddToArray;

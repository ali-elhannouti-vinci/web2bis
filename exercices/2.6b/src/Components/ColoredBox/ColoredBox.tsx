import { useState } from "react";

function ColoredBox() {
  const [clickCounter, setClickCounter] = useState(0);

  const colors = ["red","green", "blue", "yellow", "purple"];

  function clickHandler() {
    if (clickCounter === colors.length-1) {
      setClickCounter(0);
    } else {
      setClickCounter(clickCounter + 1);
    }
    console.log(clickCounter);
  }

  return (
    <div className="box" style={{ backgroundColor: colors[clickCounter] }}>
      <button onClick={clickHandler}>{clickCounter === colors.length-1 ? colors[0] : colors[clickCounter+1]}</button>
      <div style={{color: "black"}}>{colors[clickCounter]}</div>
    </div>
  );
}

export default ColoredBox;

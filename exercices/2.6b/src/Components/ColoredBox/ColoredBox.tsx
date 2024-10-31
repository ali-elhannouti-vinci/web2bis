import { useState } from "react";

function ColoredBox() {
  const [clickCounter, setClickCounter] = useState(0);

  const colors = ["red","green", "blue", "yellow", "purple"];

  function clickHandler() {
    setClickCounter((clickCounter+1)%colors.length)
    console.log(clickCounter);
  }

  return (
    <div className="box" style={{ backgroundColor: colors[clickCounter] }}>
      <button onClick={clickHandler}>{colors[(clickCounter+1)%colors.length]}</button>
      <div style={{color: "black"}}>{colors[clickCounter]}</div>
    </div>
  );
}

export default ColoredBox;

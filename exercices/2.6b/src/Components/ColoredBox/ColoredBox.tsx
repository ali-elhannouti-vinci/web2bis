import { useState } from "react";

function ColoredBox() {
  const [bgColor, setBgColor] = useState("red");
  const [clickCounter, setClickCounter] = useState(0);

  const colors = ["green", "blue", "yellow", "purple","red"];

  function clickHandler() {
    setBgColor(colors[clickCounter]);
    if (clickCounter === colors.length-1) {
      setClickCounter(0);
    } else {
      setClickCounter(clickCounter + 1);
    }
    console.log(clickCounter);
    
  }

  return (
    <div className="box" style={{ backgroundColor: bgColor }}>
        <div style={{color: "black"}}>{bgColor}</div>
      <button onClick={clickHandler}>{colors[clickCounter]}</button>
    </div>
  );
}

export default ColoredBox;

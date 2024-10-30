import { useState } from "react";

interface CounterProps{
    title:string,
    message:string,
    hoverMessage:string
}

const ClickCounter = ({title,message,hoverMessage}:CounterProps) => {
  const [count, setCount] = useState(0);
  const [isMouseOver,setIsMouseOver] = useState(false)

  const handleClick = () => {
    setCount((count) => count + 1);
  }

  const handleMouseOver = () => {
    setIsMouseOver(true);
  }

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  }


  return <div>
    <h1>{title}</h1>
    <div>{isMouseOver ? hoverMessage : <br />}</div>
    <button onClick={handleClick} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        count is {count}</button>
    <h1>{count >= 10 ? message : <p><br /></p>}</h1>
    </div>;
}
export default ClickCounter;

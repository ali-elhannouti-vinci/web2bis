import { useState } from "react";

const ClickCounter = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((count) => count + 1);
  };
  return <button onClick={handleClick}>count is {count}</button>;
};
export default ClickCounter;

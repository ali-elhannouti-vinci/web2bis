import { useState } from "react";
import "./Movie.css";

function Movie({ title, director ,description}: MovieProps) {
  const [isClicked,setIsClicked] = useState(false);
  function clickHandler() {
    setIsClicked(!isClicked);
  }
  return (
    <li key={title} className="movieComponent">
      <div onClick={clickHandler} className="movieFirstLine">
        <strong>{title}</strong> - Réalisateur : {director}
      </div>
      <div>
        {isClicked ? description : ""}
      </div>
    </li>
  );
}

interface MovieProps {
  title: string;
  director: string;
  description:string;
}

export default Movie;

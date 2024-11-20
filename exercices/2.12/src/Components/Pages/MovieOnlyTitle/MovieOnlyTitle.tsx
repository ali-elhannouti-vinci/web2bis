import "./Movie.css";
import { useNavigate } from "react-router-dom";

function MovieOnlyTitle({ title }: MovieProps) {
  const navigate = useNavigate();
  function clickHandler() {
    navigate("/moviepage/");
  }
  return (
    <li key={title} className="movieComponent">
      <div onClick={clickHandler} className="movieFirstLine">
        <strong>{title}</strong>
      </div>
    </li>
  );
}

interface MovieProps {
  title: string;
  director: string;
  description: string;
}

export default MovieOnlyTitle;

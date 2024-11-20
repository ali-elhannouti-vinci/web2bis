import { useNavigate } from "react-router-dom";

function MovieOnHomePage({ id,title }: MovieOnlyTitleProps) {
  const navigate = useNavigate();
  function clickHandler() {
    navigate(`/moviepage/${id}`);
  }
  return (
    <li key={title} className="movieComponent">
      <div onClick={clickHandler} className="movieFirstLine">
        <strong>{title}</strong>
      </div>
    </li>
  );
}

interface MovieOnlyTitleProps {
  id:number
  title: string;
}

export default MovieOnHomePage;

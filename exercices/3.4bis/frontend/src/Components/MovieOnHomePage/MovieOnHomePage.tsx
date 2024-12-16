import { useNavigate } from "react-router-dom";

function MovieOnHomePage({ id,title }: MovieOnHomePage) {
  const navigate = useNavigate();
  function clickHandler() {
    navigate(`/moviepage/${id}`);
  }
  return (
      <div onClick={clickHandler} className="movieFirstLine">
        <strong>{title}</strong>
      </div>
  );
}

interface MovieOnHomePage {
  id:number
  title: string;
}

export default MovieOnHomePage;

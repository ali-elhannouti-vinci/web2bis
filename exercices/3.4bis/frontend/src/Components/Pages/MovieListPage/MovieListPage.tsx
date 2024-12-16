import MovieComponent from "../../MovieComponent/MovieComponent";
import { MovieListContext } from "../../../types";
import { useOutletContext } from "react-router-dom";



function MovieListPage() {
  
  const {
    movies
  } : MovieListContext =  useOutletContext();

  return (
    <>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieComponent
              id={movie.id}
              title={movie.title}
              director={movie.director}
              duration={movie.duration}
              imageUrl={movie.imageUrl}
              description={movie.description}
              budget={movie.budget}
            />
            <br />
          </li>
        ))}
      </ul>
    </>
  );
}

export default MovieListPage;

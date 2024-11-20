import { useMatch, useOutletContext } from "react-router-dom";
import { MovieListContext } from "../../../types";
import MovieComponent from "../../MovieComponent/MovieComponent";

function MoviePage() {
    const {
        movies
    } : MovieListContext = useOutletContext();

    const match = useMatch("/moviepage/:movieId")
    const movieId = match?.params.movieId;
    if (!movieId) return <p>Movie ID is missing</p>;

    const movie = movies.find((movie) => movie.id.toString() === movieId )
    if (!movie) {
        return <p>Movie Not Found</p>
    }

    return (
        <div>
            <MovieComponent
              title={movie.title}
              director={movie.director}
              duration={movie.duration}
              imageUrl={movie.imageUrl}
              description={movie.description}
              budget={movie.budget}
            />
        </div>
    )
}

export default MoviePage;
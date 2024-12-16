import { MovieListContext } from "../../../types";
import MovieOnHomePage from "../../MovieOnHomePage/MovieOnHomePage";
import PageTitle from "../../PageTitle/PageTitle";
import { useOutletContext } from "react-router-dom";

function HomePage() {
  const { movies }: MovieListContext = useOutletContext();
  return (
    <div>
      <PageTitle title="iMovies" />
      <h2>
        Welcome to iMovies, your ultimate destination for discovering the latest
        movies and cinemas near you. Explore showtimes, read reviews, and find
        the perfect movie experience.
      </h2>
      <ul>
        {movies.map((movie) => (
            <li key={movie.id}>
                <MovieOnHomePage id={movie.id} title={movie.title} />
            </li>
            
        ))}
      </ul>
    </div>
  );
}
export default HomePage;

import { useMatch, useNavigate, useOutletContext } from "react-router-dom";
import { MovieListContext } from "../../../types";
import MovieComponent from "../../MovieComponent/MovieComponent";
import { useEffect } from "react";

function MoviePage() {
  const { movies }: MovieListContext = useOutletContext();
  const navigate = useNavigate();

  const match = useMatch("/moviepage/:movieId");
  const movieId = match?.params.movieId;
  if (!movieId) return <p>Movie ID is missing</p>;

  const movie = movies.find((movie) => movie.id.toString() === movieId);

  // Si le film n'existe pas dans la liste, on configure un timer pour la redirection
  useEffect(() => {
    let backHomePageTimer : number;
    console.log("Movie : "+JSON.stringify(movie));
    
    if (!movie) {
      backHomePageTimer = setTimeout(() => {
        navigate("/"); // Redirection vers la page d'accueil après 5 secondes
      }, 5000);
    }

    return () => {
      clearTimeout(backHomePageTimer);  // Nettoyage du timer au démontage du composant
    };
  }, [movie,navigate]);  // Réexécute l'effet si 'movie' ou 'navigate' changent

  
  if (!movie) {
    return <p> The movie was not found. You will be moved to the home page in 5 seconds </p>;
  }


  return (
    <div>
      <MovieComponent
        id={movie.id}
        title={movie.title}
        director={movie.director}
        duration={movie.duration}
        imageUrl={movie.imageUrl}
        description={movie.description}
        budget={movie.budget}
      />
    </div>
  );
}

export default MoviePage;

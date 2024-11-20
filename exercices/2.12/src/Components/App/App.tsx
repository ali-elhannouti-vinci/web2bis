import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import MovieListPage from "../Pages/MovieListPage/MovieListPage";
import CinemaPage from "../Pages/CinemaPage/CinemaPage";
import HomePage from "../Pages/HomePage/HomePage";
import { Movie, MovieListContext, NewMovie } from "../../types";
import { useState } from "react";
import AddMoviePage from "../Pages/AddMoviePage/AddMoviePage";

const defaultMovies: Movie[] = [
  {
    id: 1,
    title: "Django Unchained",
    director: "Quentin Tarantino",
    duration: 165,
    imageUrl:
      "https://fr.web.img6.acsta.net/medias/nmedia/18/90/08/59/20366454.jpg",
    description:
      "Un esclave affranchi fait équipe avec un chasseur de primes pour libérer sa femme d'un propriétaire terrifiant.",
    budget: 100000000,
  },
  {
    id: 2,
    title: "Joker",
    director: "Todd Phillips",
    duration: 122,
    imageUrl:
      "https://www.francescocaruso.net/wp-content/uploads/2019/10/joker-img.jpg",
    description:
      "Un homme en difficulté mentale se transforme en un criminel notoire à Gotham City.",
    budget: 55000000,
  },
  {
    id: 3,
    title: "Oppenheimer",
    director: "Christopher Nolan",
    duration: 180,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-y8UxQmKP9XDaokwd8LtNx2_5c2G5ZApyWA&s",
    description:
      "Le récit de la vie de Robert Oppenheimer et la création de la bombe atomique.",
    budget: 100000000,
  },
  {
    id: 4,
    title: "Avengers: Infinity War",
    director: "Anthony et Joe Russo",
    duration: 149,
    imageUrl:
      "https://musicart.xboxlive.com/7/46ba5000-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080",
    description:
      "Les Avengers et leurs alliés tentent d'arrêter Thanos avant qu'il ne détruise l'univers.",
    budget: 400000000,
  },
  {
    id: 5,
    title: "Les Affranchis",
    director: "Martin Scorsese",
    duration: 146,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwHNJv1f7DSFJSS5diDkB9JH5W_K5iDLZp0Q&s",
    description:
      "L'histoire vraie d'un mafieux qui gravit les échelons du crime organisé.",
    budget: 25000000,
  },
  {
    id: 6,
    title: "Fury",
    director: "David Ayer",
    duration: 134,
    imageUrl:
      "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/kdbLf3aTQsEXqYlH9vA4fzmnSFz.jpg",
    description:
      "En avril 1945, pendant la Seconde Guerre mondiale, un sergent de char américain et son équipage se battent pour survivre derrière les lignes ennemies.",
    budget: 68000000,
  },
];

const HomePageRender = () => <HomePage />;
const MovieListPageRender = () => <MovieListPage />;
const CinemaPageRender = () => <CinemaPage />;
const AddMoviePageRender = () => <AddMoviePage />;

const App = () => {
  const [movies, setMovies] = useState(defaultMovies);
  // Fonction pour obtenir un nouvel ID basé sur le dernier film
  const getNextId = (movies: Movie[]): number => {
    // Si la liste est vide, retourner 1 comme premier ID
    if (movies.length === 0) return 1;

    // Sinon, prendre l'ID du dernier film et l'incrémenter
    const lastMovie = movies[movies.length - 1];
    return lastMovie.id + 1;
  };
  
  const addMovie = (newMovie: NewMovie) => {
    const nextId = getNextId(movies)
    const addedMovie : Movie = {
      id:nextId,...newMovie
    }
    setMovies([...movies, addedMovie]);
  };

  const fullMovieListContext: MovieListContext = {
    movies,
    setMovies,
    addMovie,
  };

  return (
    <div>
      <NavBar />
      <Outlet context={fullMovieListContext} />
    </div>
  );
};

export {
  App,
  HomePageRender,
  MovieListPageRender,
  CinemaPageRender,
  AddMoviePageRender,
};

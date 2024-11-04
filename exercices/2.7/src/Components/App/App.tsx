// import { useState } from "react";
import "./App.css";
import MovieComponent from "../MovieComponent/MovieComponent";
import { Movie } from "../../types";

const moviesDefault: Movie[] = [
  {
    titre: "Django Unchained",
    director: "Quentin Tarantino",
    duration: 165,
    imageUrl: "https://fr.web.img6.acsta.net/medias/nmedia/18/90/08/59/20366454.jpg",
    description:
      "Un esclave affranchi fait équipe avec un chasseur de primes pour libérer sa femme d'un propriétaire terrifiant.",
    budget: 100000000,
  },
  {
    titre: "Joker",
    director: "Todd Phillips",
    duration: 122,
    imageUrl: "https://www.francescocaruso.net/wp-content/uploads/2019/10/joker-img.jpg",
    description:
      "Un homme en difficulté mentale se transforme en un criminel notoire à Gotham City.",
    budget: 55000000,
  },
  {
    titre: "Oppenheimer",
    director: "Christopher Nolan",
    duration: 180,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-y8UxQmKP9XDaokwd8LtNx2_5c2G5ZApyWA&s",
    description:
      "Le récit de la vie de Robert Oppenheimer et la création de la bombe atomique.",
    budget: 100000000,
  },
  {
    titre: "Avengers: Infinity War",
    director: "Anthony et Joe Russo",
    duration: 149,
    imageUrl: "https://musicart.xboxlive.com/7/46ba5000-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080",
    description:
      "Les Avengers et leurs alliés tentent d'arrêter Thanos avant qu'il ne détruise l'univers.",
    budget: 400000000,
  },
  {
    titre: "Les Affranchis",
    director: "Martin Scorsese",
    duration: 146,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwHNJv1f7DSFJSS5diDkB9JH5W_K5iDLZp0Q&s",
    description:
      "L'histoire vraie d'un mafieux qui gravit les échelons du crime organisé.",
    budget: 25000000,
  },
];

function App() {
  






  return (
    <>
      <ul>
        {moviesDefault.map((movie) => (
          <li>
            <MovieComponent
              titre={movie.titre}
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

export default App;

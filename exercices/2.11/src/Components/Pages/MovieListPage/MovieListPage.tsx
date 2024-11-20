import MovieComponent from "../../MovieComponent/MovieComponent";
import { Movie } from "../../../types";
import { SyntheticEvent, useState } from "react";

const defaultMovies: Movie[] = [
  {
    title: "Django Unchained",
    director: "Quentin Tarantino",
    duration: 165,
    imageUrl: "https://fr.web.img6.acsta.net/medias/nmedia/18/90/08/59/20366454.jpg",
    description:
      "Un esclave affranchi fait équipe avec un chasseur de primes pour libérer sa femme d'un propriétaire terrifiant.",
    budget: 100000000,
  },
  {
    title: "Joker",
    director: "Todd Phillips",
    duration: 122,
    imageUrl: "https://www.francescocaruso.net/wp-content/uploads/2019/10/joker-img.jpg",
    description:
      "Un homme en difficulté mentale se transforme en un criminel notoire à Gotham City.",
    budget: 55000000,
  },
  {
    title: "Oppenheimer",
    director: "Christopher Nolan",
    duration: 180,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-y8UxQmKP9XDaokwd8LtNx2_5c2G5ZApyWA&s",
    description:
      "Le récit de la vie de Robert Oppenheimer et la création de la bombe atomique.",
    budget: 100000000,
  },
  {
    title: "Avengers: Infinity War",
    director: "Anthony et Joe Russo",
    duration: 149,
    imageUrl: "https://musicart.xboxlive.com/7/46ba5000-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080",
    description:
      "Les Avengers et leurs alliés tentent d'arrêter Thanos avant qu'il ne détruise l'univers.",
    budget: 400000000,
  },
  {
    title: "Les Affranchis",
    director: "Martin Scorsese",
    duration: 146,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwHNJv1f7DSFJSS5diDkB9JH5W_K5iDLZp0Q&s",
    description:
      "L'histoire vraie d'un mafieux qui gravit les échelons du crime organisé.",
    budget: 25000000,
  },
];

function MovieListPage() {
  const [titre, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [movies, setMovies] = useState(defaultMovies);
  const [error, setError] = useState(""); // State for error messages

  // Title change handler
  function handleTitleChange(e: SyntheticEvent) {
    const titleInput = e.target as HTMLInputElement;
    setTitle(titleInput.value);
  }

  // Director change handler
  function handleDirectorChange(e: SyntheticEvent) {
    const directorInput = e.target as HTMLInputElement;
    setDirector(directorInput.value);
  }

  // Duration change handler
  function handleDurationChange(e: SyntheticEvent) {
    const durationInput = e.target as HTMLInputElement;
    setDuration(Number(durationInput.value)); // Convert string to number
  }

  // Image URL change handler
  function handleImageUrlChange(e: SyntheticEvent) {
    const imageUrlInput = e.target as HTMLInputElement;
    setImageUrl(imageUrlInput.value);
  }

  // Description change handler
  function handleDescriptionChange(e: SyntheticEvent) {
    const descriptionInput = e.target as HTMLInputElement;
    setDescription(descriptionInput.value);
  }

  // Budget change handler
  function handleBudgetChange(e: SyntheticEvent) {
    const budgetInput = e.target as HTMLInputElement;
    setBudget(Number(budgetInput.value)); // Convert string to number
  }

  // Handle form submission
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check for missing fields
    if (!titre || !director || !duration) {
      setError("Please fill in all required fields: Title, Director, and Duration.");
      return; // Exit if validation fails
    }

    // Clear error message if validation passes
    setError("");

    const newMovie: Movie = {
      title: titre,
      director: director,
      duration: duration,
      imageUrl: imageUrl,
      description: description,
      budget: budget,
    };
    setMovies([...movies, newMovie]); // Add the new movie to the existing movies

    // Reset form fields after successful submission
    setTitle("");
    setDirector("");
    setDuration(0);
    setImageUrl("");
    setDescription("");
    setBudget(0);
  }

  return (
    <>
      <ul>
        {movies.map((movie) => (
          <li key={movie.title}> {/* Use a unique key for list items */}
            <MovieComponent
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
      <h1>Add a movie</h1>
      <form onSubmit={handleSubmit}>
        <input value={titre} type="text" placeholder="Title" onChange={handleTitleChange} />
        <input value={director} type="text" placeholder="Director" onChange={handleDirectorChange} />
        <input value={duration} type="number" placeholder="Duration" onChange={handleDurationChange} />
        <input value={imageUrl} type="text" placeholder="Image URL" onChange={handleImageUrlChange} />
        <input value={description} type="text" placeholder="Description" onChange={handleDescriptionChange} />
        <input value={budget} type="number" placeholder="Budget" onChange={handleBudgetChange} />
        <button type="submit">Add Movie</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message if exists */}
    </>
  );
}

export default MovieListPage;

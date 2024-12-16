import { SyntheticEvent, useState } from "react";
import "./UpdateMoviePage.css";
import { MovieListContext, UpdatedMovie } from "../../../types";
import { useMatch, useNavigate, useOutletContext } from "react-router-dom";

function UpdateMoviePage() {
  const match = useMatch("/update/:movieId");
  const navigate = useNavigate();

  const [title, setTitle] = useState<undefined | string>("");
  const [director, setDirector] = useState<undefined | string>("");
  const [duration, setDuration] = useState<undefined | number>(0);
  const [imageUrl, setImageUrl] = useState<undefined | string>("");
  const [description, setDescription] = useState<undefined | string>("");
  const [budget, setBudget] = useState<undefined | number>(0);

  const [error, setError] = useState(""); // State for error messages

  const { updateMovie, movies }: MovieListContext = useOutletContext();

  const movieId = match?.params.movieId;
  if (!movieId) {
    return <div>Movie ID is missing</div>;
  }

  const movie = movies.find(
    (movieElement) => movieElement.id === Number(movieId)
  );
  if (!movie) {
    return <div>The movie was not found</div>;
  }
  const foundMovieId = movie.id;

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
    if (
      !title &&
      !director &&
      !duration &&
      !imageUrl &&
      !description &&
      !budget
    ) {
      setError("Please fill in at least one field to update");
      return; // Exit if validation fails
    }

    if (title && director) {
        console.log("Title = "+title + " Director = "+director);
        
      const foundDuplicate = movies.find(
        (movieElement) =>
          movieElement.director === director && movieElement.title === title
      );
      
      console.log(JSON.stringify(foundDuplicate));
      

      if (foundDuplicate) {
        setError(
          "There already exists a movie with the same title and director"
        );
        return;
      }
    }

    // Clear error message if validation passes
    setError("");

    const updatedMovie: UpdatedMovie = {
      title: title || undefined,
      director: director || undefined,
      duration: duration || undefined,
      imageUrl: imageUrl || undefined,
      description: description || undefined,
      budget: budget || undefined,
    };

    updateMovie(foundMovieId, updatedMovie);
    // Add the new movie to the existing movies
    
    // Reset form fields after successful submission
    setTitle("");
    setDirector("");
    setDuration(0);
    setImageUrl("");
    setDescription("");
    setBudget(0);
    navigate("/movielist");
  }

  return (
    <>
      <h1>Update {movie.title}</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          type="text"
          placeholder="Title"
          onChange={handleTitleChange}
        />
        <input
          value={director}
          type="text"
          placeholder="Director"
          onChange={handleDirectorChange}
        />
        <input
          value={duration}
          type="number"
          placeholder="Duration"
          onChange={handleDurationChange}
        />
        <input
          value={imageUrl}
          type="text"
          placeholder="Image URL"
          onChange={handleImageUrlChange}
        />
        <input
          value={description}
          type="text"
          placeholder="Description"
          onChange={handleDescriptionChange}
        />
        <input
          value={budget}
          type="number"
          placeholder="Budget"
          onChange={handleBudgetChange}
        />
        <button type="submit">Confirm changes</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      {/* Display error message if exists */}
    </>
  );
}

export default UpdateMoviePage;

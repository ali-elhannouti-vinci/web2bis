import { SyntheticEvent, useState } from "react";
import { MovieListContext, NewMovie } from "../../../types";
import {  useNavigate, useOutletContext } from "react-router-dom";

function AddMoviePage() {
  const navigate = useNavigate();
  const [titre, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState(0);
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  const [description, setDescription] = useState<undefined | string>(undefined);
  const [budget, setBudget] = useState<undefined | number>(undefined);

  const [error, setError] = useState(""); // State for error messages

  const {
    addMovie,
  } : MovieListContext =  useOutletContext();
 

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
      setError(
        "Please fill in all required fields: Title, Director, and Duration."
      );
      return; // Exit if validation fails
    }

    // Clear error message if validation passes
    setError("");

    const newMovie: NewMovie = {
      title: titre,
      director: director,
      duration: duration,
      imageUrl: imageUrl,
      description: description,
      budget: budget,
    };
    // Add the new movie to the existing movies
    addMovie(newMovie);
    // Reset form fields after successful submission
    setTitle("");
    setDirector("");
    setDuration(0);
    setImageUrl(undefined);
    setDescription(undefined);
    setBudget(undefined);
    navigate("/movielist");
  }

  return (
    <>
      <h1>Add a movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={titre}
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
        <button type="submit">Add Movie</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      {/* Display error message if exists */}
    </>
  );
}

export default AddMoviePage;

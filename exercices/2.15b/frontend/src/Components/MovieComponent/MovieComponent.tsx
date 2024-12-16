import { useOutletContext } from "react-router-dom";
import { MovieListContext } from "../../types";

function MovieComponent({id ,title, director, duration, imageUrl, description, budget}: MovieProps) {
    
    const {
        deleteMovie
      } : MovieListContext =  useOutletContext();

    return (
        <ul>
            <li><strong>Title:</strong> {title}</li>
            <li><strong>Director:</strong> {director}</li>
            <li><strong>Duration:</strong> {duration} minutes</li>
            {imageUrl && <li><img src={imageUrl}></img></li>}
            {description && <li><strong>Description:</strong> {description}</li>}
            {budget && <li><strong>Budget:</strong> ${budget.toLocaleString()}</li>}
            <button onClick={() => deleteMovie(id)}>Supprimer de la liste</button>
        </ul>
    );
}

interface MovieProps {
    id:number,
    title:string,
    director:string,
    duration:number,
    imageUrl?:string,
    description?:string,
    budget?:number
}
export default MovieComponent;
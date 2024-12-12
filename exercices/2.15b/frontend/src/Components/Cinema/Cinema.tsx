import Movie from "../Movie/Movie";
import "./Cinema.css";

const Cinema = ({name,movies}: CinemaProps) => {
    return (
        <div>
            <h2>{name}</h2>
            <ul>
                {movies.map((movie) => (<Movie title={movie.title} director={movie.title} description={movie.description}/>)
                )}
            </ul>
        </div>
    );
};

interface CinemaProps {
    name: string;
    movies:MovieInterface[]
}

interface MovieInterface {
    title: string;
    director: string;
    description:string;
}

export default Cinema;


import Movie from "./Components/Movie/Movie";

interface Movie {
    id:number
    title:string,
    director:string,
    duration:number,
    imageUrl?:string,
    description?:string,
    budget?:number
}

type NewMovie = Omit<Movie,"id">

interface MovieListContext {
    movies: Movie[],
    setMovies: (movies:Movie[]) => void,
    addMovie : (newMovie:NewMovie) => void
    deleteMovie : (id:number) => void
}

export type {Movie,NewMovie,MovieListContext};
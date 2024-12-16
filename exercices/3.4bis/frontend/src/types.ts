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

type UpdatedMovie = Partial<Movie>

interface MovieListContext {
    movies: Movie[],
    setMovies: (movies:Movie[]) => void,
    addMovie : (newMovie:NewMovie) => void
    deleteMovie : (id:number) => void,
    updateMovie : (id:number,updatedMovie:UpdatedMovie) => void
    theme:string,
    switchTheme: () => void;
    registerUser: (newUser: User) => Promise<void>;
    loginUser: (user: User) => Promise<void>;
    authenticatedUser : MaybeAuthenticatedUser
}

interface User {
    username: string;
    password: string;
  }  

interface AuthenticatedUser {
    username: string;
    token: string;
  }
  
  type MaybeAuthenticatedUser = AuthenticatedUser | undefined;

export type {Movie,NewMovie,UpdatedMovie,MovieListContext,User,AuthenticatedUser,
    MaybeAuthenticatedUser};
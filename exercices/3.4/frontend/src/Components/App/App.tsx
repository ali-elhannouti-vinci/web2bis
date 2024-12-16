import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { AuthenticatedUser, MaybeAuthenticatedUser, Movie, MovieListContext, NewMovie, User } from "../../types";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { clearAuthenticatedUser, getAuthenticatedUser, storeAuthenticatedUser } from "../../utils/session";

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

const App = () => {
  const themeKey = "theme";

  const [movies, setMovies] = useState(defaultMovies);
  const [theme,setTheme] = useState(localStorage.getItem(themeKey) ?? "light")
  const [authenticatedUser, setAuthenticatedUser] =
    useState<MaybeAuthenticatedUser>(undefined);

  async function getAllMovies() {
    try {
      const response = await fetch("/api/films");

      if (!response.ok) {
        throw new Error(response.statusText+" "+response.status);
      }

      const films = await response.json();
      return films;
    } catch (error) {
      console.error("Error getAllMovies : "+error)
      throw error;
    }
  }

  const fetchMovies = async () => {
    try {
    const fetchedMovies = await getAllMovies();
    setMovies(fetchedMovies);
    console.log("fetched movies : "+fetchedMovies);
    
    } catch (error) {
      console.error("fetchMovies::error: "+error)
    }
  };

  async function addMovie(newMovie : NewMovie) {
    try {
      console.log("New movie : "+ newMovie);
      
      const options = {
        method:"POST",
        body: JSON.stringify(newMovie),
        headers:{
          "Content-type" : "application/json"
        }
      }

      const serverResponse = await fetch("/api/films",options)
      if (!serverResponse.ok) {
        throw new Error(serverResponse.statusText+" "+serverResponse.status);
      }
      fetchMovies();
    } catch (error) {
      console.error("Error PostMovie : "+error)
      throw error;
    }
  }

  async function deleteMovie(id:number) {
    try {
        const options = {
            method:"DELETE"
        }
        const response = await fetch(`/api/films/${id}`,options)

        if (!response.ok) {
            throw new Error(response.statusText +" "+response.status);
        }
        fetchMovies();
    } catch (error) {
        console.error("deleteMovie error : "+error)
        throw error;
    }
}

  

  function switchTheme() {
    const localStorageTheme = localStorage.getItem(themeKey);
    if (localStorageTheme == "dark"){
      localStorage.setItem(themeKey,"light")
      setTheme("light")
    }else if (localStorageTheme == "light") {
      localStorage.setItem(themeKey,"dark")
      setTheme("dark")
    }
  }

  const registerUser = async (newUser : User) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/register", options);

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const createdUser: AuthenticatedUser = await response.json();

      setAuthenticatedUser(createdUser);
      storeAuthenticatedUser(createdUser);
      console.log("createdUser: ", createdUser);
    } catch (err) {
      console.error("registerUser::error: ", err);
      throw err;
    }
  }

  const loginUser = async (user: User) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/login", options);

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const authenticatedUser: AuthenticatedUser = await response.json();
      console.log("authenticatedUser: ", authenticatedUser);

      setAuthenticatedUser(authenticatedUser);
      storeAuthenticatedUser(authenticatedUser);
    } catch (err) {
      console.error("loginUser::error: ", err);
      throw err;
    }
  };

  const clearUser = () => {
    clearAuthenticatedUser();
    setAuthenticatedUser(undefined);
  }

  const fullMovieListContext: MovieListContext = {
    movies,
    setMovies,
    addMovie,
    deleteMovie,
    theme,
    switchTheme,
    registerUser,
    loginUser,
    authenticatedUser
  };

 

  

useEffect(() => {
  const localTheme = localStorage.getItem(themeKey);
  if (!localTheme) {
    localStorage.setItem(themeKey,"light");
  }
  const authenticatedUser = getAuthenticatedUser();
    if (authenticatedUser) {
      setAuthenticatedUser(authenticatedUser);
    }
  fetchMovies();
},[])



  return (
    <div>
      <NavBar theme={theme} switchTheme={switchTheme} authenticatedUser={authenticatedUser} clearUser={clearUser}/>
      <Outlet context={fullMovieListContext} />
      <Footer theme={theme}/>
    </div>
  );
};

export default
  App;

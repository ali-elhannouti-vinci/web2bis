import { Film,NewFilm } from "../types";
import path from "node:path";
import { parse, serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms: Film[] = [
    {
      id: 1,
      title: "Avengers: Infinity War",
      director: "Anthony et Joe Russo",
      duration: 149,
      budget: 300000000,
      description: "Les Avengers s'unissent pour affronter Thanos.",
      imageUrl: "https://www.contrepoints.org/wp-content/uploads/2018/05/avengers_infinity_war-1200x800.jpg"
    },
    {
      id: 2,
      title: "Oppenheimer",
      director: "Christopher Nolan",
      duration: 180,
      budget: 100000000,
      description: "L'histoire de l'inventeur de la bombe atomique.",
      imageUrl: "https://fr.web.img5.acsta.net/pictures/23/05/26/16/52/2793170.jpg"
    },
    {
      id: 3,
      title: "Django Unchained",
      director: "Quentin Tarantino",
      duration: 165,
      budget: 100000000,
      description: "Un esclave libéré cherche à sauver sa femme.",
      imageUrl: "https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_.jpg"
    }
  ];

function readAllFilms(minimumDuration:number)  {
  const films = parse(jsonDbPath, defaultFilms);
  if (!minimumDuration) {
    return films;
  }
  const minDur = Number(minimumDuration);
  const filteredFilms = films.filter((film) => film.duration >= minDur);
  return filteredFilms;
}

function readOneFilmById(id:number) :Film|undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const foundFilm = films.find((film) => film.id === id);
  if (!foundFilm) {
    return undefined;
  }
  return foundFilm;

}

function addOneFilm(newFilm:NewFilm) :Film | undefined {
  
  const films = parse(jsonDbPath, defaultFilms);

  if (films.find((film) => film.title === newFilm.title && film.director === newFilm.director)) {
    return undefined;
  }

  const nextId =
  films.reduce((maxId, drink) => (drink.id > maxId ? drink.id : maxId), 0) +
  1;

  const addedFilm:Film = {
    id:nextId,
    ...newFilm
  };

films.push(addedFilm);
serialize(jsonDbPath,films);
  return addedFilm;  
}

function deleteOneFilm(id:number) : Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const foundFilmIndex = films.findIndex((film) => film.id === id);
  if (foundFilmIndex === -1) {
    return undefined;
  }
  const deletedElements = films.splice(foundFilmIndex,1);
  serialize(jsonDbPath,films);
  return deletedElements[0];
}

function updateOneFilmById(id:number,updatedFilm:Partial<NewFilm>) : Film {
  const films = parse(jsonDbPath, defaultFilms);
  const foundFilm = films.find((film) => film.id === id);  
  if (!foundFilm) {
    throw 404;
  }

  if ((!updatedFilm.title && !updatedFilm.director) && films.find((film) => film.title === updatedFilm.title && film.director === updatedFilm.director)) {
    throw 409;
  }

  if (updatedFilm.title) {
    foundFilm.title = updatedFilm.title;
  }
  if (updatedFilm.director) {
    foundFilm.director = updatedFilm.director;
  }
  if (updatedFilm.duration) {
    foundFilm.duration = updatedFilm.duration;
  }
  if (updatedFilm.budget) {
    foundFilm.budget = updatedFilm.budget;
  }
  if (updatedFilm.description) {
    foundFilm.description = updatedFilm.description;
  }
  if (updatedFilm.imageUrl) {
    foundFilm.imageUrl = updatedFilm.imageUrl;
  }

  serialize(jsonDbPath,films);

  return foundFilm;
}

function addOrUpdateIfExists(id:number,body:NewFilm) : Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);

  const indexOfFilmToUpdate = films.findIndex((film) => film.id === id);
  // Deal with the film creation if it does not exist
  if (indexOfFilmToUpdate < 0) {
    const newFilm = body;

    if (films.find((film) => film.title === newFilm.title && film.director === newFilm.director)) {
      return undefined;
    }

    const nextId =
      films.reduce((acc, film) => (film.id > acc ? film.id : acc), 0) + 1;

    const addedFilm = { id: nextId, ...newFilm } as Film;

    films.push(addedFilm);

    serialize(jsonDbPath, films);

    return addedFilm;
  }

  // Update the film
  const updatedFilm = { ...films[indexOfFilmToUpdate], ...body } as Film;

  films[indexOfFilmToUpdate] = updatedFilm;

  serialize(jsonDbPath, films);

  return updatedFilm;
}

export {
  readAllFilms,
  readOneFilmById,
  addOneFilm,
  deleteOneFilm,
  updateOneFilmById,
  addOrUpdateIfExists
};


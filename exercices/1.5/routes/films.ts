import { Router } from "express";
import { Film,NewFilm } from "../types";

const films: Film[] = [
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

const router = Router();


router.get("/error", (_req, _res, _next) => {
  throw new Error("This is an error");
  // equivalent of next(new Error("This is an error"));
});

router.get("/", (_req, res) => {
  if (!_req.query["minimum-duration"]) {
    return res.json(films);
  }
  const minDur = Number(_req.query["minimum-duration"]);
  const filteredFilms = films.filter((film) => film.duration >= minDur);
  return res.json(filteredFilms);
});

router.get("/:id",(req,res) => {
  const id = Number(req.params.id);
  const foundFilm = films.find((film) => film.id === id);
  if (!foundFilm) {
    return res.sendStatus(404);
  }
  return res.json(foundFilm);
});

router.post("/",(_req,res)  => {
  const body : unknown = _req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    !body.title.trim() ||
    !body.director.trim() ||
    body.duration <= 0 ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
  ){
      return res.sendStatus(400);
    }

    if (films.find((film) => film.title === body.title)) {
      return res.sendStatus(409);
    }

    const newFilm = body as NewFilm;

    const nextId =
    films.reduce((maxId, drink) => (drink.id > maxId ? drink.id : maxId), 0) +
    1;

    const addedFilm:Film = {
      id:nextId,
      ...newFilm
    };

  films.push(addedFilm);

  return res.json(newFilm);
});



export default router;

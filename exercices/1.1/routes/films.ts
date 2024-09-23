import { Router } from "express";
import { Film } from "../types";

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
  return res.json(films);
});

export default router;

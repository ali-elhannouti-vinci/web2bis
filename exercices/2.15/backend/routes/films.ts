import { Router } from "express";
import { Film, NewFilm } from "../types";
import { addOneFilm, addOrUpdateIfExists, deleteOneFilm, readAllFilms, readOneFilmById, updateOneFilmById } from "../services/films";

const router = Router();

router.get("/error", () => {
  throw new Error("This is an error");
  // equivalent of next(new Error("This is an error"));
});

router.get("/", (req, res) => { 
  const minDur = Number(req.query["minimum-duration"]);
  return res.json(readAllFilms(minDur));
});

router.get("/:id",(req,res) => {
  const id = Number(req.params.id);
  const foundFilm = readOneFilmById(id);
  if (!foundFilm) {
    return res.sendStatus(404);
  }
  return res.json(foundFilm);
});

router.post("/",(req,res)  => {
  const body : unknown = req.body;
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

    const newFilm = body as NewFilm;

    const addedFilm:Film|undefined = addOneFilm(newFilm);

    if (!addedFilm) {
      return res.json(409);
    }

  return res.json(addOneFilm);
});

router.delete("/:id",(req,res) => {
  const id = Number(req.params.id);
  const deletedFilm = deleteOneFilm(id);
  if (!deletedFilm) {
    return res.sendStatus(404);
  }
  return res.json(deletedFilm);
});

router.patch("/:id",(req,res) => {
  const body:unknown = req.body;  

  if (
    !body ||
    typeof body !== "object" ||
    ("title" in body && 
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("director" in body && 
      (typeof body.director !== "string" || !body.director.trim())) ||
    ("duration" in body && 
      (typeof body.duration !== "number" || body.duration <= 0)) ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget <= 0)) ||
    ("description" in body && 
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body && 
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
  ) {
    return res.sendStatus(400);
  }

  const id = Number(req.params.id);

  const {title,director,duration,budget,description,imageUrl}:Partial<NewFilm> = body;

  let foundFilm:Film|undefined = undefined;
  try {
    foundFilm = updateOneFilmById(id,{title,director,duration,budget,description,imageUrl});
  } catch (error) {
    return res.sendStatus(Number(error));
  }

  return res.json(foundFilm);
  
});

// Update a film only if all properties are given or create it if it does not exist and the id is not existent
router.put("/:id", (req, res) => {
  const body: unknown = req.body;

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
  ) {
    return res.sendStatus(400);
  }

  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const newOrUpdatedFilm = addOrUpdateIfExists(id,body as NewFilm);
  if (!newOrUpdatedFilm) {
    return res.sendStatus(409);
  }

  return res.json(newOrUpdatedFilm);
});


export default router;

import path from "node:path";
import { parse, serialize } from "../utils/json";
import { Comment, Film, NewComment } from "../types";
const jsonDbPathComments = path.join(__dirname, "/../data/comments.json");
const jsonDbPathFilms = path.join(__dirname, "/../data/films.json");

const defaultComments: Comment[] = [
  {
    id: 1,
    username: "admin",
    filmId: 1,
    comment: "Un film incroyable, très bien réalisé.",
  },
  {
    id: 2,
    username: "admin",
    filmId: 2,
    comment: "Une histoire captivante, mais un peu lente par moments.",
  },
  {
    id: 3,
    username: "admin",
    filmId: 3,
    comment:
      "Des performances d'acteurs exceptionnelles, à revoir absolument !",
  },
  {
    id: 4,
    username: "manager",
    filmId: 1,
    comment: "Un chef-d'œuvre visuel, chaque scène est magnifique.",
  },
  {
    id: 5,
    username: "manager",
    filmId: 2,
    comment: "Un scénario bien pensé avec des rebondissements inattendus.",
  },
  {
    id: 6,
    username: "manager",
    filmId: 3,
    comment: "Une bande sonore incroyable qui amplifie l'émotion du film.",
  },
];

function readAllComments(filmId: number) {
  const comments = parse(jsonDbPathComments, defaultComments);
  if (!filmId) {
    return comments;
  }
  const filteredComments = comments.filter(
    (comment) => comment.filmId === filmId
  );
  return filteredComments;
}

function createOneComment(newComment: NewComment) : Comment {
  const comments = parse(jsonDbPathComments, defaultComments);

  const previousCommentIndex = comments.findIndex((comment) => comment.username === newComment.username && comment.filmId === newComment.filmId);
  if (previousCommentIndex !== -1) {
    throw 409;
  }
  

  const films : Film[] = parse(jsonDbPathFilms,[]);
  const foundFilmIndex = films.findIndex((film) => film.id === newComment.filmId);
  if (foundFilmIndex === -1) {
    throw 404;
  }

  const nextId: number = comments.reduce((maxValue, comment2) => {
    if (comment2.id > maxValue) {
      return comment2.id;
    }
    return maxValue;
  }, 0) + 1;

  const createdComment = {
    id: nextId,
    ...newComment,
  };

  comments.push(createdComment);
  serialize(jsonDbPathComments, comments);
  return createdComment;
}

function deleteOneComment(filmId: number,username:string) : Comment | undefined {
  const comments = parse(jsonDbPathComments, defaultComments);
  const foundFilmCommentIndex = comments.findIndex((comment) => comment.filmId === filmId && comment.username === username);
  if (foundFilmCommentIndex === -1) {
    throw 404;
  }
  const deletedComment = comments.splice(foundFilmCommentIndex,1);
  serialize(jsonDbPathComments,comments);
  return deletedComment[0];
}

export { readAllComments, createOneComment, deleteOneComment };

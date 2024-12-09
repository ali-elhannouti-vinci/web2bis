import path from "node:path";
import { parse, serialize } from "../utils/json";
import { Comment, NewComment } from "../types";
const jsonDbPath = path.join(__dirname, "/../data/comments.json");

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
];

function readAllComments(filmId: number) {
  const comments = parse(jsonDbPath, defaultComments);
  if (!filmId) {
    return comments;
  }
  const filteredComments = comments.filter(
    (comment) => comment.filmId === filmId
  );
  return filteredComments;
}

function createOneComment(newComment: NewComment) : Comment {
  const comments = parse(jsonDbPath, defaultComments);

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
  serialize(jsonDbPath, comments);
  return createdComment;
}

function deleteOneComment(id: number,username:string) : Comment | undefined {
  const comments = parse(jsonDbPath, defaultComments);
  const foundCommentIndex = comments.findIndex((comment) => comment.id === id);
  if (foundCommentIndex === -1) {
    throw 404;
  }
  console.log(foundCommentIndex);
  if (comments[foundCommentIndex].username !== username) {
    throw 403;
  }
  const deletedComment = comments.splice(foundCommentIndex,1);
  serialize(jsonDbPath,comments);
  return deletedComment[0];
}

export { readAllComments, createOneComment, deleteOneComment };

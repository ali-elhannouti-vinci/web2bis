import { Router } from "express";
import { authorize } from "../utils/auths";
import { createOneComment, deleteOneComment, readAllComments } from "../services/comments";
import { NewComment } from "../types";

const router = Router();

router.get("/", authorize,(req, res) => { 
    const filmId = Number(req.query["filmId"]);
    const potentialyFilteredComments = readAllComments(filmId);
    return res.json(potentialyFilteredComments);
  });

router.post("/",authorize,(req,res) => {
    const body : unknown = req.body;
    if(!body
        || typeof body !== "object"
        || !("filmId" in body)
        || !("comment" in body)
        || typeof body.filmId !== "number"
        || typeof body.comment !== "string"
        || body.filmId < 0
        || isNaN(body.filmId)
        || !body.comment.trim()
        || !("user" in req)
        || typeof req.user !== "object"
        || !req.user
        || !("username" in req.user)
        || typeof req.user.username !== "string"
        || !req.user.username.trim()
    ){
        return res.sendStatus(400);
    }

    const newComment = {
        filmId : body.filmId,
        username : req.user.username,
        comment : body.comment
    } as NewComment;
    const createdComment = createOneComment(newComment);
    return res.json(createdComment);
});

router.delete("/:id",authorize,(req,res) => {
    const commentId = Number(req.params.id);
    if(isNaN(commentId) 
    || !("user" in req)
    || typeof req.user !== "object"
    || !req.user
    || !("username" in req.user)
    || typeof req.user.username !== "string"
    || !req.user.username.trim())
{
    return res.sendStatus(400);
}
const username = req.user.username;
try {
    const deletedComment = deleteOneComment(commentId,username);
    return res.json(deletedComment);
} catch (error) {
    return res.sendStatus(Number(error));
}
});

export default router;

import express from "express";

import filmsRouter from "./routes/films";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let getCounter:number = 0;
app.use((_req,_res,next)=> {
    console.log(`Request received: ${_req.method} ${_req.url}`);
    if (_req.method === "GET") {
        getCounter++;
        console.log(
            `GET counter : ${getCounter}`
        );
    }
    next();
});

app.use("/films",filmsRouter);


export default app;

import express from "express";
import morgan from "morgan";
import { fileURLToPath } from 'url';
import { URL } from 'url';
import * as routes from "./routes.js";

export const app = express();

app
    .use(morgan("dev"))
    .set("views", fileURLToPath(new URL("./views", import.meta.url)))
    .set("view engine", "ejs")
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .get("/", routes.index)
    .use((req, res, next) => next(createError(404)))
    .use((err, req, res, next) => {
        res.status(err.status || 500).send(`<h1>${err.message || "Internal error"}</h1>`);
    });
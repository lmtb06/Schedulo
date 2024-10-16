import express from "express";
import morgan from "morgan";
import { fileURLToPath } from 'url';
import { URL } from 'url';
import * as routes from "./routes.js";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import dotenv from "dotenv";

dotenv.config();

export const app = express();
const publicPath = fileURLToPath(new URL("./public", import.meta.url));

app
    .use(morgan("dev"))
    .use(express.static(publicPath))
    .set("views", fileURLToPath(new URL("./views", import.meta.url)))
    .set("view engine", "ejs")
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cookieParser())
    .use(routes.authenticate)
    .get("/", routes.index)
    .get("/account", routes.getAccountCreationPage)
    .post("/account/new", routes.createAccount)
    .get("/login", routes.getConnexion)
    .post("/login", routes.login)
    .get("/logout", routes.logout)
    .use((req, res, next) => next(createError(404)))
    .use((err, req, res, next) => {
        res.status(err.status || 500).send(`<h1>${err.message || "Internal error"}</h1>`);
    });
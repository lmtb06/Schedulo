import cookieParser from "cookie-parser";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
import path from "node:path";
import { MainAPIRouter } from "./main-api.router.js";
import { MainWebRouter } from "./main-web.router.js";
import { ApiErrorHandler } from "./middlewares/api-error-handler.js";

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
// const __node_modules_dir = path.join(__dirname, "node_modules");
// const __axios_dir = path.join(__nodeModulesDir, "axios/dist/esm");
// const __fullcalendar_dir = path.join(__publicDir, "fullcalendar");
const __views_dir = path.join(__dirname, "../frontend/views");
const __layout_file = "template";
// const __server_dir = __dirname;
// const __client_dir = path.join(__dirname, "client");
const __public_dir = path.join(__dirname, "./public");
/**
 * @typedef {import('express').Express} Express Express
 * @typedef {import('./logger.js').Logger} Logger de l'application
 * @typedef {import('./shared/dao.factory.js').DAOFactory} DAOFactory Factory pour les DAOs
 * @typedef {import('./shared/service.factory.js').ServiceFactory} ServiceFactory Factory pour les services
 * @typedef {import('../factories/renderer.factory').RendererFactory} RendererFactory Factory pour les renderers
 */

/**
 * Builder pour l'application Express.
 */
class ExpressAppBuilder {
    /**
     * @type {Express} Application Express
     * @private
     */
    #expressApp;
    /**
     * @type {Logger} Logger de l'application
     * @private
     */
    #logger;
    /**
     * @type {DAOFactory} Factory pour les DAOs
     * @private
     */
    #daoFactory;
    /**
     * @type {ServiceFactory} Factory pour les services
     * @private
     */
    #serviceFactory;

    /**
     * @type {RendererFactory} Factory pour les renderers
     * @private
     */
    #rendererFactory;

    /**
     * Crée une nouvelle instance d'ExpressAppBuilder.
     * @param {Logger} logger - Le logger à utiliser dans l'application
     * @param {DAOFactory} daoFactory - Factory pour les DAOs
     * @param {ServiceFactory} serviceFactory - Factory pour les services
     * @param {RendererFactory} rendererFactory - Factory pour les renderers
     */
    constructor(logger, daoFactory, serviceFactory, rendererFactory) {
        this.#logger = logger;
        this.#daoFactory = daoFactory;
        this.#serviceFactory = serviceFactory;
        this.#rendererFactory = rendererFactory;
        this.#expressApp = express();
    }

    /**
     * Initialise la configuration de base de l'application.
     * @returns {ExpressAppBuilder} L'instance courante pour le chaînage
     */
    setupConfig() {
        this.#expressApp.set("view engine", "ejs");
        this.#expressApp.use(expressLayouts);
        this.#expressApp.set("views", __views_dir);
        this.#expressApp.set("layout", __layout_file);
        this.#expressApp.set("layout extractScripts", true);
        this.#expressApp.set("layout extractStyles", true);
        return this;
    }

    /**
     * Configure les middlewares de l'application.
     * @returns {ExpressAppBuilder} L'instance courante pour le chaînage
     */
    setupMiddlewares() {
        this.#expressApp.use(
            morgan("dev", {
                stream: {
                    write: (message) => this.#logger.http(message.trim()),
                },
            })
        );
        this.#expressApp.use(express.json());
        this.#expressApp.use(express.urlencoded({ extended: false }));
        this.#expressApp.use(cookieParser());
        this.#expressApp.use((request, response, next) => {
            response.setTimeout(5000, () => {
                this.#logger.debug("Timeout de la réponse");
                response.status(408).send("Timeout de la réponse");
            });
            next();
        });

        return this;
    }

    setupStaticFiles() {
        this.#expressApp.use(express.static(__public_dir));
        return this;
    }

    /**
     * Configure les routes de l'application.
     * @returns {ExpressAppBuilder} L'instance courante pour le chaînage
     */
    setupRoutes() {
        const apiRouter = new MainAPIRouter(
            this.#serviceFactory,
            this.#rendererFactory
        ).getRouter();
        const webRouter = new MainWebRouter(
            this.#serviceFactory,
            this.#rendererFactory
        ).getRouter();

        this.#expressApp.use("/api", apiRouter).use("/", webRouter);
        return this;
    }

    /**
     * Configure les gestionnaires d'erreurs de l'application.
     * @returns {ExpressAppBuilder} L'instance courante pour le chaînage
     */
    setupErrorHandlers() {
        const apiErrorHandler = new ApiErrorHandler({
            // environment: Environnement.DEVELOPMENT,
        });
        const webErrorHandler = {
            handleError: (error, request, res, next) => {
                this.#logger.error("Erreur lors de la requête %s", error);
                res.status(500).send("Erreur interne du serveur");
            },
        };
        this.#expressApp.use("/api", (error, request, res, next) => {
            apiErrorHandler.handle(error, request, res, next);
        });
        this.#expressApp.use((error, request, res, next) => {
            webErrorHandler.handleError(error, request, res, next);
        });
        return this;
    }

    /**
     * Construit l'application Express.
     * @returns {Express} L'application Express
     */
    build() {
        return this.#expressApp;
    }

    /**
     * Recommence la construction de l'application Express.
     * @returns {ExpressAppBuilder} L'instance courante pour le chaînage
     */
    reset() {
        this.#expressApp = express();
        return this;
    }
}

export { ExpressAppBuilder };

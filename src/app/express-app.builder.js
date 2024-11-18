import cookieParser from "cookie-parser";
import express from "express";
import expressLayouts from "express-ejs-layouts";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MainAPIRouter } from "../routes/main-api.router.js";
import { MainWebRouter } from "../routes/main-web.router.js";

const __filename = fileURLToPath(import.meta.resolve("./"));
const __dirname = path.dirname(__filename);
/**
 * @typedef {import('express').Express} Express Express
 * @typedef {import('../logger').Logger} Logger de l'application
 * @typedef {import('../shared/dao.factory.js').DAOFactory} DAOFactory Factory pour les DAOs
 * @typedef {import('../shared/service.factory.js').ServiceFactory} ServiceFactory Factory pour les services
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
        this.#expressApp
            .set("view engine", "ejs")
            .set("views", path.join(__dirname, "views"))
            .set("layout", "template")
            .use(expressLayouts)
            .use(express.static(path.join(__dirname, "public")))
            .use(
                "/fullcalendar",
                express.static(
                    path.join(__dirname, "node_modules/@fullcalendar")
                )
            );
        return this;
    }

    /**
     * Configure les middlewares de l'application.
     * @returns {ExpressAppBuilder} L'instance courante pour le chaînage
     */
    setupMiddlewares() {
        this.#expressApp
            .use(
                morgan("dev", {
                    stream: {
                        write: (message) => this.#logger.http(message.trim()),
                    },
                })
            )
            .use(express.json())
            .use(express.urlencoded({ extended: false }))
            .use(cookieParser());
        return this;
    }

    /**
     * Configure les routes de l'application.
     * @returns {ExpressAppBuilder} L'instance courante pour le chaînage
     */
    setupRoutes() {
        this.#expressApp
            .use(
                "/api",
                new MainAPIRouter(
                    this.#serviceFactory,
                    this.#rendererFactory
                ).getRouter()
            )
            .use(
                "/",
                new MainWebRouter(
                    this.#serviceFactory,
                    this.#rendererFactory
                ).getRouter()
            );
        return this;
    }

    /**
     * Configure les gestionnaires d'erreurs de l'application.
     * @returns {ExpressAppBuilder} L'instance courante pour le chaînage
     */
    setupErrorHandlers() {
        // this.#expressApp.use(errorLogger({ logger: this.#logger }));
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

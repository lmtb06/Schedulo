import { Logger } from "../logger.js";
import { DAOFactory } from "../shared/dao.factory.js";
import { RendererFactory } from "../shared/renderer.factory.js";
import { ServiceFactory } from "../shared/service.factory.js";
import { removeValues } from "../utils/objects-utils.js";
import { ExpressAppBuilder } from "./express-app.builder.js";

/**
 * @typedef {import('express').Express} Express Express
 * @typedef {import('./express-app.builder').ExpressAppBuilder} ExpressAppBuilder Builder pour l'application Express
 * @typedef {import('../logger').Logger} Logger de l'application
 * @typedef {import('../shared/dao.factory.js').DAOFactory} DAOFactory Factory pour les DAOs
 * @typedef {import('../shared/service.factory.js').ServiceFactory} ServiceFactory Factory pour les services
 * @typedef {import('../factories/renderer.factory').RendererFactory} RendererFactory Factory pour les renderers
 * @typedef {import('../validators/validator').Validator} Validator Validateur
 * @typedef {import('../validators/schemas/global-config.schema').globalConfigSchema} globalConfigSchema Schéma de validation pour la configuration globale
 * @typedef {object} ApplicationConfig Configuration de l'application
 * @property {object} database - Configuration de la base de données
 * @property {string} database.uri - URI de connexion à la base de données
 * @property {string} database.name - Nom de la base de données
 * @property {string} database.host - Hôte de la base de données
 * @property {number} database.port - Port de la base de données
 * @property {string} database.user - Utilisateur de la base de données
 * @property {string} database.password - Mot de passe de la base de données
 * @property {object} server - Configuration du serveur
 * @property {number} server.port - Port du serveur
 * @property {string} server.url - URL du serveur
 * @property {string} server.env - Environnement de l'application
 */

/**
 * Classe de l'application
 */
class Application {
    /**
     * @type {Express} Application Express
     */
    #expressApp;
    /**
     * @type {Logger} Logger de l'application
     */
    #logger;
    /**
     * @type {DAOFactory} Factory pour les DAOs
     */
    #daoFactory;
    /**
     * @type {ServiceFactory} Factory pour les services
     */
    #serviceFactory;
    /**
     * @type {RendererFactory} Factory pour les renderers
     */
    #rendererFactory;

    /**
     * @type {ApplicationConfig} Configuration de l'application
     */
    #config;

    /**
     * @type {boolean} Indique si l'application est configurée
     * @private
     */
    #isConfigured = false;

    /**
     * @type {boolean} Indique si l'application est démarrée
     * @private
     */
    #isStarted = false;

    /**
     * @type {Application} Instance de l'application
     * @private
     */
    static #instance = null;

    /**
     * Crée une nouvelle instance d'Application.
     * @throws {Error} Si l'instance de l'application existe déjà
     * @private
     */
    constructor() {
        if (Application.#instance) {
            throw new Error("Application est un singleton");
        }
    }

    /**
     * Récupère l'instance de l'application.
     * @returns {Application} L'instance de l'application
     */
    static getInstance() {
        if (!Application.#instance) {
            Application.#instance = new Application();
        }
        return Application.#instance;
    }

    /**
     * Configure le logger de l'application.
     * @private
     */
    async #setupLogger() {
        this.#logger = new Logger();
    }

    /**
     * Configure la factory pour les DAOs.
     * @private
     */
    async #setupDAOFactory() {
        if (!this.#logger || !this.#config.database) {
            throw new Error("L'application n'est pas correctement configurée");
        }
        const eventCallbacks = new Map([
            [
                "connection",
                () => {
                    this.#logger.debug("Connexion à la base de données...");
                },
            ],
            [
                "connected",
                () => {
                    this.#logger.debug(
                        "Connexion à la base de données établie"
                    );
                },
            ],
            [
                "error",
                (error) => {
                    this.#logger.error("Erreur de la base de données", error);
                },
            ],
            [
                "disconnecting",
                () => this.#logger.debug("Déconnexion de base de données"),
            ],
            [
                "disconnected",
                () => {
                    this.#logger.debug("Base de données déconnectée");
                },
            ],
            [
                "close",
                () =>
                    this.#logger.debug("Connexion à la base de données fermée"),
            ],
        ]);
        this.#daoFactory = DAOFactory.getDAOFactory(
            1,
            this.#config.database,
            eventCallbacks
        );
    }

    /**
     * Configure la factory pour les services.
     * @private
     */
    async #setupServiceFactory() {
        if (!this.#logger || !this.#daoFactory) {
            throw new Error("L'application n'est pas correctement configurée");
        }
        this.#serviceFactory = ServiceFactory.getServiceFactory(
            1,
            this.#daoFactory
        );
    }

    /**
     * Configure la factory pour les renderers.
     * @private
     */
    async #setupRendererFactory() {
        this.#rendererFactory = new RendererFactory();
    }

    /**
     * Configure l'application Express.
     * @private
     */
    async #setupExpressApp() {
        if (
            !this.#logger ||
            !this.#daoFactory ||
            !this.#serviceFactory ||
            !this.#rendererFactory
        ) {
            throw new Error("L'application n'est pas correctement configurée");
        }

        this.#expressApp = new ExpressAppBuilder(
            this.#logger,
            this.#daoFactory,
            this.#serviceFactory,
            this.#rendererFactory
        )
            .setupConfig()
            .setupMiddlewares()
            .setupRoutes()
            .setupErrorHandlers()
            .build();
    }

    /**
     * Vérifie si l'application est configurée.
     * @throws {Error} Si l'application n'est pas configurée
     * @private
     */
    #ensureConfigured() {
        if (!this.#isConfigured) {
            throw new Error("L'application n'est pas configurée");
        }
    }

    #ensureStarted() {
        if (!this.#isStarted) {
            throw new Error("L'application n'est pas démarrée");
        }
    }

    /**
     * Configure l'application.
     * @param {object} config - Configuration de l'application
     * @throws {Error} Si la config n'est pas valide
     */
    async setup(config) {
        this.#config = config;
        this.#config.database = removeValues(this.#config.database, [
            undefined,
        ]);
        this.#config.server = removeValues(this.#config.server, [undefined]);
        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };
        // Validator.validate(this.#config, globalConfigSchema, options);
        await this.#setupLogger();
        this.#logger.info("Configuration de l'application", config);
        await this.#setupDAOFactory();
        await this.#setupServiceFactory();
        await this.#setupRendererFactory();
        await this.#setupExpressApp();
        this.#isConfigured = true;
    }

    /**
     * Démarre l'application.
     */
    async start() {
        this.#ensureConfigured();
        this.#logger.info("Démarrage de l'application");
        await this.#serviceFactory.start();
        this.#isStarted = true;
        this.#logger.info("Application démarrée");
    }

    /**
     * Arrête l'application.
     */
    async stop() {
        this.#ensureStarted();
        // Arrêt séquentiel des composants
        this.#logger.info("Arrêt de l'application...");

        await this.#serviceFactory.stop();

        this.#isStarted = false;

        this.#logger.info("Application arrêtée");
    }

    /**
     * Récupère l'application Express.
     * @throws {Error} Si l'application n'est pas configurée
     * @returns {Express} L'application Express
     */
    getExpressApp() {
        this.#ensureStarted();
        return this.#expressApp;
    }

    /**
     * Récupère le logger de l'application.
     * @throws {Error} Si l'application n'est pas configurée
     * @returns {Logger} Le logger de l'application
     */
    getLogger() {
        this.#ensureStarted();
        return this.#logger;
    }

    /**
     * Récupère la factory pour les DAOs.
     * @throws {Error} Si l'application n'est pas configurée
     * @returns {DAOFactory} La factory pour les DAOs
     */
    getDAOFactory() {
        this.#ensureStarted();
        return this.#daoFactory;
    }

    /**
     * Récupère la factory pour les services.
     * @throws {Error} Si l'application n'est pas configurée
     * @returns {ServiceFactory} La factory pour les services
     */
    getServiceFactory() {
        this.#ensureStarted();
        return this.#serviceFactory;
    }

    /**
     * Récupère la factory pour les renderers.
     * @throws {Error} Si l'application n'est pas configurée
     * @returns {RendererFactory} La factory pour les renderers
     */
    getRendererFactory() {
        this.#ensureStarted();
        return this.#rendererFactory;
    }
}

export { Application };

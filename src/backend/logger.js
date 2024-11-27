import { addColors, createLogger, format, transports } from "winston";
import { Environnement } from "./utils/enums.js";

/**
 * @class Logger
 * @description Classe de logging utilisant Winston avec le pattern Singleton.
 * Gère les logs avec différents niveaux et formats pour la console et les fichiers.
 */
class Logger {
    /** @private */
    static #instance = null;

    /** @private */
    #logger;

    /**
     * @class
     * @description Crée ou retourne l'instance unique du Logger
     * @throws {Error} Si une instance existe déjà
     * @private
     */
    constructor() {
        if (Logger.#instance) {
            throw new Error("Logger est un singleton");
        }

        this.#initializeColors();
        this.#logger = this.#createLoggerInstance();
        Logger.#instance = this;
    }

    /**
     * @private
     * @description Initialise les couleurs pour les différents niveaux de log
     */
    #initializeColors() {
        const colors = {
            error: "red",
            warn: "yellow",
            info: "green",
            http: "magenta",
            debug: "blue",
        };
        addColors(colors);
    }

    /**
     * @private
     * @description Crée le format personnalisé pour les logs console
     * @returns {import('winston').Format} Format Winston pour la console
     */
    #createConsoleFormat() {
        const { combine, timestamp, printf, colorize, errors, splat, align } =
            format;
        return combine(
            timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            colorize(),
            errors({ stack: true }),
            splat(),
            printf(({ timestamp, level, message, stack }) =>
                stack
                    ? `[${timestamp}] ${level}: ${message} - ${stack}`
                    : `[${timestamp}] ${level}: ${message}`
            ),
            align()
        );
    }

    /**
     * @private
     * @description Crée le format personnalisé pour les logs fichiers
     * @returns {import('winston').Format} Format Winston pour les fichiers
     */
    #createFileFormat() {
        const { combine, timestamp, errors, splat, json } = format;
        return combine(
            timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
            errors({ stack: true }),
            splat(),
            json()
        );
    }

    /**
     * @private
     * @description Crée et configure l'instance du logger Winston
     * @returns {import('winston').Logger} Instance configurée du logger Winston
     */
    #createLoggerInstance() {
        const { combine, timestamp, errors, splat } = format;

        return createLogger({
            level:
                process.env.SERVER_ENV === Environnement.DEVELOPMENT
                    ? "debug"
                    : "info",
            format: combine(timestamp(), errors({ stack: true }), splat()),
            transports: [
                new transports.Console({
                    format: this.#createConsoleFormat(),
                    handleExceptions: true,
                }),
                new transports.File({
                    filename: "logs/error.log",
                    level: "error",
                    format: this.#createFileFormat(),
                    handleExceptions: true,
                }),
                new transports.File({
                    filename: "logs/combined.log",
                    format: this.#createFileFormat(),
                }),
            ],
            exitOnError: false,
        });
    }

    /**
     * @description Enregistre un message d'erreur
     * @param {string} message - Message d'erreur à logger
     * @param {...*} meta - Métadonnées additionnelles
     */
    error(message, ...meta) {
        this.#logger.error(message, ...meta);
    }

    /**
     * @description Enregistre un avertissement
     * @param {string} message - Message d'avertissement à logger
     * @param {...*} meta - Métadonnées additionnelles
     */
    warn(message, ...meta) {
        this.#logger.warn(message, ...meta);
    }

    /**
     * @description Enregistre une information
     * @param {string} message - Message d'information à logger
     * @param {...*} meta - Métadonnées additionnelles
     */
    info(message, ...meta) {
        this.#logger.info(message, ...meta);
    }

    /**
     * @description Enregistre une requête HTTP
     * @param {string} message - Message de requête HTTP à logger
     * @param {...*} meta - Métadonnées additionnelles
     */
    http(message, ...meta) {
        this.#logger.http(message, ...meta);
    }

    /**
     * @description Enregistre un message de débogage
     * @param {string} message - Message de débogage à logger
     * @param {...*} meta - Métadonnées additionnelles
     */
    debug(message, ...meta) {
        this.#logger.debug(message, ...meta);
    }

    /**
     * @static
     * @description Obtient l'instance unique du Logger (Singleton)
     * @returns {Logger} Instance unique du Logger
     */
    static getInstance() {
        if (!Logger.#instance) {
            Logger.#instance = new Logger();
        }
        return Logger.#instance;
    }
}

export { Logger };

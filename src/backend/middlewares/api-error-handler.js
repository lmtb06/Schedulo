import { Environnement } from "../utils/enums.js";

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {object} ErrorDetails
 * @property {number} status - Le code de statut de l'erreur
 * @property {string} message - Le message d'erreur
 * @property {string[]} errors - Les erreurs spécifiques
 * @property {object|undefined} stack - La stack de l'erreur
 */

class ApiErrorHandler {
    #defaultStatusCode;
    #defaultMessage;
    #environment;
    constructor({
        defaultStatusCode = 500,
        defaultMessage = "Erreur interne du serveur",
        environment = Environnement.PRODUCTION,
    } = {}) {
        this.#defaultStatusCode = defaultStatusCode;
        this.#defaultMessage = defaultMessage;
        this.#environment = environment;
    }

    /**
     * Gère les erreurs des API.
     * @param {Error} err - L'erreur à gérer
     * @param {Request} req - La requête
     * @param {Response} res - La réponse
     * @param {NextFunction} next - Le prochain middleware
     * @returns {void}
     */
    handle = (err, req, res, next) => {
        const errorDetails = this.#getErrorDetails(err);
        this.#render(res, errorDetails);
    };

    /**
     *
     * @param {Error} error
     * @returns {ErrorDetails}
     */
    #getErrorDetails(error) {
        return {
            status: error.status || this.#defaultStatusCode,
            message: error.message || this.#defaultMessage,
            errors: error.errors || [],
            stack:
                this.#environment === Environnement.PRODUCTION
                    ? undefined
                    : error.stack,
        };
    }

    /**
     * Rend la réponse d'erreur.
     * @param {Response} res - La réponse
     * @param {ErrorDetails} errorDetails - Les détails de l'erreur
     * @returns {void}
     */
    #render(res, errorDetails) {
        res.status(errorDetails.status).send(errorDetails);
    }
}

export { ApiErrorHandler };

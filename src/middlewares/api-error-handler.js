import { Environnement } from "../utils/enums.js";
import { renderApiErrorResponse } from "../utils/render-utils.js";

// Middleware pour gérer les erreurs des API
const apiErrorHandler =
	({
		env = process.env.SERVER_ENV,
		defaultStatusCode = 500,
		defaultMessage = "Erreur interne du serveur",
		render = renderApiErrorResponse,
	} = {}) =>
	async (error, request, res, next) => {
		if (request.accepts("json")) {
			const errorDetails = {
				status: error.status || defaultStatusCode,
				message: error.message || defaultMessage,
				errors: error.errors || [], // Tableau des erreurs spécifiques, comme les erreurs de validation
				stack:
					env === Environnement.PRODUCTION ? undefined : error.stack, // On masque la stack en production
			};

			// Gére le rendu de l'erreur, qu'il soit synchrone ou asynchrone
			await Promise.resolve(render(res, errorDetails));
		} else {
			next(error);
		}
	};

export default apiErrorHandler;


class ApiErrorHandler {
    constructor(errorRenderer, defaultStatusCode = 500,
		defaultMessage = "Erreur interne du serveur",) {
		this.errorRenderer = errorRenderer;
		this.defaultStatusCode = defaultStatusCode;
		this.defaultMessage = defaultMessage;
	}

    handleError(err, req, res, next) {
        const errorDetails = this.#getErrorDetails(err);
        if (errorDetails) {
            this.#render(res, errorDetails);
        } else {
            next(error);
        }
    }

    #getErrorDetails(err) {
        // Implémentez la logique pour obtenir les détails de l'erreur
    }

    #render(res, errorDetails) {
        // Implémentez la logique pour rendre la réponse
    }
}

export default ApiErrorHandler;

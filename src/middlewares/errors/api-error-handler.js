import { ErrorHandler } from "./index.js";

class ApiErrorHandler extends ErrorHandler {
    constructor(
        errorRenderer,
        defaultStatusCode = 500,
        defaultMessage = "Erreur interne du serveur"
    ) {
        this.errorRenderer = errorRenderer;
        this.defaultStatusCode = defaultStatusCode;
        this.defaultMessage = defaultMessage;
    }

    handleError(err, req, res, next) {
        const errorDetails = this.#getErrorDetails(err);
        if (errorDetails) {
            this.#render(res, errorDetails);
        } else {
            next(err);
        }
    }

    #getErrorDetails(err) {
        // Implémentez la logique pour obtenir les détails de l'erreur
    }

    #render(res, errorDetails) {
        // Implémentez la logique pour rendre la réponse
    }
}

export { ApiErrorHandler };

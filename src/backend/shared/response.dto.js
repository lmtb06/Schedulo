/**
 * @typedef {import('../errors/response.dto.error.js').ResponseDTOError} ResponseDTOError
 */

/**
 * Classe DTO pour les réponses.
 * @abstract
 */
class ResponseDTO {
    constructor({ errors, data, message, status }) {
        /**
         * Les erreurs de la réponse.
         * @type {ResponseDTOError[]}
         */
        this.errors = errors;
        /**
         * Les données de la réponse.
         * @type {object}
         */
        this.data = data;
        /**
         * Le message de la réponse.
         * @type {string}
         */
        this.message = message;

        /**
         * Le statut de la réponse.
         * @type {number}
         */
        this.status = status;
    }

    toJSON() {
        return {
            errors: this.errors?.length > 0 ? this.errors : undefined,
            data: this.data,
            message: this.message,
        };
    }
}

export { ResponseDTO };

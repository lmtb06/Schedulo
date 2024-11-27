/**
 * @typedef {import('joi').ValidationError} JoiValidationError
 */

/**
 * Erreur de validation.
 * @augments {Error}
 */
class ValidationError extends Error {
    /**
     * @type {JoiValidationError[]} Les détails de l'erreur
     * @private
     */
    #details;
    /**
     * Crée une instance de ValidationError.
     * @param {JoiValidationError} joiValidationError - L'erreur de validation Joi
     * @param  {...any} args - Arguments supplémentaires
     */
    constructor(joiValidationError, ...args) {
        super(joiValidationError.message, ...args);

        this.#details = joiValidationError.details;
        this.status = 400;
    }

    get details() {
        return this.#details;
    }
}

export { ValidationError };

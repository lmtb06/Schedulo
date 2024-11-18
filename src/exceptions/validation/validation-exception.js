// Import Exception from '../exception.js';
import createError from "http-errors";

/**
 * Exception de validation.
 */
class ValidationException extends createError.BadRequest {
    constructor(joiValidationError, options = {}) {
        super(joiValidationError.message, {
            ...options,
        });

        this.details = joiValidationError.details;
    }

    getDetails() {
        return this.details;
    }
}

export { ValidationException };

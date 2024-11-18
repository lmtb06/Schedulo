import createError from "http-errors";

class ServiceException extends createError.InternalServerError {
    constructor(message, options = {}) {
        super(message, {
            ...options,
        });
    }
}

export { ServiceException };

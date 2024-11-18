import createError from "http-errors";

class DAOException extends createError.InternalServerError {
    constructor(message, options = {}) {
        super(message, {
            ...options,
        });
        this.name = this.constructor.name;
    }
}

export { DAOException };

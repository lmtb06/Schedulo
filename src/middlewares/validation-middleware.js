import { Middleware } from "./index.js";

class ValidationMiddleware extends Middleware {
    constructor(validator) {
        super();
        this.validator = validator;
    }

    async handle(req, res, next) {
        try {
            const value = await this.validator.validate(req.body);
            next();
        } catch (err) {
            next(err);
        }
    }
}

export { ValidationMiddleware };

// Middleware de logging des erreurs
const errorLogger =
    ({ logger = console } = {}) =>
    (error, request, res, next) => {
        logger.debug({
            message: error.message,
            path: request.path,
            stack: error.stack,
            method: request.method,
            timestamp: new Date().toISOString(),
        });
        next(error);
    };

export default errorLogger;

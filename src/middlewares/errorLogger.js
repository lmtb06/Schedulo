// Middleware de logging des erreurs
const errorLogger = ({
    logger = console
} = {}) => {
    return (err, req, res, next) => {
        logger.debug({
            message: err.message,
            path: req.path,
            stack: err.stack,
            method: req.method,
            timestamp: new Date().toISOString(),
        });
        next(err);
    };
};

export default errorLogger;

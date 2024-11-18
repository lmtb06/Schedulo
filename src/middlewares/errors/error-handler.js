class ErrorHandler {
    handle(err, req, res, next) {
        throw new Error("La méthode handle() doit être implémentée");
    }
}

export { ErrorHandler };

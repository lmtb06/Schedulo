class Middleware {
    handle(req, res, next) {
        throw new Error("La méthode handle doit être implémentée");
    }
}

export { Middleware };

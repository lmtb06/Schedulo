import { DAOFactoryException } from "./index.js";

class DAOFactoryStartException extends DAOFactoryException {
    constructor(options = {}) {
        super("Erreur lors du démarrage de la factory de DAO", {
            ...options,
        });
        this.name = this.constructor.name;
    }
}

export { DAOFactoryStartException };

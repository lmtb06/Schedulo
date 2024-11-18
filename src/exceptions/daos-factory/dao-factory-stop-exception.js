import { DAOFactoryException } from "./index.js";

class DAOFactoryStopException extends DAOFactoryException {
    constructor(options = {}) {
        super("Erreur lors de l'arrêt de la factory de DAO", {
            ...options,
        });
        this.name = this.constructor.name;
    }
}

export { DAOFactoryStopException };

import { DAOFactoryError } from "./dao-factory.error.js";

class DAOFactoryStartError extends DAOFactoryError {
    constructor(...args) {
        super("Erreur lors du démarrage de la factory de DAO", ...args);
    }
}

export { DAOFactoryStartError };

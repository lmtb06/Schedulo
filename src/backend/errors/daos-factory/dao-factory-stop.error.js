import { DAOFactoryError } from "./dao-factory.error.js";

class DAOFactoryStopError extends DAOFactoryError {
    constructor(...args) {
        super("Erreur lors de l'arrêt de la factory de DAO", ...args);
    }
}

export { DAOFactoryStopError };

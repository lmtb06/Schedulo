import { MongooseDAOFactory } from "../mongoose/mongoose-dao.factory.js";
import { MongooseConfig } from "../mongoose/mongoose.config.js";
import { OneInstanceProxyDAOFactory } from "./dao-factory/one-instance-proxy-dao.factory.js";
/**
 * @typedef {import('../../daos/index').CompteDAO} CompteDAO
 * @typedef {import('../../daos/index').AgendaDAO} AgendaDAO
 * @typedef {import('../../daos/index').RendezVousDAO} RendezVousDAO
 * @typedef {import('../../daos/index').RepetitionDAO} RepetitionDAO
 */

/**
 * Classe représentant une fabrique de DAO (Data Access Object)
 * Cette classe suit le pattern Factory pour la création d'objets d'accès aux données
 * @abstract
 */
class DAOFactory {
    /**
     * Récupère une instance de la factory de DAO en fonction du type de SGBD
     * @param {number} sgbd - Le type de SGBD
     * @param {object} donneesConfig - La configuration de la source de données
     * @param {Map<string,Function>} eventCallbacks - Les callbacks pour les événements de connexion
     * @returns {DAOFactory} L'instance de la factory de DAO
     */
    static getDAOFactory(sgbd, donneesConfig, eventCallbacks) {
        switch (sgbd) {
            case 0:
                return new MongooseDAOFactory(
                    new MongooseConfig(donneesConfig),
                    eventCallbacks
                );
            case 1:
                return new OneInstanceProxyDAOFactory(
                    new MongooseDAOFactory(
                        new MongooseConfig(donneesConfig),
                        eventCallbacks
                    )
                );
            default:
                throw new Error("SGBD non supporté");
        }
    }
    /**
     * Initialise la connexion à la source de données
     * @abstract
     * @returns {Promise<void>}
     */
    async start() {
        throw new Error("La méthode start() doit être implémentée");
    }

    /**
     * Récupère le DAO pour la gestion des comptes
     * @abstract
     * @returns {Promise<CompteDAO>}
     */
    async getCompteDAO() {
        throw new Error("La méthode getCompteDAO() doit être implémentée");
    }

    /**
     * Récupère le DAO pour la gestion des agendas
     * @abstract
     * @returns {Promise<AgendaDAO>}
     */
    async getAgendaDAO() {
        throw new Error("La méthode getAgendaDAO() doit être implémentée");
    }

    /**
     * Récupère le DAO pour la gestion des rendez-vous
     * @abstract
     * @returns {Promise<RendezVousDAO>}
     */
    async getRendezVousDAO() {
        throw new Error("La méthode getRendezVousDAO() doit être implémentée");
    }

    /**
     * Récupère le DAO pour la gestion des répétitions
     * @abstract
     * @returns {Promise<RepetitionDAO>}
     */
    async getRepetitionDAO() {
        throw new Error("La méthode getRepetitionDAO() doit être implémentée");
    }

    /**
     * Ferme la connexion à la source de données
     * @abstract
     * @returns {Promise<void>}
     */
    async stop() {
        throw new Error("La méthode stop() doit être implémentée");
    }
}

export { DAOFactory };

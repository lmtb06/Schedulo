/**
 * @typedef {import('../../services/compte.service').CompteService} CompteService
 * @typedef {import('../../services/agenda.service').AgendaService} AgendaService
 * @typedef {import('../rendez-vous/rendez-vous.service.js').RendezVousService} RendezVousService
 * @typedef {import('../../services/repetition.service').RepetitionService} RepetitionService
 * @typedef {import('../../services/auth.service').AuthService} AuthService
 * @typedef {import('./dao.factory.js').DAOFactory} DAOFactory
 */

import { BaseServiceFactory } from "./service-factory/base-service.factory.js";
import { OneInstanceProxyServiceFactory } from "./service-factory/one-instance-proxy-service.factory.js";

/**
 * Factory de services
 * @abstract
 */
class ServiceFactory {
    /**
     * Récupère une instance de la factory de services en fonction du type
     * @param {number} type - Le type de ServiceFactory
     * @param {DAOFactory} daoFactory - La factory de DAOs
     * @returns {ServiceFactory} L'instance de la factory de services
     */
    static getServiceFactory(type, daoFactory) {
        switch (type) {
            case 0:
                return new BaseServiceFactory(daoFactory);
            case 1:
                return new OneInstanceProxyServiceFactory(
                    new BaseServiceFactory(daoFactory)
                );
            default:
                throw new Error("Type de ServiceFactory inconnu");
        }
    }
    /**
     * Démarre la factory de services
     * @returns {Promise<void>}
     */
    async start() {
        throw new Error("Fonction non implémentée");
    }

    /**
     * Donne le service de gestion des utilisateurs
     * @returns {Promise<CompteService>}
     */
    async getCompteService() {
        throw new Error("Fonction non implémentée");
    }

    /**
     * Donne le service de gestion des agendas
     * @returns {Promise<AgendaService>}
     */
    async getAgendaService() {
        throw new Error("Fonction non implémentée");
    }

    /**
     * Donne le service de gestion des rendez-vous
     * @returns {Promise<RendezVousService>}
     */
    async getRendezVousService() {
        throw new Error("Fonction non implémentée");
    }

    /**
     * Donne le service de gestion des répétitions
     * @returns {Promise<RepetitionService>}
     */
    async getRepetitionService() {
        throw new Error("Fonction non implémentée");
    }

    /**
     * Donne le service de gestion de l'authentification
     * @returns {Promise<AuthService>}
     */
    async getAuthService() {
        throw new Error("Fonction non implémentée");
    }

    /**
     * Arrête la factory de services
     * @returns {Promise<void>}
     */
    async stop() {
        throw new Error("Fonction non implémentée");
    }
}

export { ServiceFactory };

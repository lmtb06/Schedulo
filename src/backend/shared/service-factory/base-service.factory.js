import { AgendaService } from "../../agenda/agenda.service.js";
import { RendezVousService } from "../../rendez-vous/index.js";
import { InterfaceValidator } from "../../utils/interface.js";
import { ServiceFactory } from "../service.factory.js";

/**
 * @typedef {import('../dao.factory.js').DAOFactory} DAOFactory Factory pour les DAOs
 * @typedef {import('../services/service.factory').ServiceFactory} ServiceFactory Factory pour les services
 */

/**
 * Factory de services de base
 * @implements {ServiceFactory}
 */
class BaseServiceFactory {
    /**
     * @type {DAOFactory} Factory pour les DAOs
     * @private
     */
    #daoFactory;

    /**
     * @type {Map<string, any>} Services
     * @private
     */
    #services;

    /**
     * Crée une nouvelle instance de BaseServiceFactory.
     */
    constructor(daoFactory) {
        InterfaceValidator.ensureImplementsInterface(
            BaseServiceFactory,
            ServiceFactory
        );
        this.#daoFactory = daoFactory;
        this.#services = new Map();
    }

    /**
     * @override
     * @inheritdoc
     */
    async start() {
        // await this.#daoFactory.start();
    }

    /**
     * @override
     * @inheritdoc
     */
    async getCompteService() {
        throw new Error("Fonction non implémentée");
    }

    /**
     * @override
     * @inheritdoc
     */
    async getAgendaService() {
        return new AgendaService(this.#daoFactory);
    }

    /**
     * @override
     * @inheritdoc
     */
    async getRendezVousService() {
        return new RendezVousService(this.#daoFactory);
    }

    /**
     * @override
     * @inheritdoc
     */
    async getRepetitionService() {
        throw new Error("Fonction non implémentée");
    }

    /**
     * @override
     * @inheritdoc
     */
    async getAuthService() {
        throw new Error("Fonction non implémentée");
    }

    /**
     * @override
     * @inheritdoc
     */
    async stop() {
        // await this.#daoFactory.stop();
    }
}

export { BaseServiceFactory };

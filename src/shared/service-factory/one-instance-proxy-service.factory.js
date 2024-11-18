import { InterfaceValidator } from "../../utils/interface.js";
import { ServiceFactory } from "../service.factory.js";
/**
 * @typedef {import('../dao.factory.js').DAOFactory} DAOFactory Factory pour les DAOs
 * @typedef {import('../../logger.js').Logger} Logger Logger de l'application
 */
/**
 * Factory de services qui ne peut avoir qu'une seule instance par service
 * @implements {ServiceFactory}
 */
class OneInstanceProxyServiceFactory {
    /**
     * @type {ServiceFactory} Factory pour les services réel
     * @private
     */
    #serviceFactory;
    #compteService;
    #agendaService;
    #rendezVousService;
    #repetitionService;
    #authService;

    constructor(serviceFactory) {
        InterfaceValidator.ensureImplementsInterface(
            OneInstanceProxyServiceFactory,
            ServiceFactory
        );
        this.#serviceFactory = serviceFactory;
        this.#compteService = null;
        this.#agendaService = null;
        this.#rendezVousService = null;
        this.#repetitionService = null;
        this.#authService = null;
    }

    async start() {
        await this.#serviceFactory.start();
    }

    /**
     * @override
     * @inheritdoc
     */
    async getCompteService() {
        if (!this.#compteService) {
            this.#compteService = await this.#serviceFactory.getCompteService();
        }
        return this.#compteService;
    }

    /**
     * @override
     * @inheritdoc
     */
    async getAgendaService() {
        if (!this.#agendaService) {
            this.#agendaService = await this.#serviceFactory.getAgendaService();
        }
        return this.#agendaService;
    }

    /**
     * @override
     * @inheritdoc
     */
    async getRendezVousService() {
        if (!this.#rendezVousService) {
            this.#rendezVousService =
                await this.#serviceFactory.getRendezVousService();
        }
        return this.#rendezVousService;
    }

    /**
     * @override
     * @inheritdoc
     */
    async getRepetitionService() {
        if (!this.#repetitionService) {
            this.#repetitionService =
                await this.#serviceFactory.getRepetitionService();
        }
        return this.#repetitionService;
    }

    /**
     * @override
     * @inheritdoc
     */
    async getAuthService() {
        if (!this.#authService) {
            this.#authService = await this.#serviceFactory.getAuthService();
        }
        return this.#authService;
    }

    /**
     * @override
     * @inheritdoc
     */
    async stop() {
        await this.#serviceFactory.stop();
        this.#clearServices();
    }

    /**
     * Nettoie les services
     * @private
     * @returns {void}
     */
    #clearServices() {
        this.#compteService = null;
        this.#agendaService = null;
        this.#rendezVousService = null;
        this.#repetitionService = null;
        this.#authService = null;
    }
}

export { OneInstanceProxyServiceFactory };

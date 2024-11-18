import { InterfaceValidator } from "../../utils/interface.js";
import { DAOFactory } from "../dao.factory.js";

/**
 * @typedef {import("../../daos/index").CompteDAO} CompteDAO
 * @typedef {import("../../daos/index").AgendaDAO} AgendaDAO
 * @typedef {import("../../rendez-vous/index.js").RendezVousDAO} RendezVousDAO
 * @typedef {import("../../repetition/index.js").RepetitionDAO} RepetitionDAO
 */

/**
 * Factory de dao qui ne peut avoir qu'une seule instance par dao
 * @implements {DAOFactory}
 */
class OneInstanceProxyDAOFactory {
    /**
     * @type {DAOFactory} Factory pour les daos réele
     * @private
     */
    #daoFactory;

    /**
     * @type {CompteDAO} DAO pour les comptes
     * @private
     */
    #compteDAO;

    /**
     * @type {AgendaDAO} DAO pour les agendas
     * @private
     */
    #agendaDAO;
    /**
     * @type {RendezVousDAO} DAO pour les rendez-vous
     * @private
     */
    #rendezVousDAO;

    /**
     * @type {RepetitionDAO} DAO pour les répétitions
     * @private
     */
    #repetitionDAO;

    /**
     * @param {DAOFactory} daoFactory Factory pour les daos réel
     */
    constructor(daoFactory) {
        InterfaceValidator.ensureImplementsInterface(
            OneInstanceProxyDAOFactory,
            DAOFactory
        );
        this.#daoFactory = daoFactory;
        this.#compteDAO = null;
        this.#agendaDAO = null;
        this.#rendezVousDAO = null;
        this.#repetitionDAO = null;
    }

    /**
     * @inheritdoc
     */
    async start() {
        await this.#daoFactory.start();
    }

    /**
     * @inheritdoc
     */
    async getCompteDAO() {
        if (!this.#compteDAO) {
            this.#compteDAO = await this.#daoFactory.getCompteDAO();
        }
        return this.#compteDAO;
    }

    /**
     * @inheritdoc
     */
    async getAgendaDAO() {
        if (!this.#agendaDAO) {
            this.#agendaDAO = await this.#daoFactory.getAgendaDAO();
        }
        return this.#agendaDAO;
    }

    /**
     * @inheritdoc
     */
    async getRendezVousDAO() {
        if (!this.#rendezVousDAO) {
            this.#rendezVousDAO = await this.#daoFactory.getRendezVousDAO();
        }
        return this.#rendezVousDAO;
    }

    /**
     * @inheritdoc
     */
    async getRepetitionDAO() {
        if (!this.#repetitionDAO) {
            this.#repetitionDAO = await this.#daoFactory.getRepetitionDAO();
        }
        return this.#repetitionDAO;
    }

    /**
     * @inheritdoc
     */
    async stop() {
        await this.#daoFactory.stop();
        this.#clearDAOs();
    }

    /**
     * Nettoie les daos
     * @private
     */
    #clearDAOs() {
        this.#compteDAO = null;
        this.#agendaDAO = null;
        this.#rendezVousDAO = null;
        this.#repetitionDAO = null;
    }
}

export { OneInstanceProxyDAOFactory };

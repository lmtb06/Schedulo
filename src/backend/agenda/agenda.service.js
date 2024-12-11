import { DTOValidationError } from "../errors/response.dto.error.js";
import { DAOFactory } from "../shared/dao.factory.js";
import { RequestDTO } from "../shared/request.dto.js";
import {
    CreateAgendaResponseDTO,
    DeleteAgendaResponseDTO,
    GetAllAgendaResponseDTO,
    GetAgendaResponseDTO,
    UpdateAgendaResponseDTO,
} from "./dto/reponse-dto/index.js";
import {
    CreateAgendaRequestDTO,
    DeleteAgendaRequestDTO,
    GetAllAgendaRequestDTO,
    GetAgendaRequestDTO,
    UpdateAgendaRequestDTO,
} from "./dto/request-dto/index.js";
import { Agenda } from "./agenda.model.js";

/**
 * @typedef {import('./agenda.dao.js').AgendaDAO} AgendaDAO
 */

/**
 * Fournit des services pour les agenda
 */
class AgendaService {
    /**
     * @type {DAOFactory} La factory de DAOs
     * @private
     * @readonly
     */
    #daoFactory;
    /**
     * Crée une instance de AgendaService
     * @param {DAOFactory} daoFactory - La factory de DAOs
     */
    constructor(daoFactory) {
        this.#daoFactory = daoFactory;
    }

    /**
     * Récupère le DAO des agenda
     * @returns {Promise<AgendaDAO>} Le DAO des agendas
     * @throws {Error} Si le DAO des agendas est introuvable
     */
    async #getAgendaDAO() {
        const agendaDAO = await this.#daoFactory.getAgendaDAO();
        if (!agendaDAO) {
            throw new Error("Le DAO des agendas est introuvable");
        }
        return agendaDAO;
    }

    /**
     *
     * @param {RequestDTO} requestDTO
     * @returns {...DTOValidationError[]}
     */
    #getValidationError(requestDTO) {
        const validationErrors = [];
        requestDTO.error?.details.forEach((error) => {
            validationErrors.push(
                new DTOValidationError({
                    key: error.context.key,
                    value: error.context.value,
                    message: error.message,
                })
            );
        });
        return validationErrors;
    }

    /**
     * Crée un agenda
     * @param {CreateAgendaRequestDTO} createAgendaRequestDTO - Les données pour créer un agenda
     * @returns {Promise<CreateAgendaResponseDTO>} La réponse de la création de l'agenda
     */
    async createAgenda(createAgendaRequestDTO) {
        const errors = this.#getValidationError(createAgendaRequestDTO);

        let message, data, status;

        if (errors.length > 0) {
            message = "Erreur lors de la validation des données";
            status = 400;
        } else {
            const agendaDAO = await this.#getAgendaDAO();
            const agenda = new Agenda({
                ...createAgendaRequestDTO.data,
            });
            data = await agendaDAO.create(agenda);
        }

        return new CreateAgendaResponseDTO({
            errors,
            data,
            message,
            status,
        });
    }

    /**
     * Récupère un agenda
     * @param {GetAgendaRequestDTO} getAgendaRequestDTO - Les données pour récupérer un agenda
     * @returns {Promise<GetAgendaResponseDTO>} La réponse de la récupération du agenda
     */
    async getAgenda(getAgendaRequestDTO) {
        const errors = this.#getValidationError(getAgendaRequestDTO);

        let message, data, status;

        if (errors.length > 0) {
            message = "Erreur lors de la validation des données";
            status = 400;
        } else {
            const agendaDAO = await this.#getAgendaDAO();
            const agenda = new Agenda({
                ...getAgendaRequestDTO.data,
            });
            data = await agendaDAO.get(agenda.id);
        }

        return new GetAgendaResponseDTO({
            errors,
            data,
            message,
            status,
        });
    }

    /**
     * Met à jour un agenda
     * @param {UpdateAgendaRequestDTO} updateAgendaRequestDTO - Les données pour mettre à jour un agenda
     * @returns {Promise<void>}
     * @throws {Error} Si les données pour mettre à jour un agenda sont invalides
     */
    async updateAgenda(updateAgendaRequestDTO) {
        const errors = this.#getValidationError(updateAgendaRequestDTO);
        let message, data, status;

        if (errors.length > 0) {
            message = "Erreur lors de la validation des données";
            status = 400;
        } else {
            const agendaDAO = await this.#daoFactory.getAgendaDAO();

            const agenda = new Agenda(updateAgendaRequestDTO.data);

            data = await agendaDAO.update(agenda.id, agenda);
        }

        return new UpdateAgendaResponseDTO({
            errors,
            data,
            message,
            status,
        });
    }

    /**
     * Supprime un agenda
     * @param {DeleteAgendaRequestDTO} deleteAgendaRequestDTO - Les données pour supprimer un agenda
     * @returns {Promise<DeleteAgendaResponseDTO>} La réponse de la suppression du agenda
     */
    async deleteAgenda(deleteAgendaRequestDTO) {
        const errors = this.#getValidationError(deleteAgendaRequestDTO);
        let message, data, status;

        if (errors.length > 0) {
            message = "Erreur lors de la validation des données";
            status = 400;
        } else {
            const agendaDAO = await this.#daoFactory.getAgendaDAO();

            const agenda = new Agenda(deleteAgendaRequestDTO.data);

            data = await agendaDAO.delete(agenda.id);
        }

        return new DeleteAgendaResponseDTO({
            errors,
            data,
            message,
            status,
        });
    }

    /**
     * Récupère tous les agenda respectant certains critères
     * @param {GetAllAgendaRequestDTO} getAllAgendaRequestDTO - Le DTO pour récupérer les agenda
     * @returns {Promise<GetAllAgendaResponseDTO>} La réponse de la récupération des agenda
     */
    async getAllAgenda(getAllAgendaRequestDTO) {
        const agendaDAO = await this.#getAgendaDAO();
        const errors = this.#getValidationError(getAllAgendaRequestDTO);
        let message, data, status;

        if (errors.length > 0) {
            message = "Erreur lors de la validation des données";
            status = 400;
        } else {
            data = await agendaDAO.getAll({
                ...getAllAgendaRequestDTO.data,
            });
        }

        return new GetAllAgendaResponseDTO({
            errors,
            data,
            message,
            status,
        });
    }
}

export { AgendaService };

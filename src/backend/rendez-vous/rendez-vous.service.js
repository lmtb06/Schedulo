import { DTOValidationError } from "../errors/response.dto.error.js";
import { DAOFactory } from "../shared/dao.factory.js";
import { RequestDTO } from "../shared/request.dto.js";
import {
    CreateRendezVousResponseDTO,
    DeleteRendezVousResponseDTO,
    GetAllRendezVousResponseDTO,
    GetRendezVousResponseDTO,
    UpdateRendezVousResponseDTO,
} from "./dto/reponse-dto/index.js";
import {
    CreateRendezVousRequestDTO,
    DeleteRendezVousRequestDTO,
    GetAllRendezVousRequestDTO,
    GetRendezVousRequestDTO,
    UpdateRendezVousRequestDTO,
} from "./dto/request-dto/index.js";
import { RendezVous } from "./rendez-vous.model.js";

/**
 * @typedef {import('../shared/dao.factory.js').DAOFactory} DAOFactory
 * @typedef {import('./rendez-vous.dao.js').RendezVousDAO} RendezVousDAO
 * @typedef {import('./rendez-vous.model.js').RendezVous} RendezVous
 */

/**
 * Fournit des services pour les rendez-vous
 */
class RendezVousService {
    /**
     * @type {DAOFactory} La factory de DAOs
     * @private
     * @readonly
     */
    #daoFactory;
    /**
     * Crée une instance de RendezVousService
     * @param {DAOFactory} daoFactory - La factory de DAOs
     */
    constructor(daoFactory) {
        this.#daoFactory = daoFactory;
    }

    /**
     * Récupère le DAO des rendez-vous
     * @returns {Promise<RendezVousDAO>} Le DAO des rendez-vous
     * @throws {Error} Si le DAO des rendez-vous est introuvable
     */
    async #getRendezVousDAO() {
        const rendezVousDAO = await this.#daoFactory.getRendezVousDAO();
        if (!rendezVousDAO) {
            throw new Error("Le DAO des rendez-vous est introuvable");
        }
        return rendezVousDAO;
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
     * Crée un rendez-vous
     * @param {CreateRendezVousRequestDTO} createRendezVousRequestDTO - Les données pour créer un rendez-vous
     * @returns {Promise<CreateRendezVousResponseDTO>} La réponse de la création du rendez-vous
     */
    async createRendezVous(createRendezVousRequestDTO) {
        const errors = this.#getValidationError(createRendezVousRequestDTO);

        let message, data, status;

        if (errors.length > 0) {
            message = "Erreur lors de la validation des données";
            status = 400;
        } else {
            const rendezVousDAO = await this.#getRendezVousDAO();
            const rendezVous = new RendezVous({
                ...createRendezVousRequestDTO.data,
            });
            data = await rendezVousDAO.create(rendezVous);
        }

        return new CreateRendezVousResponseDTO({
            errors,
            data,
            message,
            status,
        });
    }

    /**
     * Récupère un rendez-vous
     * @param {GetRendezVousRequestDTO} getRendezVousRequestDTO - Les données pour récupérer un rendez-vous
     * @returns {Promise<GetRendezVousResponseDTO>} La réponse de la récupération du rendez-vous
     */
    async getRendezVous(getRendezVousRequestDTO) {
        const errors = this.#getValidationError(getRendezVousRequestDTO);

        let message, data, status;

        if (errors.length > 0) {
            message = "Erreur lors de la validation des données";
            status = 400;
        } else {
            const rendezVousDAO = await this.#getRendezVousDAO();
            const rendezVous = new RendezVous({
                ...getRendezVousRequestDTO.data,
            });
            data = await rendezVousDAO.get(rendezVous.id);
        }

        return new GetRendezVousResponseDTO({
            errors,
            data,
            message,
            status,
        });
    }

    /**
     * Met à jour un rendez-vous
     * @param {UpdateRendezVousRequestDTO} updateRendezVousRequestDTO - Les données pour mettre à jour un rendez-vous
     * @returns {Promise<void>}
     * @throws {Error} Si les données pour mettre à jour un rendez-vous sont invalides
     */
    async updateRendezVous(updateRendezVousRequestDTO) {
        const errors = this.#getValidationError(updateRendezVousRequestDTO);
        let message, data, status;

        if (errors.length > 0) {
            message = "Erreur lors de la validation des données";
            status = 400;
        } else {
            const rendezVousDAO = await this.#daoFactory.getRendezVousDAO();

            const rdv = new RendezVous(updateRendezVousRequestDTO.data);

            data = await rendezVousDAO.update(rdv.id, rdv);
        }

        return new UpdateRendezVousResponseDTO({
            errors,
            data,
            message,
            status,
        });
    }

    /**
     * Supprime un rendez-vous
     * @param {DeleteRendezVousRequestDTO} deleteRendezVousRequestDTO - Les données pour supprimer un rendez-vous
     * @returns {Promise<DeleteRendezVousResponseDTO>} La réponse de la suppression du rendez-vous
     */
    async deleteRendezVous(deleteRendezVousRequestDTO) {
        const errors = this.#getValidationError(deleteRendezVousRequestDTO);
        let message, data, status;

        if (errors.length > 0) {
            message = "Erreur lors de la validation des données";
            status = 400;
        } else {
            const rendezVousDAO = await this.#daoFactory.getRendezVousDAO();

            const rdv = new RendezVous(deleteRendezVousRequestDTO.data);

            data = await rendezVousDAO.delete(rdv.id);
        }

        return new DeleteRendezVousResponseDTO({
            errors,
            data,
            message,
            status,
        });
    }

    /**
     * Récupère tous les rendez-vous respectant certains critères
     * @param {GetAllRendezVousRequestDTO} getAllRendezVousRequestDTO - Le DTO pour récupérer les rendez-vous
     * @returns {Promise<GetAllRendezVousResponseDTO>} La réponse de la récupération des rendez-vous
     */
    async getAllRendezVous(getAllRendezVousRequestDTO) {
        const rendezVousDAO = await this.#getRendezVousDAO();
        const errors = this.#getValidationError(getAllRendezVousRequestDTO);
        let message, data, status;

        if (errors.length > 0) {
            message = "Erreur lors de la validation des données";
            status = 400;
        } else {
            data = await rendezVousDAO.getAll({
                ...getAllRendezVousRequestDTO.data,
            });
        }

        return new GetAllRendezVousResponseDTO({
            errors,
            data,
            message,
            status,
        });
    }
}

export { RendezVousService };

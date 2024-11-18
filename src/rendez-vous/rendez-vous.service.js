/**
 * @typedef {import('./rendez-vous.model.js').RendezVous} RendezVous
 * @typedef {import('./dao/rendez-vous.dao.js').RendezVousDAO} RendezVousDAO
 * @typedef {import('./dto/create-rendez-vous.dto.js').CreateRendezVousDTO} CreateRendezVousDTO
 * @typedef {import('./dto/update-rendez-vous.dto.js').UpdateRendezVousDTO} UpdateRendezVousDTO
 * @typedef {import('./dto/delete-rendez-vous.dto.js').DeleteRendezVousDTO} DeleteRendezVousDTO
 */

import { DAOFactory } from "../shared/dao.factory.js";
import { GetRendezVousDTO } from "./dto/get-rendez-vous.dto.js";
import { RendezVous } from "./rendez-vous.model.js";

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
     * Crée un rendez-vous
     * @param {CreateRendezVousDTO} createRendezVousDTO - Les données pour créer un rendez-vous
     * @returns {Promise<RendezVous>} Le rendez-vous créé
     * @throws {Error} Si les données pour créer un rendez-vous sont invalides
     */
    async createRendezVous(createRendezVousDTO) {
        createRendezVousDTO.validate();
        const rendezVous = new RendezVous({
            idCreateur: createRendezVousDTO.idCreateur,
            idAgenda: createRendezVousDTO.idAgenda,
            debut: createRendezVousDTO.debut,
            fin: createRendezVousDTO.fin,
            titre: createRendezVousDTO.titre,
            description: createRendezVousDTO.description,
        });
        await (await this.#daoFactory.getRendezVousDAO()).save(rendezVous);
        return rendezVous;
    }

    /**
     * Récupère un rendez-vous
     * @param {GetRendezVousDTO} getRendezVousDTO - Les données pour récupérer un rendez-vous
     * @returns {Promise<RendezVous>} Le rendez-vous récupéré
     * @throws {Error} Si les données pour récupérer un rendez-vous sont invalides
     */
    async getRendezVous(getRendezVousDTO) {
        getRendezVousDTO.validate();
        const rdv = (await this.#daoFactory.getRendezVousDAO()).get(
            getRendezVousDTO.id
        );
        return rdv;
    }

    /**
     * Met à jour un rendez-vous
     * @param {UpdateRendezVousDTO} updateRendezVousDTO - Les données pour mettre à jour un rendez-vous
     * @returns {Promise<void>}
     * @throws {Error} Si les données pour mettre à jour un rendez-vous sont invalides
     */
    async updateRendezVous(updateRendezVousDTO) {
        updateRendezVousDTO.validate();
        const rdv = new RendezVous({
            id: updateRendezVousDTO.id,
            idCreateur: updateRendezVousDTO.idCreateur,
            idAgenda: updateRendezVousDTO.idAgenda,
            debut: updateRendezVousDTO.debut,
            fin: updateRendezVousDTO.fin,
            titre: updateRendezVousDTO.titre,
            description: updateRendezVousDTO.description,
        });
        await (await this.#daoFactory.getRendezVousDAO()).update(rdv);
    }

    /**
     * Supprime un rendez-vous
     * @param {DeleteRendezVousDTO} deleteRendezVousDTO - Les données pour supprimer un rendez-vous
     * @returns {Promise<void>}
     * @throws {Error} Si les données pour supprimer un rendez-vous sont invalides
     */
    async deleteRendezVous(deleteRendezVousDTO) {
        deleteRendezVousDTO.validate();
        const rdv = new RendezVous({
            id: deleteRendezVousDTO.id,
        });
        await (await this.#daoFactory.getRendezVousDAO()).delete(rdv);
    }

    async getAllRendezVous(filtres = {}) {
        throw new Error("Method not implemented");
        // return this.rendezVousModel.find({ ...filtres }).populate('repetitions');
    }
}

export { RendezVousService };

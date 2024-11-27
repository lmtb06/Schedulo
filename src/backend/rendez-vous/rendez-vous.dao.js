/**
 * @typedef {import('../rendez-vous.model').RendezVous} RendezVous
 */

/**
 * Interface permettant de manipuler dans le support de stockage les Rendez Vous.
 * @interface
 */
class RendezVousDAO {
    /**
     * Trouve le rendez-vous dans le support de stockage à partir de son identifiant.
     * @abstract
     * @param {string} id l'identifiant du rendez-vous à trouver.
     * @returns {Promise<RendezVous>} le rendez-vous trouvé
     */
    async get(id) {
        throw new Error("Method not implemented");
    }

    /**
     * Trouve tous les rendez-vous dans le support de stockage.
     * @abstract
     * @param {object} filters Les filtres pour trouver les rendez-vous.
     * @returns {Promise<RendezVous[]>} Les rendez-vous trouvés.
     */
    async getAll(filters) {
        throw new Error("Method not implemented");
    }

    /**
     * Crée le rendez-vous dans le support de stockage.
     * Il met à jour les propriétés du rendez-vous suivantes :
     * - id
     * - dateCreation
     * - dateModification
     * @abstract
     * @param {RendezVous} rendezVous Le rendez-vous à créer avec des valeurs renseignées.
     * @returns {Promise<RendezVous>}
     */
    async create(rendezVous) {
        throw new Error("Method not implemented");
    }

    /**
     * Met à jour le rendez-vous avec cet id dans le support de stockage.
     * @abstract
     * @param id {string} L'identifiant du rendez-vous à mettre à jour.
     * @param {RendezVous} rendezVous Les propriétés déjà renseignées sont mises à jour.
     * @returns {Promise<RendezVous>} Le rendez-vous mis à jour.
     */
    async update(id, rendezVous) {
        throw new Error("Method not implemented");
    }
    /**
     * Supprime le rendez-vous avec cet id dans le support de stockage.
     * @abstract
     * @param id {string} L'identifiant du rendez-vous à supprimer.
     * @returns {Promise<RendezVous>} Le rendez-vous supprimé.
     */
    async delete(id) {
        throw new Error("Method not implemented");
    }
}

export { RendezVousDAO };

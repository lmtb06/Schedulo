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
     * @param {Map<string, any>} params Les paramètres pour trouver les rendez-vous.
     * @returns {Promise<RendezVous[]>} Les rendez-vous trouvés.
     */
    async getAll(params) {
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
     * @returns {Promise<void>}
     */
    async save(rendezVous) {
        throw new Error("Method not implemented");
    }
    /**
     * Met à jour le rendez-vous dans le support de stockage.
     * @abstract
     * @param {RendezVous} rendezVous Le rendez-vous à mettre à jour (id renseigné).
     * @param {Map<string, any>} params Les paramètres à mettre à jour.
     * @returns {Promise<void>}
     */
    async update(rendezVous, params) {
        throw new Error("Method not implemented");
    }
    /**
     * Supprime le rendez-vous dans le support de stockage.
     * @abstract
     * @param {RendezVous} rendezVous Le rendez-vous à supprimer avec son (id renseigné).
     * @returns {Promise<void>}
     */
    async delete(rendezVous) {
        throw new Error("Method not implemented");
    }
}

export { RendezVousDAO };

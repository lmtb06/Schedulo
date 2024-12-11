/**
 * @typedef {import('../agenda.model').Agenda} Agenda
 */

/**
 * Interface permettant de manipuler dans le support de stockage les Rendez Vous.
 * @interface
 */
class AgendaDAO {
    /**
     * Trouve le agenda dans le support de stockage à partir de son identifiant.
     * @abstract
     * @param {string} id l'identifiant du agenda à trouver.
     * @returns {Promise<Agenda>} le agenda trouvé
     */
    async get(id) {
        throw new Error("Method not implemented");
    }

    /**
     * Trouve tous les agenda dans le support de stockage.
     * @abstract
     * @param {object} filters Les filtres pour trouver les agenda.
     * @returns {Promise<Agenda[]>} Les agenda trouvés.
     */
    async getAll(filters) {
        throw new Error("Method not implemented");
    }

    /**
     * Crée le agenda dans le support de stockage.
     * Il met à jour les propriétés du agenda suivantes :
     * - id
     * - dateCreation
     * - dateModification
     * @abstract
     * @param {Agenda} agenda Le agenda à créer avec des valeurs renseignées.
     * @returns {Promise<Agenda>}
     */
    async create(agenda) {
        throw new Error("Method not implemented");
    }

    /**
     * Met à jour le agenda avec cet id dans le support de stockage.
     * @abstract
     * @param id {string} L'identifiant du agenda à mettre à jour.
     * @param {Agenda} agenda Les propriétés déjà renseignées sont mises à jour.
     * @returns {Promise<Agenda>} Le agenda mis à jour.
     */
    async update(id, agenda) {
        throw new Error("Method not implemented");
    }
    /**
     * Supprime le agenda avec cet id dans le support de stockage.
     * @abstract
     * @param id {string} L'identifiant du agenda à supprimer.
     * @returns {Promise<Agenda>} Le agenda supprimé.
     */
    async delete(id) {
        throw new Error("Method not implemented");
    }
}

export { AgendaDAO };

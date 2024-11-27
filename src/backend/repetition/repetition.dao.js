/**
 * @typedef {import('./repetition.model').Repetition} Repetition
 */

/**
 * Interface permettant de manipuler dans le support de stockage les Répétitions.
 * @interface
 */
class RepetitionDAO {
    /**
     * Crée la répétition dans le support de stockage.
     * @abstract
     * @param {Repetition} repetition La répétition à créer avec des valeurs renseignées.
     * @returns {Promise<Repetition>} La répétition créée.
     */
    async create(repetition) {
        throw new Error("Method not implemented");
    }

    /**
     * Trouve la répétition dans le support de stockage à partir de son identifiant.
     * @abstract
     * @param {Repetition} repetition La répétition à trouver avec son identifiant renseigné.
     * @returns {Promise<Repetition>} La répétition trouvée.
     */
    async findById(repetition) {
        throw new Error("Method not implemented");
    }

    /**
     * Met à jour la répétition dans le support de stockage.
     * @abstract
     * @param {Repetition} repetition La répétition à mettre à jour avec son identifiant renseigné.
     * @returns {Promise<Repetition>} La répétition mise à jour.
     */
    async update(repetition) {
        throw new Error("Method not implemented");
    }

    /**
     * Supprime la répétition dans le support de stockage.
     * @abstract
     * @param {Repetition} repetition La répétition à supprimer avec son identifiant renseigné.
     * @returns {Promise<void>}
     */
    async delete(repetition) {
        throw new Error("Method not implemented");
    }
}

export { RepetitionDAO };

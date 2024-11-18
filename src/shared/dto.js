/**
 * @typedef {import('../exceptions').ValidationException} ValidationException
 */

/**
 * Interface DTO
 * @interface
 */
class DTO {
    constructor() {}
    /**
     * Convertit l'objet en JSON.
     * @abstract
     * @returns {string} L'objet converti en JSON.
     */
    toJSON() {
        throw new Error("La méthode doit être implémentée");
    }

    /**
     * Vérifie que l'objet est valide.
     * @abstract
     * @returns {void}
     * @throws {ValidationException} L'objet n'est pas valide.
     */
    validate() {
        throw new Error("La méthode doit être implémentée");
    }
}

export { DTO };

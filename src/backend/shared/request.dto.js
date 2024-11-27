/**
 * @typedef {import('joi').DTOValidationError} ValidationError
 * @typedef {import('joi').ValidationResult} ValidationResult
 */

/**
 * Classe DTO pour les requêtes.
 * @abstract
 */
class RequestDTO {
    /**
     * L'erreur de validation
     * @type {ValidationError|undefined}
     */
    error;
    /**
     * Les données du DTO
     * @type {object|undefined}
     */
    data;
    /**
     * Crée une instance de RequestDTO.
     * @param {object} data - Les données du DTO
     */
    constructor(data) {
        const { error, value: dataClean } = this._validate(data);
        Object.assign(this, { error, data: dataClean });
        Object.freeze(this);
    }

    /**
     * Vérifie que l'objet est valide.
     * @abstract
     * @param {object} data - Les données à valider
     * @returns {ValidationResult} Les résultats de la validation
     */
    _validate(data) {
        throw new Error("La méthode doit être implémentée");
    }
}

export { RequestDTO };

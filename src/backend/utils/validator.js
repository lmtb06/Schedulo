/**
 * @typedef {import('joi').Schema} Schema
 * @typedef {import('joi').ValidationError} ValidationError
 * @typedef {import('joi').ValidationOptions} ValidationOptions
 * @typedef {import('joi').ValidationResult} ValidationResult
 */

class Validator {
    /**
     * Valide les données avec un schéma de validation
     * @param {object} data - Les données à valider
     * @param {Schema} validationSchema - Le schéma de validation
     * @param {ValidationOptions} options - Les options de validation
     * @returns {ValidationResult} Les résultats de la validation
     */
    static validate(data, validationSchema, options = {}) {
        /**
         * @type {ValidationOptions} Les options par défaut
         */
        const defaultOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };
        const finalOptions = { ...defaultOptions, ...options };
        return validationSchema.validate(data, finalOptions);
    }
}

export { Validator };

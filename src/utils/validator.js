import { ValidationException } from "../exceptions/validation/index.js";

class Validator {
    /**
     * Valide les données avec un schéma de validation
     * @param {object} data - Les données à valider
     * @param {Joi.Schema} validationSchema - Le schéma de validation
     * @param {Joi.ValidationOptions} options - Les options de validation
     * @returns {object} Les données validées
     * @throws {ValidationException} Si les données ne sont pas valides
     */
    static validate(data, validationSchema, options) {
        const { error, value } = validationSchema.validate(data, options);
        if (error) {
            throw new ValidationException(error);
        }
        return value;
    }
}

export { Validator };

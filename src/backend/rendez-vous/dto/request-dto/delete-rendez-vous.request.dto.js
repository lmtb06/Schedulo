import { RequestDTO } from "../../../shared/request.dto.js";
import { Validator } from "../../../utils/validator.js";
import { deleteRendezVousRequestSchema } from "./delete-rendez-vous.request.schema.js";

/**
 * @typedef {object} Data
 * @property {string} id L'identifiant du rendez-vous.
 */

/**
 * Classe DTO pour la suppression d'un rendez-vous.
 * @class
 * @augments {RequestDTO}
 */
class DeleteRendezVousRequestDTO extends RequestDTO {
    constructor(data) {
        super(data);
        /**
         * @type {Data|undefined}
         */
        this.data;
    }

    /**
     * @override
     * @inheritdoc
     */
    _validate(data) {
        return Validator.validate(data, deleteRendezVousRequestSchema, {
            allowUnknown: true,
            stripUnknown: true,
        });
    }
}

export { DeleteRendezVousRequestDTO };

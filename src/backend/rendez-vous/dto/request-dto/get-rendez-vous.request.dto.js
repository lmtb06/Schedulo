import { RequestDTO } from "../../../shared/request.dto.js";
import { Validator } from "../../../utils/validator.js";
import { getRendezVousRequestSchema } from "./get-rendez-vous.request.schema.js";

/**
 * @typedef {object} Data
 * @property {string} id L'identifiant du rendez-vous.
 */

/**
 * Classe DTO représentant la récupération d'un rendez-vous.
 * @augments {RequestDTO}
 */
class GetRendezVousRequestDTO extends RequestDTO {
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
        return Validator.validate(data, getRendezVousRequestSchema, {
            allowUnknown: true,
            stripUnknown: true,
        });
    }
}

export { GetRendezVousRequestDTO };

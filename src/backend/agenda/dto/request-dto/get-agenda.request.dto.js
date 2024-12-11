import { RequestDTO } from "../../../shared/request.dto.js";
import { Validator } from "../../../utils/validator.js";
import { getAgendaRequestSchema } from "./get-agenda.request.schema.js";

/**
 * @typedef {object} Data
 * @property {string} id L'identifiant de l'agenda.
 */

/**
 * Classe DTO représentant la récupération d'un agenda.
 * @augments {RequestDTO}
 */
class GetAgendaRequestDTO extends RequestDTO {
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
        return Validator.validate(data, getAgendaRequestSchema, {
            allowUnknown: true,
            stripUnknown: true,
        });
    }
}

export { GetAgendaRequestDTO };

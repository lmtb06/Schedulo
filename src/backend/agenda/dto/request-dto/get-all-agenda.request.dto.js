import { RequestDTO } from "../../../shared/request.dto.js";
import { Validator } from "../../../utils/validator.js";
import { getAllAgendaRequestSchema } from "./get-all-agenda.request.schema.js";

/**
 * @typedef {object} Data
 * @property {string} idCreateur L'identifiant du créateur des agenda.
 */

/**
 * Classe DTO pour la récupération d'un ensemble des agendas satisfaisant des critères.
 * @augments {RequestDTO}
 */
class GetAllAgendaRequestDTO extends RequestDTO {
    /**
     * @inheritdoc
     */
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
        return Validator.validate(data, getAllAgendaRequestSchema, {
            allowUnknown: true,
            stripUnknown: true,
        });
    }
}

export { GetAllAgendaRequestDTO };

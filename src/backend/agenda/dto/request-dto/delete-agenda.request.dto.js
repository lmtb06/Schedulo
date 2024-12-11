import { RequestDTO } from "../../../shared/request.dto.js";
import { Validator } from "../../../utils/validator.js";
import { deleteAgendaRequestSchema } from "./delete-agenda.request.schema.js";

/**
 * @typedef {object} Data
 * @property {string} id L'identifiant de l'agenda.
 */

/**
 * Classe DTO pour la suppression d'un agenda.
 * @class
 * @augments {RequestDTO}
 */
class DeleteAgendaRequestDTO extends RequestDTO {
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
        return Validator.validate(data, deleteAgendaRequestSchema, {
            allowUnknown: true,
            stripUnknown: true,
        });
    }
}

export { DeleteAgendaRequestDTO };

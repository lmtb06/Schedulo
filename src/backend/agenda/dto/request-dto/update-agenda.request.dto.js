import { RequestDTO } from "../../../shared/request.dto.js";
import { Validator } from "../../../utils/validator.js";
import { updateAgendaRequestSchema } from "./update-agenda.request.schema.js";

/**
 * Classe DTO pour la mise à jour d'un agenda.
 * @augments {RequestDTO}
 */
class UpdateAgendaRequestDTO extends RequestDTO {
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
        return Validator.validate(data, updateAgendaRequestSchema, {
            allowUnknown: true,
            stripUnknown: true,
        });
    }
}

export { UpdateAgendaRequestDTO };

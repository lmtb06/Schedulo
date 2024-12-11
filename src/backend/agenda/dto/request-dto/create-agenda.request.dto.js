import { RequestDTO } from "../../../shared/request.dto.js";
import { Validator } from "../../../utils/validator.js";
import { createAgendaRequestSchema } from "./create-agenda.request.schema.js";

/**
 * Classe DTO pour la création d'un agenda.
 * @implements {RequestDTO}
 */
class CreateAgendaRequestDTO extends RequestDTO {
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
        return Validator.validate(data, createAgendaRequestSchema, {
            allowUnknown: true,
            stripUnknown: true,
        });
    }
}

export { CreateAgendaRequestDTO };

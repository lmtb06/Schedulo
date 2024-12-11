import Joi from "../../../utils/custom-joi.js";

const deleteAgendaRequestSchema = Joi.object({
    id: Joi.id().required(),
});

export { deleteAgendaRequestSchema };

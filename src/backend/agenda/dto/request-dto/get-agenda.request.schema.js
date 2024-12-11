import Joi from "../../../utils/custom-joi.js";

const getAgendaRequestSchema = Joi.object({
    id: Joi.id().required(),
});

export { getAgendaRequestSchema };

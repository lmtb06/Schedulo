import Joi from "../../../utils/custom-joi.js";

const getAllAgendaRequestSchema = Joi.object({
    idCreateur: Joi.id().optional(),
});

export { getAllAgendaRequestSchema };

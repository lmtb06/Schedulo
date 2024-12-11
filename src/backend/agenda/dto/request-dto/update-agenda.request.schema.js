import Joi from "../../../utils/custom-joi.js";

const updateAgendaRequestSchema = Joi.object({
    id: Joi.id().required(),
    titre: Joi.string().required().optional(),
    description: Joi.string().allow("").optional(),
    couleur: Joi.string().optional().optional(),
});

export { updateAgendaRequestSchema };

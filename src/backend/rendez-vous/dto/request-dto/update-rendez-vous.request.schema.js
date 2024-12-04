import Joi from "../../../utils/custom-joi.js";

const updateRendezVousRequestSchema = Joi.object({
    id: Joi.id().required(),
    idCreateur: Joi.id().optional(),
    idAgenda: Joi.id().optional(),
    titre: Joi.string().required().optional(),
    debut: Joi.date().optional(),
    fin: Joi.date().greater(Joi.ref("debut")).optional(),
    description: Joi.string().allow("").optional(),
});

export { updateRendezVousRequestSchema };

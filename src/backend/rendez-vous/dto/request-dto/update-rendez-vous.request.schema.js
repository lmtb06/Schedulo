import Joi from "joi";

const updateRendezVousRequestSchema = Joi.object({
    id: Joi.string().required(),
    idCreateur: Joi.string().optional(),
    idAgenda: Joi.string().optional(),
    titre: Joi.string().required().optional(),
    debut: Joi.date().optional(),
    fin: Joi.date().greater(Joi.ref("debut")).optional(),
    description: Joi.string().allow("").optional(),
});

export { updateRendezVousRequestSchema };

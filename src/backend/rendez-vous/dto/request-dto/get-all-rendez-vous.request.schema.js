import Joi from "../../../utils/custom-joi.js";

const getAllRendezVousRequestSchema = Joi.object({
    idCreateur: Joi.id().optional(),
    idAgenda: Joi.id().optional(),
    debut: Joi.date().optional(),
    fin: Joi.date().greater(Joi.ref("debut")).optional(),
});

export { getAllRendezVousRequestSchema };

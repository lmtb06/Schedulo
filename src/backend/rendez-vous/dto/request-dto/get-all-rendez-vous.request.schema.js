import Joi from "joi";

const getAllRendezVousRequestSchema = Joi.object({
    idCreateur: Joi.string().optional(),
    idAgenda: Joi.string().optional(),
    debut: Joi.date().optional(),
    fin: Joi.date().greater(Joi.ref("debut")).optional(),
});

export { getAllRendezVousRequestSchema };

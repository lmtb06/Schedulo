import Joi from "joi";

const getRendezVousRequestSchema = Joi.object({
    id: Joi.string().required(),
});

export { getRendezVousRequestSchema };

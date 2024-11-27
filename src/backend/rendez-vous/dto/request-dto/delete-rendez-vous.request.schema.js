import Joi from "joi";

const deleteRendezVousRequestSchema = Joi.object({
    id: Joi.string().required(),
});

export { deleteRendezVousRequestSchema };

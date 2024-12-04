import Joi from "../../../utils/custom-joi.js";

const deleteRendezVousRequestSchema = Joi.object({
    id: Joi.id().required(),
});

export { deleteRendezVousRequestSchema };

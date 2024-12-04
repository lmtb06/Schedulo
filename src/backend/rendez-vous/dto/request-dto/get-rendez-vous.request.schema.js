import Joi from "../../../utils/custom-joi.js";

const getRendezVousRequestSchema = Joi.object({
    id: Joi.id().required(),
});

export { getRendezVousRequestSchema };

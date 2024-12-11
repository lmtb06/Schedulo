import Joi from "../../../utils/custom-joi.js";

const createAgendaRequestSchema = Joi.object({
    idCreateur: Joi.id().required(),
    titre: Joi.string().required().messages({
        "string.empty": "Le titre est requis.",
        "any.required": "Le titre est obligatoire.",
    }),
    description: Joi.string().allow("").optional().messages({
        "string.base": "La description doit être une chaîne de caractères.",
    }),
    couleur: Joi.string().required().messages({
        "string.empty": "La couleur est requise.",
        "any.required": "La couleur est obligatoire.",
    }),
});

export { createAgendaRequestSchema };

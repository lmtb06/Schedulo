import Joi from "../../../utils/custom-joi.js";

const createRendezVousRequestSchema = Joi.object({
    idCreateur: Joi.id().required(),
    idAgenda: Joi.id().required(),
    titre: Joi.string().required().messages({
        "string.empty": "Le titre est requis.",
        "any.required": "Le titre est obligatoire.",
    }),
    debut: Joi.date().required().messages({
        "date.base": "La date de début doit être une date valide.",
        "any.required": "La date de début est obligatoire.",
    }),
    fin: Joi.date().greater(Joi.ref("debut")).required().messages({
        "date.greater":
            "La date de fin doit être postérieure à la date de début.",
        "date.base": "La date de fin doit être une date valide.",
        "any.required": "La date de fin est obligatoire.",
    }),
    description: Joi.string().allow("").optional().messages({
        "string.base": "La description doit être une chaîne de caractères.",
    }),
});

export { createRendezVousRequestSchema };

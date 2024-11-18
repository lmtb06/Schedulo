import Joi from "joi";

const rendezVousSchema = Joi.object({
    idCreateur: Joi.string().required().messages({
        "string.empty": "L'identifiant du créateur est requis.",
        "any.required": "L'identifiant du créateur est obligatoire.",
    }),
    idAgenda: Joi.string().required().messages({
        "string.empty": "L'identifiant de l'agenda est requis.",
        "any.required": "L'identifiant de l'agenda est obligatoire.",
    }),
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
    description: Joi.string().optional().messages({
        "string.base": "La description doit être une chaîne de caractères.",
    }),
    repetitions: Joi.array()
        .items(
            Joi.string()
                .regex(/^[\da-fA-F]{24}$/)
                .messages({
                    "string.pattern.base":
                        "Chaque répétition doit être un ObjectId valide (24 caractères hexadécimaux).",
                })
        )
        .messages({
            "array.base":
                "Les répétitions doivent être un tableau de chaînes de caractères.",
        }),
});

export { rendezVousSchema };

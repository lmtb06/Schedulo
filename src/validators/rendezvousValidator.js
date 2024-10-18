import Joi from 'joi';

export const rendezVousSchema = Joi.object({
    titre: Joi.string().required(),
    debut: Joi.date().required(),
    fin: Joi.date().greater(Joi.ref('debut')).required(), // La fin doit être après le début
    description: Joi.string().optional(),
    repetitions: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)) //ObjectId validé
});
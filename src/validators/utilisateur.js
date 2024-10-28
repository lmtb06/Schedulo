import Joi from 'joi';

const utilisateurSchema = Joi.object({
    email: Joi.string()
        .required()
        .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .messages({
        'string.empty': 'L\'email est requis.',
        'any.required': 'L\'email est obligatoire.',
        'string.pattern.base': 'L\'email n\'est pas valide'
    }),
    motDePasse: Joi.string()
        .required()
        .min(8)
        .messages({
        'string.empty': 'Le mot de passe est requis',
        'any.required': 'Le mot de passe est obligatoire.',
        'string.min': 'Le mot de passe doit contenir au moins 8 caractères.'
    }),
    nom: Joi.string().required().messages({
        'string.empty': 'Le nom est requis.',
        'any.required': 'Le nom est obligatoire.'
    }),
    prenom: Joi.string().required().messages({
        'string.empty': 'Le prénom est requis.',
        'any.required': 'Le prénom est obligatoire'
    }),
    dateCreation: Joi.date().required().messages({
        'date.base': 'La date de création doit être une date valide.',
        'any.required': 'La date de création est obligatoire.'
    })
});

export default utilisateurSchema;
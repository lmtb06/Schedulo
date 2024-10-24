import Joi from 'joi';

// Schéma de validation pour les variables d'environnement
const envVariablesSchema = Joi.object({
    SERVER_URL: Joi.string().uri().optional().default('http://localhost').messages({
        'string.uri': "La variable d'environnement SERVER_URL doit être une URL valide."
    }),
    SERVER_PORT: Joi.number().port().optional().default(3000).messages({
        'number.base': "La variable d'environnement SERVER_PORT doit être un nombre.",
        'number.port': "La variable d'environnement SERVER_PORT doit être un port valide."
    }),
    SERVER_ENV: Joi.string().valid('development', 'production', 'test').optional().default('production').messages({
        'any.only': "La variable d'environnement SERVER_ENV doit être soit 'development', 'production' ou 'test'."
    }),
    DB_HOST: Joi.string().required().messages({
        'any.required': "La variable d'environnement DB_HOST est requise."
    }),
    DB_PORT: Joi.number().port().required().messages({
        'number.base': "La variable d'environnement DB_PORT doit être un nombre.",
        'number.port': "La variable d'environnement DB_PORT doit être un port valide.",
        'any.required': "La variable d'environnement DB_PORT est requise."
    }),
    DB_NAME: Joi.string().required().messages({
        'any.required': "La variable d'environnement DB_NAME est requise."
    }),
    DB_USER: Joi.string().optional().messages({
        'string.base': "La variable d'environnement DB_USER doit être une chaîne de caractères."
    }),
    DB_PASS: Joi.string().optional().messages({
        'string.base': "La variable d'environnement DB_PASS doit être une chaîne de caractères."
    })
}).unknown();

export default envVariablesSchema;
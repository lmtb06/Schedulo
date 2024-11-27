import Joi from "joi";
import { Environnement } from "../../utils/index.js";

// Schéma de validation pour la configuration du serveur
const serverConfigSchema = Joi.object({
    host: Joi.string().hostname().optional().default("localhost").messages({
        "string.hostname": "host doit être un nom d'hôte valide.",
    }),
    port: Joi.number().port().optional().default(3000).messages({
        "number.base": "port doit être un nombre.",
        "number.port": "port doit être un port valide.",
    }),
    env: Joi.string()
        .valid(...Object.values(Environnement))
        .optional()
        .default("production")
        .messages({
            "any.only":
                "env doit être soit 'development', 'production' ou 'test'.",
        }),
});

const databaseParamsConfigSchema = Joi.object({
    host: Joi.string().hostname().required().messages({
        "any.required": "Le champ host est requis.",
    }),
    port: Joi.number().port().required().messages({
        "number.base": "port doit être un nombre.",
        "number.port": "port doit être un port valide.",
        "any.required": "Le champ port est requis.",
    }),
    name: Joi.string().required().messages({
        "any.required": "Le champ name est requis.",
    }),
    user: Joi.string().optional().messages({
        "string.base": "user doit être une chaîne de caractères.",
    }),
    password: Joi.string().optional().messages({
        "string.base": "password doit être une chaîne de caractères.",
    }),
})
    .with("user", "password")
    .with("password", "user")
    .messages({
        "object.with":
            "Les champs user et password doivent être tous les deux fournis ensemble.",
    });

const databaseURIConfigSchema = Joi.object({
    uri: Joi.string().uri().required().messages({
        "string.uri": "uri doit être une URI valide.",
    }),
});

// Schéma de validation pour la configuration de la base de données
const databaseConfigSchema = Joi.alternatives().conditional(
    Joi.object({ uri: Joi.exist() }).unknown(),
    {
        then: databaseURIConfigSchema,
        otherwise: databaseParamsConfigSchema,
    }
);

// Schéma principal pour valider toutes les configurations
const globalConfigSchema = Joi.object({
    database: databaseConfigSchema.required(),
    server: serverConfigSchema.required(),
});

export { databaseConfigSchema, globalConfigSchema, serverConfigSchema };

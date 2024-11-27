import Joi from "joi";

// Messages d'erreur communs
const commonMessages = {
    "string.base": "{{#label}} doit être une chaîne de caractères",
    "number.base": "{{#label}} doit être un nombre",
    "object.base": "{{#label}} doit être un objet",
    "any.required": "{{#label}} est requis",
};

// Options communes
const commonOptions = {
    messages: commonMessages,
};

// Schéma des options MongoDB partagé
const mongooseOptionsSchema = Joi.object().default({});

// Schéma pour la configuration via URI
const mongooseConfigFromURISchema = Joi.object({
    uri: Joi.string()
        .uri({ scheme: ["mongodb", "mongodb+srv"] })
        .required()
        .messages({
            "string.uri":
                "{{#label}} doit être un URI MongoDB valide (mongodb:// ou mongodb+srv://)",
        }),
    options: mongooseOptionsSchema,
}).messages(commonMessages);

// Schéma pour les credentials
const credentialsSchema = {
    user: Joi.string().alphanum(),
    password: Joi.string(),
};

// Schéma pour la configuration détaillée
const mongooseConfigFromDetailsSchema = Joi.object({
    host: Joi.string().hostname().required(),
    port: Joi.number().port().required(),
    name: Joi.string()
        .pattern(/^[a-zA-Z0-9-_]+$/)
        .min(1)
        .required()
        .messages({
            "string.pattern.base":
                "{{#label}} doit contenir uniquement des caractères alphanumériques, tirets et underscores",
        }),
    ...credentialsSchema,
    options: mongooseOptionsSchema,
})
    .and("user", "password")
    .messages({
        "object.and":
            'Les champs "user" et "password" doivent être fournis ensemble',
        ...commonMessages,
    });

// Schéma combiné avec alternatives
const mongooseConfigSchema = Joi.alternatives().conditional(
    Joi.object({ uri: Joi.exist() }).unknown(),
    {
        then: mongooseConfigFromURISchema,
        otherwise: mongooseConfigFromDetailsSchema,
    }
);

export {
    mongooseConfigFromDetailsSchema,
    mongooseConfigFromURISchema,
    mongooseConfigSchema,
};

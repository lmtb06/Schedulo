import { DatabaseConfig } from "../shared/database.config.js";
import { Validator } from "../utils/validator.js";
import { mongooseConfigSchema } from "./mongoose-config-schemas.js";

/**
 * Classe de configuration pour MongoDB.
 * @augments DatabaseConfig
 */
class MongooseConfig extends DatabaseConfig {
    /**
     * Crée une nouvelle instance de MongooseConfig.
     * @param {object} donneesConfig - Les données de configuration
     * @param {import('mongoose').MongooseOptions} options - Les options de connexion
     */
    constructor(donneesConfig, options = {}) {
        super(donneesConfig);
        this.options = options;
    }

    /**
     * @inheritdoc
     * @override
     */
    _validateConfigData(donneesConfig) {
        return Validator.validate(donneesConfig, mongooseConfigSchema, {
            abortEarly: false,
        });
    }

    /**
     * @inheritdoc
     * @override
     */
    _buildURI(host, port, name, user = undefined, password = undefined) {
        const credentials =
            user && password
                ? `${encodeURIComponent(user)}:${encodeURIComponent(password)}@`
                : "";
        return `mongodb://${credentials}${host}:${port}/${name}`;
    }
}

export { MongooseConfig };

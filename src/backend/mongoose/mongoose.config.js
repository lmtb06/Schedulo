import { DatabaseConfig } from "../shared/database.config.js";
import { Validator } from "../utils/validator.js";
import { mongooseConfigSchema } from "./mongoose-config-schemas.js";

/**
 * @typedef {import('../shared/database.config.js').DonneesConfig} DonneesConfig
 * @typedef {import('mongoose').ConnectOptions} ConnectOptions
 */

/**
 * Classe de configuration pour une Base de données via Mongoose.
 * @augments DatabaseConfig
 */
class MongooseConfig extends DatabaseConfig {
    /**
     * Crée une nouvelle instance de MongooseConfig.
     * @param {DonneesConfig} donneesConfig - Les données de configuration
     * @param {ConnectOptions} options - Les options de connexion mongoose
     */
    constructor(donneesConfig, options = {}) {
        super(donneesConfig);
        Object.assign(this, { options });
        Object.defineProperty(this, "options", {
            writable: false,
            configurable: false,
        });
    }

    /**
     * @inheritdoc
     * @override
     */
    _validateConfigData(donneesConfig) {
        return Validator.validate(donneesConfig, mongooseConfigSchema, {
            stripUnknown: true,
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

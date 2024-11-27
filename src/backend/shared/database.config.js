import { ValidationError } from "../errors/index.js";
/**
 * @typedef {import('../utils/validator').ValidationResult} ValidationResult
 * @typedef {object} DonneesConfig
 * @property {string} host - L'hôte de la base de données.
 * @property {number} port - Le port de la base de données.
 * @property {string} name - Le nom de la base de données.
 * @property {string} user - L'utilisateur de la base de données.
 * @property {string} password - Le mot de passe de la base de données.
 * @property {string} uri - L'URI de connexion à la base de données.
 */

/**
 * Classe abstraite pour la configuration d'une base de données.
 * @abstract
 */
class DatabaseConfig {
    /**
     * @param {DonneesConfig} donneesConfig
     */
    constructor(donneesConfig) {
        const { error, value: donneesClean } =
            this._validateConfigData(donneesConfig);

        if (error) {
            throw new ValidationError(error);
        }

        Object.assign(this, donneesClean);

        Object.defineProperties(this, {
            host: { writable: false, configurable: false, enumerable: false },
            port: { writable: false, configurable: false, enumerable: false },
            name: { writable: false, configurable: false, enumerable: false },
            user: { writable: false, configurable: false, enumerable: false },
            password: {
                writable: false,
                configurable: false,
                enumerable: false,
            },
        });

        // Initialiser _uri comme null (sera calculé dynamiquement si nécessaire)
        this._uri = null;
    }

    /**
     * Getter pour l'URI.
     * Construit dynamiquement l'URI si nécessaire.
     * @returns {string} L'URI de connexion à la base de données.
     */
    get uri() {
        if (!this._uri) {
            this._uri = this._buildURI(
                this.host,
                this.port,
                this.name,
                this.user,
                this.password
            );
        }
        return this._uri;
    }

    /**
     * Valide la configuration de la base de données.
     * @abstract
     * @protected
     * @param {object} donneesConfig - Les données de configuration de la base de données.
     * @returns {ValidationResult} Les résultats de validation des données de configuration.
     */
    _validateConfigData(donneesConfig) {
        throw new Error("Methode non implementee");
    }

    /**
     * Construit l'URI de connexion à la base de données.
     * @param {string} host - L'hôte de la base de données.
     * @param {number} port - Le port de la base de données.
     * @param {string} name - Le nom de la base de données.
     * @param {string} user - L'utilisateur de la base de données.
     * @param {string} password - Le mot de passe de la base de données.
     * @returns {string} L'URI de connexion à la base de données.
     * @abstract
     */
    _buildURI(host, port, name, user = undefined, password = undefined) {
        throw new Error("Methode non implementee");
    }
}

export { DatabaseConfig };

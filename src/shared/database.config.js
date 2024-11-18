/**
 * Configuration d'une base de données.
 * @abstract
 */
class DatabaseConfig {
    /**
     * @type {string} L'hôte de la base de données.
     * @protected
     */
    _host;
    /**
     * @type {number} Le port de la base de données.
     * @protected
     */
    _port;
    /**
     * @type {string} Le nom de la base de données.
     * @protected
     */
    _name;
    /**
     * @type {string} L'utilisateur de la base de données.
     * @protected
     */
    _user;
    /**
     * @type {string} Le mot de passe de la base de données.
     * @protected
     */
    _password;
    /**
     * @type {string} L'URI de connexion à la base de données.
     * @protected
     */
    _uri;
    /**
     * @param {object} donneesConfig
     * @param {string} donneesConfig.host L'hôte de la base de données.
     * @param {number} donneesConfig.port Le port de la base de données.
     * @param {string} donneesConfig.name Le nom de la base de données.
     * @param {string} donneesConfig.user L'utilisateur de la base de données.
     * @param {string} donneesConfig.password Le mot de passe de la base de données.
     * @param {string} donneesConfig.uri L'URI de connexion à la base de données.
     */
    constructor(donneesConfig) {
        const donneesClean = this._validateConfigData(donneesConfig);

        if (donneesClean.host) this._host = donneesClean.host;
        if (donneesClean.port) this._port = donneesClean.port;
        if (donneesClean.name) this._name = donneesClean.name;
        if (donneesClean.user) this._user = donneesClean.user;
        if (donneesClean.password) this._password = donneesClean.password;
        if (donneesClean.uri) this._uri = donneesClean.uri;
    }

    /**
     * @returns {string} L'URI de connexion à la base de données.
     */
    getURI() {
        if (this._uri) {
            return this._uri;
        }

        return this._buildURI(
            this._host,
            this._port,
            this._name,
            this._user,
            this._password
        );
    }

    /**
     * Valide la configuration de la base de données.
     * @abstract
     * @protected
     * @param {object} donneesConfig - Les données de configuration de la base de données.
     * @returns {object} Les données de configuration de la base de données validées.
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

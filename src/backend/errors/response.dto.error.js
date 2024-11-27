/**
 * Erreur qui va être renvoyée au client dans le cas d'une erreur de traitement de sa requete.
 * @abstract
 */
class ResponseDTOError {
    /**
     * @type {string}
     */
    type;
    /**
     * @type {string}
     */
    message;

    /**
     * @param {string} type
     * @param {string} message
     */
    constructor(type, message) {
        this.type = type;
        this.message = message;
    }

    toJSON() {
        throw new Error("La méthode toJSON doit être implémentée");
    }
}

/**
 * Erreur de validation.
 */
class DTOValidationError extends ResponseDTOError {
    /**
     * @type {string}
     */
    key;
    /**
     * @type {string}
     */
    value;
    /**
     * @param {string} message
     */
    constructor({ message, key, value }) {
        super("validation", message);
        this.key = key;
        this.value = value;
    }

    toJSON() {
        return {
            type: this.type,
            message: this.message,
            key: this.key,
            value: this.value,
        };
    }
}

export { ResponseDTOError, DTOValidationError };

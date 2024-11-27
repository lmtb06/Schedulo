import { RequestDTO } from "../../shared/request.dto.js";

/**
 * @typedef {import("../enums.js").UniteRepetition} UniteRepetition
 
/**
 * Classe DTO représentant l'update d'une répétition.
 * @augments {RequestDTO}
 * @property {number} id - L'identifiant de la répétition.
 * @property {number} intervalle - L'intervalle de répétition.
 * @property {UniteRepetition} uniteRepetition - L'unité de l'intervalle de répétition.
 * @property {Date} fin - La date de fin de la répétition.
 */
class UpdateRepetitionRequestDTO extends RequestDTO {
    constructor(data) {
        super(data);
        /**
         * L'identifiant de la répétition.
         * @type {string}
         */
        this.id;
        /**
         * L'intervalle de répétition.
         * @type {number}
         */
        this.intervalle;
        /**
         * L'unité de l'intervalle de répétition.
         * @type {UniteRepetition}
         */
        this.uniteRepetition;
        /**
         * La date de fin de la répétition.
         * @type {Date}
         */
        this.fin;
    }

    /**
     * @override
     * @inheritdoc
     */
    _validate(data) {
        throw new Error("Fonction non implémentée");
    }
}

export { UpdateRepetitionRequestDTO };

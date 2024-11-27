import { RequestDTO } from "../../shared/request.dto.js";

/**
 * @typedef {import('../enums.js').UniteRepetition} UniteRepetition
 */

/**
 * Classe DTO représentant la création d'une répétition.
 * @augments {RequestDTO}
 */
class CreateRepetitionRequestDTO extends RequestDTO {
    constructor(data) {
        super(data);
        /**
         * L'intervalle de répétition.
         * @type {number}
         */
        this.intervalle;
        /**
         * L'unité de l'intervalle de répétition.
         * @type {UniteRepetition}
         */
        this.unite;
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

export { CreateRepetitionRequestDTO };

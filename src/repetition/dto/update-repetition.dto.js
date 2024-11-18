import { DTO } from "../../shared/dto.js";
import { InterfaceValidator } from "../../utils/interface.js";

/**
 * @typedef {import("../enums.js").UniteRepetition} UniteRepetition
 
/**
 * Classe DTO représentant l'update d'une répétition.
 * @implements {DTO}
 */
class UpdateRepetitionDTO {
    constructor({ id, intervalle, uniteRepetition, fin }) {
        InterfaceValidator.ensureImplementsInterface(UpdateRepetitionDTO, DTO);
        /**
         * @type {number} L'identifiant de la répétition.
         * @public
         * @readonly
         */
        this.id = id;
        /**
         * @type {number} L'intervalle de répétition.
         * @public
         * @readonly
         */
        this.intervalle = intervalle;
        /**
         * @type {UniteRepetition} L'unité de l'intervalle de répétition.
         * @public
         * @readonly
         */
        this.uniteRepetition = uniteRepetition;
        /**
         * @type {Date} La date de fin de la répétition.
         * @public
         * @readonly
         */
        this.fin = fin;
    }

    /**
     * @override
     * @inheritdoc
     */
    toJSON() {
        return JSON.stringify({
            id: this.id,
            intervalle: this.intervalle,
            unite: this.unite,
            fin: this.fin,
        });
    }

    /**
     * @override
     * @inheritdoc
     */
    validate() {
        throw new Error("Fonction non implémentée");
    }
}

export { UpdateRepetitionDTO };
